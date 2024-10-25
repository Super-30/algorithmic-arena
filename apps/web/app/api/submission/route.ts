import { NextRequest, NextResponse } from "next/server";
import { SubmissionInput } from "@repo/common/zod";
import { getProblem } from "../../lib/problems";
import axios from "axios";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { db } from "../../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { rateLimit } from "../../lib/rateLimit";

const JUDGE0_URI = process.env.JUDGE0_URI || "https://judge.100xdevs.com";

const SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!;
const CLOUDFLARE_TURNSTILE_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  export async function POST(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return NextResponse.json(
          {
            message: "You must be logged in to submit a problem",
          },
          {
            status: 401,
          }
        );
      }
  
      const userId = session.user.id;
  
      
      const isAllowed = await rateLimit(userId, 1, 10);
      if (!isAllowed && process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            message: `Too many requests. Please wait before submitting again.`,
          },
          {
            status: 429,
          }
        );
      }
  
      const submissionInput = SubmissionInput.safeParse(await req.json());
      if (!submissionInput.success) {
        return NextResponse.json(
          {
            message: "Invalid input",
            errors: submissionInput.error.errors, 
          },
          {
            status: 400,
          }
        );
      }
      let formData = new FormData();
      formData.append("secret", SECRET_KEY);
      formData.append("response", submissionInput.data.token);
  
      const result = await fetch(CLOUDFLARE_TURNSTILE_URL, {
        body: formData,
        method: "POST",
      });
  
      if (!result.ok) {
        throw new Error("Failed to verify reCAPTCHA");
      }
  
      const challengeResult = await result.json();
      if (!challengeResult.success && process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            message: "Invalid reCAPTCHA token",
          },
          {
            status: 403,
          }
        );
      }
  
      // Fetch problem from the database
      const dbProblem = await db.problem.findUnique({
        where: {
          id: submissionInput.data.problemId,
        },
      });
      
      if (!dbProblem) {
        return NextResponse.json(
          {
            message: "Problem not found",
          },
          {
            status: 404,
          }
        );
      }
  
      // Fetch problem details
      const problem = await getProblem(
        dbProblem.id,
        submissionInput.data.languageId,
        dbProblem.title
      );
      if (!problem) {
        return NextResponse.json(
          {
            message: "Problem details not found",
          },
          {
            status: 404,
          }
        );
      }
  
      // Replace the user code in the boilerplate
      problem.fullBoilerplateCode = problem.fullBoilerplateCode.replace(
        "##USER_CODE_HERE##",
        submissionInput.data.code
      );
      const res: any=problem.inputs
      const submissionCode=problem.inputs.map((input, index) => ({
        language_id: LANGUAGE_MAPPING[submissionInput.data.languageId]?.judge0,
        source_code: problem.fullBoilerplateCode.replace(
          "##INPUT_FILE_INDEX##",
          index.toString()
        ),
        expected_output: problem.outputs[index],
      }))
      console.log('submitted code ',submissionCode );
      
      
      // Submit to Judge0
      const response = await axios.post(
        `${JUDGE0_URI}/submissions/batch?base64_encoded=false`,
        {
          submissions: problem.inputs.map((input, index) => ({
            language_id: LANGUAGE_MAPPING[submissionInput.data.languageId]?.judge0,
            source_code: problem.fullBoilerplateCode.replace(
              "##INPUT_FILE_INDEX##",
              index.toString()
            ),
            expected_output: problem.outputs[index],
          })),
        }
      );
      const submissionData = {
        userId: userId,
        problemId: submissionInput.data.problemId,
        code: submissionInput.data.code,
        activeContestId: submissionInput.data.activeContestId,
        testcases: {
          connect: response.data,
        },
      };
      try {
        const submission = await db.submission.create({
          data: submissionData,
          include: {
            testcases: true,
          },
        });
      
        return NextResponse.json(
          {
            message: "Submission made",
            id: submission.id,
          },
          {
            status: 200,
          }
        );
      } catch (error) {
        console.log("Failed to create submission:", error);
        return NextResponse.json(
          {
            message: "Failed to create submission.",
          },
          {
            status: 500,
          }
        );
      }
    } catch (error) {
      console.error("Error processing submission:", error);
      console.log('An error occurred while processing your submission',error);

      return NextResponse.json(
        {
          message: "An error occurred while processing your submission.",
          
          
          error: error,
        },
        {
          status: 500,
        }
      );
    }
  }
  


export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "You must be logged in to view submissions",
      },
      {
        status: 401,
      }
    );
  }
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const submissionId = searchParams.get("id");

  if (!submissionId) {
    return NextResponse.json(
      {
        message: "Invalid submission id",
      },
      {
        status: 400,
      }
    );
  }

  var submission = await db.submission.findUnique({
    where: {
      id: submissionId,
    },
    include: {
      testcases: true,
    },
  });

  if (!submission) {
    return NextResponse.json(
      {
        message: "Submission not found",
      },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json(
    {
      submission,
    },
    {
      status: 200,
    }
  );
}
