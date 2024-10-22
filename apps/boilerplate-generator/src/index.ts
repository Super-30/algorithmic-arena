import { PrismaClient, BoilerplateType } from "@prisma/client";
import { ProblemDefinitionParser } from "./ProblemDefinitionGenerator";
import { FullProblemDefinitionParser } from "./FullProblemDefinitionGenerator";
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

/**
 * Function to generate a slug from the problem name.
 * @param title - The title of the problem.
 * @returns A URL-friendly slug string.
 */
function generateSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
}

/**
 * Function to create a new problem in the database.
 * @param problemData - An object containing all necessary problem details, including metadata.
 * @returns The created problem record from the database.
 */
export async function createProblem(problemData: {
  problemName: string;
  problemDescription: string;
  problemMarkdown: string;
  structureMarkdown: string; // Content of Structure.md
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
    structureMarkdown,
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
    { language: 'C++', code: partialParser.generateCpp(), boilerplateType: 'PARTIAL' as BoilerplateType },
    { language: 'JavaScript', code: partialParser.generateJs(), boilerplateType: 'PARTIAL' as BoilerplateType },
    { language: 'Rust', code: partialParser.generateRust(), boilerplateType: 'PARTIAL' as BoilerplateType },
    { language: 'Java', code: partialParser.generateJava(), boilerplateType: 'PARTIAL' as BoilerplateType },
    // Full Boilerplate
    { language: 'C++', code: fullParser.generateCpp(), boilerplateType: 'FULL' as BoilerplateType },
    { language: 'JavaScript', code: fullParser.generateJs(), boilerplateType: 'FULL' as BoilerplateType },
    { language: 'Rust', code: fullParser.generateRust(), boilerplateType: 'FULL' as BoilerplateType },
    { language: 'Java', code: fullParser.generateJava(), boilerplateType: 'FULL' as BoilerplateType },
  ];

  try {
    // Generate Slug
    const slug = generateSlug(problemName);

    // Create the Problem
    const problem = await prisma.problem.create({
      data: {
        title: problemName,
        description: problemDescription,
        problemMarkdown: problemMarkdown,
        structureMarkdown: structureMarkdown,
        difficulty: difficulty,
        slug: slug,
        testCases: {
          create: testCases.map((tc) => ({
            input: tc.input,
            output: tc.output,
          })),
        },
        boilerplateCodes: {
          create: boilerplateCodes.map((bc) => ({
            language: bc.language,
            code: bc.code,
            boilerplateType: bc.boilerplateType,
          })),
        },
      },
      include: {
        testCases: true,
        boilerplateCodes: true,
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