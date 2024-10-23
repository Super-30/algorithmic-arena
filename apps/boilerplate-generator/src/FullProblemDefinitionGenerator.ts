interface ProblemMetadata {
  problemName: string;
  functionName: string;
  inputFields: { type: string; name: string }[];
  outputFields: { type: string; name: string }[];
  testCases: Array<{ input: any; output: any }>;
}

export class FullProblemDefinitionParser {
  problemName: string = "";
  functionName: string = "";
  inputFields: { type: string; name: string }[] = [];
  outputFields: { type: string; name: string }[] = [];
  testCases: Array<{ input: any; output: any }>=[];


  constructor(metadata: ProblemMetadata) {
    this.problemName = metadata.problemName;
    this.functionName = metadata.functionName;
    this.inputFields = metadata.inputFields;
    this.outputFields = metadata.outputFields;
  }
  generateCpp() {
    const inputs = this.inputFields
      .map((field) => `${this.mapTypeToCpp(field.type)} ${field.name}`)
      .join(", ");
    
    const inputReads = this.inputFields
      .map((field, index) => {
        if (field.type.startsWith("list<list<")) {
          return `int outer_size_${field.name};\n` +
                 `std::istringstream(lines[${index}]) >> outer_size_${field.name};\n` +
                 `${this.mapTypeToCpp(field.type)} ${field.name}(outer_size_${field.name});\n` +
                 `int line_index = ${index} + 1;\n` +
                 `for (int i = 0; i < outer_size_${field.name}; i++) {\n` +
                 `  int inner_size_${field.name};\n` +
                 `  std::istringstream(lines[line_index]) >> inner_size_${field.name};\n` + 
                 `  ${field.name}[i].resize(inner_size_${field.name});\n` +
                 `  line_index++;\n` + 
                 `  if (inner_size_${field.name} > 0) {\n` +
                 `    std::istringstream iss(lines[line_index]);\n` +
                 `    for (int j = 0; j < inner_size_${field.name}; j++) iss >> ${field.name}[i][j];\n` +
                 `    line_index++;\n` +  
                 `  }\n` +
                 `}`; 
        } else if (field.type.startsWith("list<")) {
          return `int size_${field.name};\n  std::istringstream(lines[${index}]) >> size_${field.name};\n` +
                 `${this.mapTypeToCpp(field.type)} ${field.name}(size_${field.name});\n` +
                 `if(size_${field.name} > 0) {\n` +
                 `  std::istringstream iss(lines[${index + 1}]);\n` +
                 `  for (int i = 0; i < size_${field.name}; i++) iss >> ${field.name}[i];\n` +
                 `}`; 
        } else {
          return `${this.mapTypeToCpp(field.type)} ${field.name};\n  std::istringstream(lines[${index}]) >> ${field.name};`;
        }
      })
      .join("\n  ");

    // Determine output type once
    const outputType = this.mapTypeToCpp(this.outputFields[0].type); // Get the output type once
    const functionCall = `${outputType} result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;

    // Generate the matrixToString function only if the output type is list<list<>>
    const hasMatrixOutput = outputType.startsWith("std::vector<std::vector<");

    const matrixToStringFunc = hasMatrixOutput ? `
std::string matrixToString(const std::vector<std::vector<int>>& matrix) {
    std::ostringstream oss;
    for (const auto& row : matrix) {
        for (const auto& elem : row) {
            oss << elem << " ";
        }
        oss << "\\n"; 
    }
    return oss.str();
}` : '';

    return `#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>
#include <algorithm>

${matrixToStringFunc}

##USER_CODE_HERE##

int main() {
    std::ifstream file("/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt"); 
    std::vector<std::string> lines;
    std::string line;

    // Read lines from file
    while (std::getline(file, line)) lines.push_back(line);
    file.close();

    // Ensure lines were read correctly
    if (lines.empty()) {
        std::cerr << "Error: Input file is empty or not found!" << std::endl;
        return 1;
    }

    ${inputReads}
    ${functionCall}
    
    // Convert result to string and print it if output is a matrix
    ${hasMatrixOutput ? `std::cout << matrixToString(result) << std::endl;` : `std::cout << result << std::endl;`}

    return 0;
}
`;
}






  generateJava(): string {
    let inputReadIndex = 0;
    const inputReads = this.inputFields
    .map((field , index)=>{
      if(field.type.startsWith("list<")){
        let javaType = this.mapTypeToJava(field.type);
        let inputType = javaType.match(/<(.*?)>/);
        javaType = inputType ? inputType[1] : 'Integer';
        let parseToType = (javaType === 'Integer') ? 'Int' : javaType;

        return `int size_${field.name} = Integer.parseInt(lines.get(${inputReadIndex++}).trim());\n
        ${this.mapTypeToJava(field.type)} ${field.name} = new ArrayList<>(size_${field.name});\n
        String[] inputStream = lines.get(${inputReadIndex++}).trim().split("\\s+");\n
        for (String inputChar : inputStream)  {\n
          ${field.name}.add(${javaType}.parse${parseToType}(inputChar));\n
        }\n`;
      } else {
        let javaType = this.mapTypeToJava(field.type);
        if(javaType === 'int'){
          javaType = 'Integer';
        }
        else if(javaType === 'float'){
          javaType = 'Float';
        }
        else if(javaType === 'boolean'){
          javaType = 'Boolean';
        }else if(javaType === 'String'){
          javaType = 'String';
        }
        let parseToType = (javaType === 'Integer') ? 'Int' : javaType;
        return `${this.mapTypeToJava(field.type)} ${field.name} = ${javaType}.parse${parseToType}(lines.get(${inputReadIndex++}).trim());`;
      }
    }).join("\n  ");
    const outputType = this.mapTypeToJava(this.outputFields[0].type);
    const functionCall = `${outputType} result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `System.out.println(result);`;

    return `
import java.io.*;
import java.util.*;

public class Main {
    
    ##USER_CODE_HERE##

    public static void main(String[] args) {
        String filePath = "/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt"; 
        List<String> lines = readLinesFromFile(filePath);
        ${inputReads}
        ${functionCall}
        ${outputWrite}
    }
    public static List<String> readLinesFromFile(String filePath) {
        List<String> lines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return lines;
    }
}`
  }

