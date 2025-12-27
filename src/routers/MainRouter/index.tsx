import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Home } from "../../pages/home";
import { AboutPomorodo } from "../../pages/AboutPomodoro";
import { NotFound } from "../../pages/NotFound";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about-pomodoro/" element={<AboutPomorodo />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
