import { Roadmap } from "../../components/Roadmap";
import { getProblems } from "../db/problem";

export default async function Page(): Promise<JSX.Element> {
  
  const problems = await getProblems();

  return (
    <main>
      <div className="grid-cols-12 ">
        <div className="cols-span-2"></div>
        <div className="cols-span-8">
        
        </div>
      </div>
      <Roadmap problems={problems} className='ml-8'/>
    </main>
  );
}

export const dynamic = "force-dynamic"; 