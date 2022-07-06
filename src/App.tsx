import { HashRouter, Routes, Route } from "react-router-dom";

import Homepage from './Homepage';
import CreateFlashcard from "./app/CreateFlashcard";
import PreFlashcard from './PreFlashcard';
import "./styles/index.css";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/create" element={<CreateFlashcard />} />
                <Route path="/flashcard" element={<PreFlashcard />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </HashRouter>
    );
}