import { db } from "../db";
import fs from "fs";
import { LANGUAGE_MAPPING } from "@repo/common/language";

type SUPPORTED_LANGS = "js" | "cpp" | "rs"|"java";

interface Problem {
  id: string;
  fullBoilerplateCode: string;
  inputs: string[];
  outputs: string[];
}

const MOUNT_PATH = process.env.MOUNT_PATH ?? "/home/ubuntu/algorithmic-arena/apps/problems";
export const getProblem = async (
  problemId: string,
  languageId: SUPPORTED_LANGS,
  title: string
): Promise<Problem> => {
  const fullBoilderPlate = await getProblemFullBoilerplateCode(
    problemId,
    languageId,
  );
  const inputs = await getProblemInputs(title.toLowerCase().replace(' ','-'));
  const outputs = await getProblemOutputs(title.toLowerCase().replace(' ','-'));

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

async function getProblemInputs(problemId: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(
      `${MOUNT_PATH}/${problemId}/tests/inputs`,
      async (err, files) => {
        if (err) {
          console.log(err);
        } else {
          await Promise.all(
            files.map((file) => {
              return new Promise<string>((resolve, reject) => {
                fs.readFile(
                  `${MOUNT_PATH}/${problemId}/tests/inputs/${file}`,
                  { encoding: "utf-8" },
                  (err, data) => {
                    if (err) {
                      reject(err);
                    }
                    resolve(data);
                  },
                );
              });
            }),
          )
            .then((data) => {
              resolve(data);
            })
            .catch((e) => reject(e));
        }
      },
    );
  });
}

async function getProblemOutputs(problemId: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(
      `${MOUNT_PATH}/${problemId}/tests/outputs`,
      async (err, files) => {
        if (err) {
          console.log(err);
        } else {
          await Promise.all(
            files.map((file) => {
              return new Promise<string>((resolve, reject) => {
                fs.readFile(
                  `${MOUNT_PATH}/${problemId}/tests/outputs/${file}`,
                  { encoding: "utf-8" },
                  (err, data) => {
                    if (err) {
                      reject(err);
                    }
                    resolve(data);
                  },
                );
              });
            }),
          )
            .then((data) => {
              resolve(data);
            })
            .catch((e) => reject(e));
        }
      },
    );
  });
}