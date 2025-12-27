import "./styles/theme.css";
import "./styles/global.css";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { Message } from "./components/Message";
import { MainRouter } from "./routers/MainRouter";

export function App() {
  return (
    <TaskContextProvider>
      <Message>
        <MainRouter />
      </Message>
    </TaskContextProvider>
  );
}
