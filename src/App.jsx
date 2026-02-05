import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Moment1 from "./pages/Moment1";
import Valentine from "./pages/Valentine";
import ValentineWeek from "./pages/valentine-week.jsx";
import ValentineFinal from "./pages/ValentineFinal.jsx";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/moment-1" element={<Moment1 />} />
                <Route path="/valentine" element={<Valentine />} />
                <Route path="/week" element={<ValentineWeek />} />
                <Route path="/final" element={<ValentineFinal />} />
            </Routes>
        </AnimatePresence>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );
}
