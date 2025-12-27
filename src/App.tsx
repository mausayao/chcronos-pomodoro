import "./styles/theme.css";
import "./styles/global.css";

import { Home } from "./pages/home";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { Message } from "./components/Message";

export function App() {
  return (
    <TaskContextProvider>
      <Message>
        <Home />
      </Message>
    </TaskContextProvider>
  );
}
