import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../../pages/home";
import { AboutPomorodo } from "../../pages/AboutPomodoro";
import { NotFound } from "../../pages/NotFound";

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about-pomodoro/" element={<AboutPomorodo />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
