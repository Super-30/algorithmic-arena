import React from "react";
import CreateProblemForm from "../../../../components/CreateProblemForm";
import { getProblems } from "../../../db/problem";


const page = async () => {
  const problems = await getProblems();
  return (
    <div className="container md:mt-12 mt-6">
      <h1 className="lg:text-2xl font-bold md:text-xl text-muted-foreground text-lg">
        Create Contest
      </h1>

      <div className="md:mt-12 mt-6">
        <CreateProblemForm  />
      </div>
    </div>
  );
};

export default page;
