import Kanban from "../components/Kanban";
import SideMenu from "../components/SideMenu";
import TaskCard from "../components/TaskCard";
import TopMenu from "../components/TopMenu";

export default function Home() {
  return <>
    <SideMenu />
    <main>     
      <TopMenu />
      <Kanban />
    </main>
  </>
}
