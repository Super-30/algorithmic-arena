import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../../../lib/auth';
import { createProblem } from '../../../../../boilerplate-generator/src/index';



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
  functionName: string; 
  inputFields: Field[];
  outputFields: Field[];
  testCases: TestCase[];
  problemDescription?: string;
  problemMarkdown: string;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

 
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      {
        message: "You must be an admin to create contests",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const body = await req.json();
    const {
      problemName,
      functionName, 
      inputFields,
      outputFields,
      testCases,
      problemDescription,
      problemMarkdown,
    } = body as CreateProblemRequestBody;

    // Validate required fields
    if (!problemName || !inputFields || !outputFields || !functionName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

   
    const problemData = {
      problemName,
      problemDescription: problemDescription || '', 
      problemMarkdown,
      difficulty: 'MEDIUM' as 'MEDIUM',
      testCases,
      functionName,  
      inputFields,   
      outputFields,  
    };

    
    console.log("problemData before calling createProblem:", JSON.stringify(problemData, null, 2));
    
    const problem = await createProblem(problemData); 

    
    return NextResponse.json({ message: 'Problem created successfully', problem });

  } catch (error) {
    console.log('Error creating problem:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
