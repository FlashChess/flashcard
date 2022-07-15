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
        <div className="newFlashcard-container">
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
                        <div>PGN (<span className="small-font">you can create it on <a className="lichess-link" href="https://lichess.org/analysis" target="_blank">lichess</a>, play the sequence of moves and coppy PGN under the board</span>)</div>
                    </div>
                    <textarea className="pgn-textarea" value={pgn} onChange={(e) => setPGN(e.target.value)} />
                </div>

                <table>
                    <tbody>
                        <tr>
                            <td>Start move</td>
                            <td><input className="move-input" type="number" value={move} onChange={(e) => setMove(parseInt(e.target.value))} /></td>
                        </tr>
                        <tr>
                            <td>Turn</td>
                            <td>
                                <select value={turn} onChange={(e) => setTurn(e.target.value)}>
                                    <option value="white">white</option>
                                    <option value="black">black</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Orientation</td>
                            <td>
                                <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                                    <option value="white">white</option>
                                    <option value="black">black</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="text">
                    <div className="text-1st-div">* Currently we support only opening flashcards through links. Once created (you will be navigated to a new page), copy its link (URL) and save it somewhere (e.g., OneNote). </div>
                    <div>** We're working on account system and maintaining your opening library online. Stay tuned!</div>
                </div>

                <div className="create-button-box">
                    <button className="create-button" onClick={Create}>Create</button>
                </div>
            </div>
        </div>
    )
}