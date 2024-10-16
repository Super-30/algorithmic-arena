import { PrismaClient } from "@prisma/client";
import { ProblemDefinitionParser } from "./ProblemDefinitionGenerator";
import { FullProblemDefinitionParser } from "./FullProblemDefinitionGenerator";
import { LANGUAGE_MAPPING } from "../../../packages/common/language/index";



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
  functionName: string; // Provided by the user
  inputFields: Array<{ type: string; name: string }>; // Provided by the user
  outputFields: Array<{ type: string; name: string }>; // Provided by the user
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
    inputFields: inputFields,   // Passed directly from user input
    outputFields: outputFields, // Passed directly from user input
  });

  const fullParser = new FullProblemDefinitionParser({
    problemName: problemName,
    functionName: functionName,
    inputFields: inputFields,   // Passed directly from user input
    outputFields: outputFields, // Passed directly from user input
  });



  // Generate boilerplate codes
  const boilerplateCodes = [
    { language: 'cpp', code: partialParser.generateCpp(), fullcode: fullParser.generateCpp() },
    { language: 'js', code: partialParser.generateJs(),fullcode: fullParser.generateJs() },
    { language: 'rs', code: partialParser.generateRust(), fullcode: fullParser.generateRust() },
    { language: 'Java', code: partialParser.generateJava(), fullcode: fullParser.generateJava() },
  ];

  try {
    // Generate Slug
    const slug = generateSlug(problemName);
    console.log('this is the Language Mapping',LANGUAGE_MAPPING);
    

    // Create the Problem
    const problem = await prisma.problem.create({
      data: {
        title: problemName,
        description: problemDescription,
        problemMarkdown: problemMarkdown,
        difficulty: difficulty,
        slug: slug,
        testCases: {
          create: testCases.map((tc) => ({
            input: tc.input,
            output: tc.output,
          })),
        },
        defaultCode: {
          create: boilerplateCodes.map((bc) => {
            const languageMapping = LANGUAGE_MAPPING[bc.language.toLowerCase()];
            if (!languageMapping) {
              throw new Error(`Unsupported language: ${bc.language}`);
            }
            console.log('this is the object',languageMapping);
            
    
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
    return problem;
  } catch (error) {
    console.error("Error creating problem:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
