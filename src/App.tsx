import { HashRouter, Routes, Route } from "react-router-dom";

import Homepage from './app/Homepage';
import CreateFlashcard from "./app/CreateFlashcard";
import PreFlashcard from './app/PreFlashcard';
import Feedback from "./app/Feedback";
import NotFound from "./app/NotFound";

import "./styles/app.css";


export default function App() {
    const handleHome = () => {
        window.location.href = "https://flashchess.org";
    }

    const handleNewFlashcard = () => {
        window.location.href = "https://flashchess.org/#/create";
    }

    const handleFeedback = () => {
        window.location.href = "https://flashchess.org/#/feedback";
    }

    return (
        <div className="app">
            <div className="nav-bar">
                <div className="flashchess-org">flashchess.org</div>
                <div className="buttons-box">
                    <button className="home-button" onClick={handleHome}>Home</button>
                    <button className="newFlashcard-button" onClick={handleNewFlashcard}>New Flashcard</button>
                    <button className="feedback-button" onClick={handleFeedback}>Feedback</button>
                </div>
            </div>

            <div className="content-container">
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/create" element={<CreateFlashcard />} />
                        <Route path="/flashcard" element={<PreFlashcard />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </HashRouter>
            </div>
        </div>
    );
}