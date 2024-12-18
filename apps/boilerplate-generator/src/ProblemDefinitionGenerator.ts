interface ProblemMetadata {
  problemName: string;
  functionName: string;
  inputFields: { type: string; name: string }[];
  outputFields: { type: string; name: string }[];
}

export class ProblemDefinitionParser {
  problemName: string = "";
  functionName: string = "";
  inputFields: { type: string; name: string }[] = [];
  outputFields: { type: string; name: string }[] = [];


  constructor(metadata: ProblemMetadata) {
    this.problemName = metadata.problemName;
    this.functionName = metadata.functionName;
    this.inputFields = metadata.inputFields;
    this.outputFields = metadata.outputFields;
  }

  generateCpp(): string {
    const inputs = this.inputFields
      .map((field) => `${this.mapTypeToCpp(field.type)} ${field.name}`)
      .join(", ");
    return `${this.mapTypeToCpp(this.outputFields[0].type)} ${this.functionName}(${inputs}) {\n    // Implementation goes here\n    return result;\n}`;
  }

  generateJs(): string {
    const inputs = this.inputFields.map((field) => field.name).join(", ");
    return `function ${this.functionName}(${inputs}) {\n    // Implementation goes here\n    return result;\n}`;
  }

  generateRust(): string {
    const inputs = this.inputFields
      .map((field) => `${field.name}: ${this.mapTypeToRust(field.type)}`)
      .join(", ");
    const outputType = this.mapTypeToRust(this.outputFields[0].type);
    return `fn ${this.functionName}(${inputs}) -> ${outputType} {\n    // Implementation goes here\n    result\n}`;
  }

  generateJava(): string{
    const inputs = this.inputFields
      .map((field) => `${this.mapTypeToJava(field.type)} ${field.name}`)
      .join(", ");
    return `public static ${this.mapTypeToJava(this.outputFields[0].type)} ${this.functionName}(${inputs}) {\n    // Implementation goes here\n    return result;\n}`;
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
