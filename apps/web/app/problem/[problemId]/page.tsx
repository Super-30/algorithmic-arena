
import ProblemPageClient from "../../../components/ProblemPageClient";
import { ProblemStatement } from "../../../components/ProblemStatement";
import { ProblemSubmitBar } from "../../../components/ProblemSubmitBar";
import { getProblem } from "../../db/problem";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default async function ProblemPage({
  params: { problemId },
}: {
  params: {
    problemId: string;
  };
}) {
  const problem = await getProblem(problemId);
  if (!problem) {
    return <div>Problem not found</div>;
  }
  // console.log(problem);

  return (
    <ProblemPageClient problem={problem} />
  );
}
export const dynamic = "force-dynamic";
