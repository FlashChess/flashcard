import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Homepage() {
    const LinkPart = "https://flashchess.github.io/flashcard";
    let navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [pgn, setPGN] = useState<string>("");
    const [move, setMove] = useState<number>(1);
    const [turn, setTurn] = useState<string>("white");
    const [orientation, setOrientation] = useState<string>("white");

    const handleClick = () => {
        navigate("./?title=" + title + "&description=" + description + "&pgn=" + pgn + "&move=" + move + "&turn=" + turn + "&orientation=" + orientation);
    }

    return (
        <div>
            <div>Welcome to FlashChess</div>
            <div>FlashChess Description</div>
            <div>Here you can create your own opening flashcard</div>

            <div>
                <label>Title: <input type = "text" value = { title } onChange = {(e) => setTitle(e.target.value)} /></label>
            </div>
            <div>
                <label>Description: <input type = "text" value = { description } onChange = {(e) => setDescription(e.target.value)} /></label>
            </div>
            <div>
                <label>PGN: <input type = "text" value = { pgn } onChange = {(e) => setPGN(e.target.value)} /></label>
            </div>
            <div>
                <label>Start form move: <input type = "number" value = { move } onChange = {(e) => setMove(parseInt(e.target.value))} /></label>
            </div>
            <div>
                <label>Turn: <select value = { turn } onChange = {(e) => setTurn(e.target.value)}>
                    <option value = "white" />
                    <option value = "black" />
                    </select>
                </label>
            </div>
            <div>
                <label>Orientation of chess board: <select value = { orientation } onChange = {(e) => setOrientation(e.target.value)}>
                        <option value = "white" />
                        <option value = "black" />
                    </select>
                </label>
            </div>
            {/* <button onClick = { handleClick }>Go</button> */}
            <div><a href={LinkPart + "/?title=" + title + "&description=" + description + "&pgn=" + pgn + "&move=" + move + "&turn=" + turn + "&orientation=" + orientation} >Go</a></div>
            <div>Or you can try this <a href = "https://flashchess.github.io/flashcard/?pgn=1.%20e4%20e6%202.%20d3%20d5%203.%20Nd2%20Nf6%204.%20Ngf3%20c5%205.%20g3%20Nc6%206.%20Bg2%20Be7%207.%20O-O%20O-O%208.%20Re1%20b5%209.%20e5%20Nd7%2010.%20Nf1%20a5%2011.%20h4%20b4&move=3&turn=black&orientation=black&title=C00%20French%20Defense:%20King%27s%20Indian%20Attack%20&description=Main">Example</a></div>
        </div>
    )
}