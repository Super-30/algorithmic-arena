import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../../../lib/auth';
import { createProblem } from '../../../../../boilerplate-generator/src/index'; // Adjust the import path accordingly

// Define interfaces for request body
interface Field {
  type: string;
  name: string;
}

interface TestCase {
  input: any;
  output: any;
}

interface CreateProblemRequestBody {
  problemName: string;
  functionName: string; // Keep optional if not used
  inputFields: Field[];
  outputFields: Field[];
  testCases: TestCase[];
  problemDescription?: string;
  problemMarkdown: string;
  structureMarkdown: string;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  // Uncomment this block if authentication is required
  // if (!session) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const body = await req.json();
    const {
      problemName,
      functionName, // Extract functionName from the request body
      inputFields,
      outputFields,
      testCases,
      problemDescription,
      problemMarkdown,
      structureMarkdown
    } = body as CreateProblemRequestBody;

    // Validate required fields
    if (!problemName || !inputFields || !outputFields || !functionName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Prepare data for creating the problem in the database
    const problemData = {
      problemName,
      problemDescription: problemDescription || '', // Provide a default value if undefined
      problemMarkdown, // Use the provided problemMarkdown
      structureMarkdown, // Use the provided structureMarkdown
      difficulty: 'MEDIUM' as 'MEDIUM', // Set default or modify as needed
      testCases,
      functionName,  // Add functionName
      inputFields,   // Add inputFields
      outputFields,  // Add outputFields
    };

    // Call the createProblem function from index.ts
    console.log("problemData before calling createProblem:", JSON.stringify(problemData, null, 2));
    
    const problem = await createProblem(problemData); // Ensure inputFields and outputFields are passed

    // Respond with the created problem details
    return NextResponse.json({ message: 'Problem created successfully', problem });

  } catch (error) {
    console.log('Error creating problem:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}