"use client";
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import MDEditor from "@uiw/react-md-editor";
import { PlusIcon } from "lucide-react";
import styles from "./CreateProblemForm.module.css";
import Dropdown from "./Dropdown";

const CreateProblemForm = () => {
  const [problemName, setProblemName] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [inputFields, setInputFields] = useState([{ type: "", name: "" }]);
  const [outputFields, setOutputFields] = useState([{ type: "", name: "" }]);
  const [testCases, setTestCases] = useState([
    { input: [], output: [] }
  ]);
  const [descriptionValue, setDescriptionValue] = useState(
    "**Code Description here**"
  );

  const addInputField = () => {
    setInputFields([...inputFields, { type: "", name: "" }]);
  };

  const addOutputField = () => {
    setOutputFields([...outputFields, { type: "", name: "" }]);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: [], output: [] }]);
  };



  interface DataItem {
    input: string[];
    output: string[];
}


interface ParsedItem {
    input: (string | string[])[];
    output: string[];
}


//to parse testcases for the api
function parseInput(dataArray: any[]): any[] {
    function processString(inputStr: any): (any | any[])[] {
        let tempArr: (any | any[])[] = [];
        let currentNum = '';
        let nestedArr: any[] | null = null;

        for (let char of inputStr) {
            if (char === '[') {
                if (nestedArr === null) {
                    nestedArr = [];
                }
            } else if (char === ']') {
                if (currentNum) {
                    nestedArr?.push(currentNum);
                    currentNum = '';
                }
                if (nestedArr) {
                    tempArr.push(nestedArr);
                    nestedArr = null;
                }
            } else if (char === ',') {
                if (currentNum) {
                    if (nestedArr !== null) {
                        nestedArr.push(currentNum);
                    } else {
                        tempArr.push(currentNum);
                    }
                    currentNum = '';
                }
            } else {
                currentNum += char;
            }
        }
        if (currentNum) {
            tempArr.push(currentNum);
        }

        return tempArr;
    }
    return dataArray.map(data => ({
        input: processString(data.input[0]),
        output: data.output
    }));
}




  const validateFormData = () => {
    if (!problemName.trim()) return false;
    if (!functionName.trim()) return false;
    if (!descriptionValue.trim()) return false;

    const validInputs = inputFields.every(
      (field) => field.type.trim() && field.name.trim()
    );
    if (!validInputs) return false;

    const validOutputs = outputFields.every(
      (field) => field.type.trim() && field.name.trim()
    );
    if (!validOutputs) return false;

    const validTestCases = testCases.every(
      (test) => test.input[0] && test.output[0]
    );
    if (!validTestCases) return false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData()) {
      console.error("Form validation failed");
      return;
    }

    try {
      const payload = {
        problemName,
        functionName,
        inputFields: inputFields.map(field => ({
          type: field.type.toLowerCase(),
          name: field.name
        })),
        outputFields: outputFields.map(field => ({
          type: field.type.toLowerCase(),
          name: field.name
        })),
        testCases:parseInput(testCases),
        problemDescription: descriptionValue,
        problemMarkdown: descriptionValue
      };

      const response = await axios.post("/api/problems/create", payload);
      console.log("Problem Created:", response.data);
    } catch (error) {
      console.error("Error creating problem:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-1 border border-1 rounded-xl">
        <div className="bg-slate-900 pb-[20px] mb-4 text-2xl pt-2 p-4 h-16">
          <div>Problem Details</div>
          <div className="text-sm text-gray-400">Enter problem information</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8 px-4">
          <div>
            <label className="block mb-2">Problem Name</label>
            <Input
              placeholder="Problem Name"
              value={problemName}
              onChange={(e) => setProblemName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Problem Description</label>
            <div className={styles.editor}>
              <MDEditor
                value={descriptionValue}
                preview="edit"
                onChange={setDescriptionValue}
                data-color-mode="dark"
              />
            </div>
            <Dropdown />
          </div>

          <div>
            <label className="block mb-2">Function Name</label>
            <Input
              placeholder="Function Name"
              value={functionName}
              onChange={(e) => setFunctionName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Input Fields</label>
            {inputFields.map((inputField, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <Input
                  placeholder="Input Type (e.g., list<int>)"
                  value={inputField.type}
                  onChange={(e) => {
                    const newInputFields = [...inputFields];
                    newInputFields[index].type = e.target.value;
                    setInputFields(newInputFields);
                  }}
                  required
                />
                <Input
                  placeholder="Input Name (e.g., arr)"
                  value={inputField.name}
                  onChange={(e) => {
                    const newInputFields = [...inputFields];
                    newInputFields[index].name = e.target.value;
                    setInputFields(newInputFields);
                  }}
                  required
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={addInputField}
              className="bg-black p-0 m-0 h-4 text-white"
            >
              <PlusIcon size={20} /> Add Input
            </Button>
          </div>

          <div>
            <label className="block mb-2">Output Fields</label>
            {outputFields.map((outputField, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <Input
                  placeholder="Output Type (e.g., int)"
                  value={outputField.type}
                  onChange={(e) => {
                    const newOutputFields = [...outputFields];
                    newOutputFields[index].type = e.target.value;
                    setOutputFields(newOutputFields);
                  }}
                  required
                />
                <Input
                  placeholder="Output Name (e.g., result)"
                  value={outputField.name}
                  onChange={(e) => {
                    const newOutputFields = [...outputFields];
                    newOutputFields[index].name = e.target.value;
                    setOutputFields(newOutputFields);
                  }}
                  required
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={addOutputField}
              className="bg-black p-0 m-0 h-4 text-white"
            >
              <PlusIcon size={20} /> Add Output
            </Button>
          </div>

          <div>
            <label className="block mb-2">Test Cases</label>
            {testCases.map((testCase, index) => (
              <div key={index} className="space-y-4 mb-4 p-4 border rounded">
                <div className="flex gap-4">
                  <Input
                    placeholder="(e.g., 1,2)"
                    value={testCase.input[0]}
                    onChange={(e) => {
                      const newTestCases = [...testCases];
                      newTestCases[index].input[0] = e.target.value;
                      setTestCases(newTestCases);
                    }}
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <Input
                    placeholder="Expected Output"
                    value={testCase.output[0]}
                    onChange={(e) => {
                      const newTestCases = [...testCases];
                      newTestCases[index].output[0] = e.target.value;
                      setTestCases(newTestCases);
                    }}
                    required
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={addTestCase}
              className="bg-black p-0 m-0 h-4 text-white"
            >
              <PlusIcon size={20} /> Add Test Case
            </Button>
          </div>

          <div className="pb-2">
            <Button type="submit" className="w-full">
              Create Problem
            </Button>
          </div>
        </form>
      </div>
      <div className="col-span-1">
        <div className="p-4 border rounded">
          <h2 className="text-3xl font-semibold mb-4">Preview</h2>
          <div className="border border-1 min-h-60 rounded-lg p-2">
            <MDEditor.Markdown
              source={descriptionValue}
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProblemForm;