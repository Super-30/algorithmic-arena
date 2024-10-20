import { db } from "../db";
import { LANGUAGE_MAPPING } from "@repo/common/language";

type SUPPORTED_LANGS = "js" | "cpp" | "rs"|"java";

interface Problem {
  id: string;
  fullBoilerplateCode: string;
  inputs: string[];
  outputs: string[];
}


export const getProblem = async (
  problemId: string,
  languageId: SUPPORTED_LANGS,
): Promise<Problem> => {
  const fullBoilderPlate = await getProblemFullBoilerplateCode(
    problemId,
    languageId,
  );
  const inputs = await getProblemInputs(problemId);
  const outputs = await getProblemOutputs(problemId);

  return {
    id: problemId,
    fullBoilerplateCode: fullBoilderPlate,
    inputs: inputs,
    outputs: outputs,
  };
};

async function getProblemFullBoilerplateCode(
  problemId: string,
  languageId: SUPPORTED_LANGS,
): Promise<string> {
  const id=LANGUAGE_MAPPING[languageId]?.internal  
  const defaultCode=await db.defaultCode.findFirst({
    where: {
      problemId: problemId,
      languageId: id
    },
    select: {
      fullcode: true,
    }
  })
  
  if(!defaultCode?.fullcode){
    console.log(`Boilerplate code not found for problem ${problemId} and language ${languageId}`);
    return ''
  }
  return defaultCode.fullcode;
}

async function getProblemInputs(problemId: string): Promise<Object> {
  const testCases= await db.testCase.findMany({
    where: {
      problemId: problemId,
    },
    select: {
      input: true,
    }
  })
  return (testCases.map(testCase => testCase.input));
  
}

async function getProblemOutputs(problemId: string): Promise<string[]> {
  const testCases= await db.testCase.findMany({
    where: {
      problemId: problemId,
    },
    select: {
      output: true,
    }
  })
  return testCases.map(testCase => testCase.output.join('\n'));
}
