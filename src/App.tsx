import "./styles/theme.css";
import "./styles/global.css";

import { Home } from "./pages/home";
import { TaskContextProvider } from "./contexts/TaskContext";

export function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