  generateJs(): string {
    const inputs = this.inputFields.map((field) => field.name).join(", ");
    const inputReads = this.inputFields
      .map((field) => {
        if (field.type.startsWith("list<")) {
          return `const size_${field.name} = parseInt(input.shift());\nconst ${field.name} = input.splice(0, size_${field.name}).map(Number);`;
        } else {
          return `const ${field.name} = parseInt(input.shift());`;
        }
      })
      .join("\n  ");
    const outputType = this.outputFields[0].type;
    const functionCall = `const result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `console.log(result);`;

    return `##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\\n').join(' ').split(' ');
${inputReads}
${functionCall}
${outputWrite}
    `;
  }

  generateRust(): string {
    const inputs = this.inputFields
      .map((field) => `${field.name}: ${this.mapTypeToRust(field.type)}`)
      .join(", ");
    const inputReads = this.inputFields
      .map((field) => {
        if (field.type.startsWith("list<")) {
          return `let size_${field.name}: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);\n\tlet ${field.name}: ${this.mapTypeToRust(field.type)} = parse_input(lines, size_${field.name});`;
        } else {
          return `let ${field.name}: ${this.mapTypeToRust(field.type)} = lines.next().unwrap().parse().unwrap();`;
        }
      })
      .join("\n  ");
    const containsVector = this.inputFields.find((field) =>
      field.type.startsWith("list<")
    );
    const outputType = this.mapTypeToRust(this.outputFields[0].type);
    const functionCall = `let result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `println!("{}", result);`;

    return `use std::fs::read_to_string;
use std::io::{self};
use std::str::Lines;

##USER_CODE_HERE##

fn main() -> io::Result<()> {
  let input = read_to_string("/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt")?;
  let mut lines = input.lines();
  ${inputReads}
  ${functionCall}
  ${outputWrite}
  Ok(())
}${
  containsVector
    ? `\nfn parse_input(mut input: Lines, size_arr: usize) -> Vec<i32> {
    let arr: Vec<i32> = input
        .next()
        .unwrap_or_default()
        .split_whitespace()
        .filter_map(|x| x.parse().ok())
        .collect();

    if size_arr == 0 {
        Vec::new()
    } else {
        arr
    }
}`
    : ""
}
`;
  }

  mapTypeToCpp(type: string): string {
    switch (type) {
      case "int":
        return "int";
      case "float":
        return "float";
      case "string":
        return "std::string";
      case "bool":
        return "bool";
      case "list<int>":
        return "std::vector<int>";
      case "list<float>":
        return "std::vector<float>";
      case "list<string>":
        return "std::vector<std::string>";
      case "list<bool>":
        return "std::vector<bool>";
      case "list<list<int>>":
        return "std::vector<std::vector<int>>";
      case "list<list<float>>":
        return "std::vector<std::vector<float>>";
      case "list<list<string>>":
        return "std::vector<std::vector<std::string>>";
      case "list<list<bool>>":
        return "std::vector<std::vector<bool>>";
      default:
        return "unknown";
    }
  }

  mapTypeToRust(type: string): string {
    switch (type) {
      case "int":
        return "i32";
      case "float":
        return "f64";
      case "string":
        return "String";
      case "bool":
        return "bool";
      case "list<int>":
        return "Vec<i32>";
      case "list<float>":
        return "Vec<f64>";
      case "list<string>":
        return "Vec<String>";
      case "list<bool>":
        return "Vec<bool>";
      default:
        return "unknown";
    }
  }
  mapTypeToJava(type:string):string {
    switch (type) {
      case "int":
        return "int";
      case "float":
        return "float";
      case "string":
        return "String";
      case "bool":
        return "boolean";
      case "list<int>":
        return "List<Integer>";
      case "list<float>":
        return "List<Float>";
      case "list<string>":
        return "List<String>";
      case "list<bool>":
        return "List<Boolean>";
      default:
        return "unknown";
    }
  }
}