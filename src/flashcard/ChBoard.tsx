import { useState, useRef } from "react";
import { Chess } from "chess.js";
import { Config } from "chessground/config";
import { Key } from "chessground/types";
import { Square } from "chess.js";

import Chessground from "./Chessground";
import toDests from "./to-dests";
import "../styles/chboard.css";

export default function ChBoard() {
    const [fen, setFen] = useState<string>("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    let chess = new Chess(fen);
    const turnColor = chess.turn() === "w" ? "white" : "black";

    const saveFromTo = useRef<any>();

    const handleMove = (from: any, to: any) => {
        saveFromTo.current = [from, to];
        chess.move({ from, to, promotion: 'q' });
        // SetFen(chess.fen());
        setTimeout(() => {
            setFen(chess.fen());
        }, 200);
    };

    const myMovable: Config['movable'] = {
        free: true,
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

    const myLastMove: Config['lastMove'] = (saveFromTo != null) ? saveFromTo.current : ["a0", "a0"];

    const myMovable2: Config['movable'] = {
        free: true,
        color: turnColor,
        dests: toDests(chess),
        showDests: true
    }

    const myMove = (orig: Key, dest: Key): void => {
        if (orig === 'a0' || dest === 'a0'){
            return
        }
        let from: Square = orig;
        let to: Square = dest; 

        saveFromTo.current = [from, to];
        chess.move({ from, to, promotion: 'q' });
        setTimeout(() => {
            setFen(chess.fen());
        }, 200);
    }

    const myEvents: Config['events'] = {
        move: myMove
    }

    return (
        <div>
            {/* <div className="board">
                <Chessground
                    fen={fen}
                    orientation="white"
                    turnColor={turnColor}
                    movable={myMovable}
                    check={chess.in_check()}
                    lastMove={myLastMove}
                    highlight={myHighlight}
                    animation={myAnimation}
                    draggable={myDraggable}
                />
            </div> */}
            <div className="board">
                <Chessground
                    fen={fen}
                    orientation="white"
                    turnColor={turnColor}
                    movable={myMovable2}
                    check={chess.in_check()}
                    lastMove={myLastMove}
                    highlight={myHighlight}
                    animation={myAnimation}
                    draggable={myDraggable}
                    events={myEvents}
                />
            </div>
        </div>
    );
}