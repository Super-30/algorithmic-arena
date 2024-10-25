import { PrismaClient } from "@prisma/client";
import { ProblemDefinitionParser } from "./ProblemDefinitionGenerator";
import { FullProblemDefinitionParser } from "./FullProblemDefinitionGenerator";
import { LANGUAGE_MAPPING } from "../../../packages/common/language/index";
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();


function generateSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
}


export async function createProblem(problemData: {
  problemName: string;
  problemDescription: string;
  problemMarkdown: string; 
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  testCases: Array<{ input: any; output: any }>;
  functionName: string; 
  inputFields: Array<{ type: string; name: string }>; 
  outputFields: Array<{ type: string; name: string }>; 
}) {
  const {
    problemName,
    problemDescription,
    problemMarkdown,
    difficulty,
    testCases,
    functionName,
    inputFields,
    outputFields,
  } = problemData;
  console.log('Extracted values:', { problemName, functionName, inputFields, outputFields });

  // Initialize parsers with user-provided metadata
  const partialParser = new ProblemDefinitionParser({
    problemName: problemName,
    functionName: functionName,
    inputFields: inputFields,   
    outputFields: outputFields, 
  });

  const fullParser = new FullProblemDefinitionParser({
    problemName: problemName,
    functionName: functionName,
    inputFields: inputFields,   
    outputFields: outputFields,
    testCases: testCases 
  });
  const testInput=testCases.map(testcase=>{
    testcase.input[0]
  })

  // Generate boilerplate codes
  const boilerplateCodes = [
    { language: 'cpp', code: partialParser.generateCpp(), fullcode: fullParser.generateCpp() },
    { language: 'js', code: partialParser.generateJs(),fullcode: fullParser.generateJs() },
    { language: 'rs', code: partialParser.generateRust(), fullcode: fullParser.generateRust() },
    { language: 'Java', code: partialParser.generateJava(), fullcode: fullParser.generateJava() },
  ];
  const createInput = async (testCases: Array<{ input: any; output: any }>,problemName: string) => {
    const root='../problems'
    const inputFolder = '/tests/inputs'; 
    problemName=problemName.toLowerCase().replace(" ", "-");
    const folderName = path.join(root,problemName, inputFolder);
    try {
      await fs.mkdir(folderName, { recursive: true });
      console.log(`Folder ${folderName} has been created or already exists.`);
    } catch (error) {
      console.error(`Error creating folder: ${error}`);
      return;
    }
  
    const inputArray = testCases.map(testCase => testCase.input);
  
  
    for (let [index, input] of inputArray.entries()) {
      const formattedInput = formatTestCaseInput(input);
      const filePath = path.join(folderName, `${index}.txt`);
  
      try {
        await fs.writeFile(filePath, formattedInput, 'utf8');
        console.log(`File ${filePath} has been created successfully.`);
      } catch (error) {
        console.error(`Error creating file ${filePath}: ${error}`);
      }
    }
  };
  const createOutput = async (testCases: Array<{ input: any; output: any }>, problemName: string) => {
    const root='../problems'
    const outputFolder = '/tests/outputs'; 
    problemName=problemName.toLowerCase().replace(" ", "-");
    const folderName = path.join(root,problemName, outputFolder);
    try {
      await fs.mkdir(folderName, { recursive: true });
      console.log(`Folder ${folderName} has been created or already exists.`);
    } catch (error) {
      console.error(`Error creating folder: ${error}`);
      return;
    }
  
    const outputArray = testCases.map(testCase => testCase.output);
  
    
    for (let [index, output] of outputArray.entries()) {
      const formattedInput = formatTestCaseInput(output);
      const filePath = path.join(folderName, `${index}.txt`);
  
      try {
        await fs.writeFile(filePath, formattedInput, 'utf8');
        console.log(`File ${filePath} has been created successfully.`);
      } catch (error) {
        console.error(`Error creating file ${filePath}: ${error}`);
      }
    }
  };
  function formatTestCaseInput(input: any) {
    return input.map((item: String[]) => Array.isArray(item) ? item.join(' ') : item).join('\n');
  }

  try {
    
    const slug = generateSlug(problemName);
    

    // Create the Problem
    const problem = await prisma.problem.create({
      data: {
        title: problemName,
        description: problemDescription,
        problemMarkdown: problemMarkdown,
        difficulty: difficulty,
        slug: slug,
        // testCases: {
        //   create: testCases.map((tc) => ({
        //     input: tc.input,
        //     output: tc.output,
        //   })),
        // },
        defaultCode: {
          create: boilerplateCodes.map((bc) => {
            const languageMapping = LANGUAGE_MAPPING[bc.language.toLowerCase()];
            if (!languageMapping) {
              throw new Error(`Unsupported language: ${bc.language}`);
            }  
            return {
              code: bc.code,
              fullcode: bc.fullcode,
              languageId: languageMapping.internal,
            };
          }),
        }
      },
      include: {
        testCases: true,
        defaultCode: true,
      },
    });

    console.log("Problem created successfully:", problem);
    createInput(testCases,problemName);
    createOutput(testCases, problemName);
    return problem;
  } catch (error) {
    console.error("Error creating problem:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
