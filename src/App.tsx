import { HashRouter, Routes, Route } from "react-router-dom";

import Homepage from './app/Homepage';
import CreateFlashcard from "./app/CreateFlashcard";
import PreFlashcard from './app/PreFlashcard';
import "./styles/app.css";
import NotFound from "./app/NotFound";

export default function App() {
    return (
        <div className="app">
            <div className="nav-bar">
                <div className="flashchess-org">flashchess.org</div>
            </div>

            <div className="content-container">
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/create" element={<CreateFlashcard />} />
                        <Route path="/flashcard" element={<PreFlashcard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </HashRouter>
            </div>
        </div>
    );
}