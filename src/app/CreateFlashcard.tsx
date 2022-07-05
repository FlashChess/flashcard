// Telemetry
import { appInsights } from "../Telemetry";

// Other
import { useEffect, useState } from 'react';
import "../styles/create-flashcard.css";
const murmurhash = require('murmurhash');
const exampleLink = "https://flashchess.github.io/flashcard/?pgn=1.%20e4%20e6%202.%20d3%20d5%203.%20Nd2%20Nf6%204.%20Ngf3%20c5%205.%20g3%20Nc6%206.%20Bg2%20Be7%207.%20O-O%20O-O%208.%20Re1%20b5%209.%20e5%20Nd7%2010.%20Nf1%20a5%2011.%20h4%20b4&move=3&turn=black&orientation=black&title=C00%20French%20Defense:%20King%27s%20Indian%20Attack%20&description=Main";

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
        appInsights.trackEvent({ name: "Home" });
    }, []);

    return (
        <div className="homepage-box">
            <div className="homepage-title">Welcome to FlashChess</div>

            <div className="homepage-project-description">
                <div className="paragraph">
                    <b>FlashChess</b> - is a platform for learning chess openings. <br />
                </div>
                <div className="paragraph">Two ways how to use it:</div>
                <div>1. Create opening flashcard like <a href={exampleLink}>this</a> and save its link somewhere <br />&nbsp;&nbsp;&nbsp; (e.g. in OneNote).</div>
                <div>2. Create your account and save your flashcard there (in developing).</div>
            </div>

            <div className="homepage-form">
                <div className="homepage-text param">Create your own opening flashcard:</div>

                <div>
                    <div>Title</div>
                    <textarea className="pd-textarea title-textarea" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div>
                    <div>Descritption</div>
                    <textarea className="pd-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <div className="pgn-text">
                        <div>PGN (</div>
                        <div className="link">you can create it on&nbsp; <a href="https://lichess.org/analysis" target="_blank">lichess</a></div>
                        <div>)</div>
                    </div>
                    <textarea className="pd-textarea" value={pgn} onChange={(e) => setPGN(e.target.value)} />
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
    )
}