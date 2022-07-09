// Telemetry
import { appInsights } from "../Telemetry";

// Other
import { useEffect, useState } from 'react';
import "../styles/create-flashcard.css";
const murmurhash = require('murmurhash');

export default function CreateFlashcard() {
    const LinkPart = "https://flashchess.org/#/flashcard/?";

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [pgn, setPGN] = useState<string>("");
    const [move, setMove] = useState<number>(1);
    const [turn, setTurn] = useState<string>("white");
    const [orientation, setOrientation] = useState<string>("white");

    const Create = () => {
        appInsights.trackEvent({
            name: "Create",
            properties: {
                Hash: murmurhash.v3(pgn + move + turn + orientation)
            }
        });
        window.location.href = LinkPart + "title=" + title + "&description=" + description + "&pgn=" + pgn + "&move=" + move + "&turn=" + turn + "&orientation=" + orientation;
    }

    useEffect(() => {
        appInsights.trackEvent({ name: "Create Page" });
    }, []);

    useEffect(() => {
        if (move < 1) {
            setMove(1);
        }
    }, [move])

    return (
        <div>
            <div className="newFlashcard-form-box">
                <div className="newFlashcard-form">
                    <div className="newFlashcard-text param">Create your own opening flashcard:</div>

                    <div>
                        <div>Title</div>
                        <textarea className="title-textarea" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div>
                        <div>Descritption</div>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div>
                        <div className="pgn-text">
                            <div>PGN (</div>
                            <div className="link">you can create it on <a href="https://lichess.org/analysis" target="_blank">lichess</a></div>
                            <div>)</div>
                        </div>
                        <textarea className="pgn-textarea" value={pgn} onChange={(e) => setPGN(e.target.value)} />
                    </div>

                    <div className="label-parts">
                        <div>
                            <label>Start move: <input className="move-input" type="number" value={move} onChange={(e) => setMove(parseInt(e.target.value))} /></label>
                        </div>
                        <div>
                            <label>Turn: <select value={turn} onChange={(e) => setTurn(e.target.value)}>
                                <option value="white">white</option>
                                <option value="black">black</option>
                            </select>
                            </label>
                        </div>
                        <div>
                            <label>Orientation: <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                                <option value="white">white</option>
                                <option value="black">black</option>
                            </select>
                            </label>
                        </div>
                    </div>

                    <button onClick={Create}>Create</button>
                </div>
            </div>
        </div>
    )
}