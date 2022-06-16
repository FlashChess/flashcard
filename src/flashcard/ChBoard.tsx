import { useState, useRef } from "react";
import { Chess } from "chess.js"; 

import Chessground from "./Chessground";
import { Config } from "chessground/config";
import toDests from "./to-dests";
import "../styles/chboard.css";

export default function ChBoard() {
    const [fen, SetFen] = useState<string>("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    let chess = new Chess(fen);
    const turnColor = chess.turn() === "w" ? "white" : "black";

    const saveFromTo = useRef<any>();

    const handleMove = (from: any, to: any) =>{
        chess.move({ from, to, promotion:'q' });
        SetFen(chess.fen());

        saveFromTo.current = [from, to];
    };

    const myMovable: Config['movable'] = {
        free: false,
        color: turnColor, 
        dests: toDests(chess), 
        showDests: true,
        events: {
            after: handleMove
        }
    }

    const myHighlight: Config['highlight'] = {
        lastMove: true,
        check: true
    }

    const myAnimation: Config['animation'] = {
        enabled: true,
        duration: 200
    }

    const myDraggable: Config['draggable'] = {
        showGhost: true
    } 

    const myLastMove: Config['lastMove'] = (saveFromTo != null)? saveFromTo.current : ["a0", "a0"];

    return (
        <div>
            <div className = "board">
                <Chessground 
                fen = { fen }
                orientation = "white"
                turnColor = { turnColor }
                movable = { myMovable }
                check = { chess.in_check() }
                lastMove = { myLastMove }
                highlight = { myHighlight }
                animation = { myAnimation }
                draggable = { myDraggable }
                />
            </div>
        </div>
    );
}