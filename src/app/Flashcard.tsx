// Telemetry
import { appInsights } from "../Telemetry";

// Hooks
import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";

// Modules 
import { Chess } from "chess.js";
import { pgnPrint } from '@mliebelt/pgn-viewer';
import Chessground from "./flashcard/Chessground";

// TS functions
import toDests from "./flashcard/to-dests";
import ConvertPGNtoArray from "./flashcard/ConvertPGNtoArray";

// Types
import { Config } from "chessground/config";
import { Key } from "chessground/types";
import { Square } from "chess.js";

// CSS
import "../styles/flashcard.css";

// Sound
const moveSound = require("./flashcard/sound/move.mp3");
const captureSound = require("./flashcard/sound/capture.mp3");
const errorSound = require("./flashcard/sound/error.mp3");
const energySound = require("./flashcard/sound/energy.mp3");

// Hash
const murmurhash = require('murmurhash');

export default function Flashcard(title: string, description: string, plannedPGN: string, move: number, turn: "white" | "black", orientation: "white" | "black") {
    // Variables that computed once
    const pgnArray = useRef<string[]>([]);
    const initialPGN = useRef<string>();
    const initialFEN = useRef<string>();
    const startPoint = useRef<number>(0);

    // Variables that determine current state
    const [fen, setFen] = useState<string>();
    let chess = new Chess(fen);
    const turnColor = chess.turn() === "w" ? "white" : "black";
    const pgn = useRef<string>();
    const ind = useRef<number>(-1);
    const saveFromTo = useRef<any>();
    const [congrats, setCongrats] = useState<string>("");

    const [s, setS] = useState<boolean>(true);

    // Tracking 
    const numMistakes = useRef<number>(0);
    const numHints = useRef<number>(0);
    const [autoplayIsToggled, setAutoplayIsToggled] = useState<boolean>(false);

    // useSound
    const [playMoveSound] = useSound(moveSound);
    const [playCaptureSound] = useSound(captureSound);
    const [playErrorSound] = useSound(errorSound);
    const [playEnergySound] = useSound(energySound);

    // Arrow Functions:
    const isItPlannedMove = () => {
        if (chess.in_check()) {
            return (getLastMove() === getPlannedMove() + '+')
        }

        return (getLastMove() === getPlannedMove());
    }

    const getLastMove = () => {
        var temp = chess.history();
        return temp[temp.length - 1];
    }

    const getPlannedMove = () => {
        return (pgnArray.current[ind.current]);
    }

    const changePGN_forPrinting = () => {
        var temp = chess.history();
        pgn.current += " " + temp[temp.length - 1];
    }

    const resetOfChess = () => {
        pgn.current = initialPGN.current;
        chess = new Chess(initialFEN.current);
        setFen(chess.fen);
        setCongrats("");
        ind.current = startPoint.current;
        saveFromTo.current = null;

        // Tracking
        appInsights.trackEvent({
            name: "HotSpot",
            properties: {
                Name: "DoAgain",
                Hash: murmurhash.v3(plannedPGN + move + turn + orientation)
            }
        });

        // Reset tracking var
        numMistakes.current = 0;
        numHints.current = 0;
    }

    const handleHint = () => {
        if (ind.current >= pgnArray.current.length) {
            return;
        }

        chess.move(pgnArray.current[ind.current]);
        setFen(chess.fen());

        const chHistory = chess.history({ verbose: true })[0];
        saveFromTo.current = [chHistory.from, chHistory.to]

        if (ind.current < pgnArray.current.length) {
            changePGN_forPrinting();
            ind.current++;
        }

        if (getLastMove().includes("x")) {
            playCaptureSound();
        }
        else {
            playMoveSound();
        }

        // Tracking
        numHints.current++;
        appInsights.trackEvent({
            name: "HotSpot",
            properties: {
                Name: "Hint",
                Hash: murmurhash.v3(plannedPGN + move + turn + orientation)
            }
        })
    };

    const autoPlay = () => {
        setAutoplayIsToggled(!autoplayIsToggled);
    }

    const goodJob = () => {
        if (isMoveSetCompleted && congrats === "") {
            playEnergySound();

            // AppInsights
            appInsights.trackEvent({
                name: "Done",
                properties: {
                    Success: (numMistakes.current === 0 && numHints.current === 0),
                    NumMistakes: numMistakes.current,
                    NumMoves: pgnArray.current.length - startPoint.current,
                    NumHints: numHints.current,
                    Hash: murmurhash.v3(plannedPGN + move + turn + orientation)
                }
            });

            setCongrats("Good Job!");
        }
    };

    useEffect(() => {
        pgnPrint('PGNprint', { pgn: pgn.current, notationLayout: 'list' });
        goodJob();
    }, [pgn.current]);

    // // For Testing
    // const count = useRef<number>(1);
    // console.log(count.current++);

    // executes only once at the end of first rendering 
    useEffect(() => {
        if (turn == "white") {
            startPoint.current = (move - 1) * 2;
        }
        else {
            startPoint.current = (move - 1) * 2 + 1;
        }

        pgnArray.current = ConvertPGNtoArray(plannedPGN);
        const tempChess = new Chess();
        for (let i = 0; i < startPoint.current; i++) {
            tempChess.move(pgnArray.current[i]);
        }

        initialPGN.current = tempChess.history().join(' ');
        initialFEN.current = tempChess.fen();
        setFen(initialFEN.current);
        pgn.current = initialPGN.current;
        ind.current = startPoint.current;
    }, []);

    useEffect(() => {
        appInsights.trackEvent({
            name: "Start",
            properties: {
                Hash: murmurhash.v3(plannedPGN + move + turn + orientation)
            }
        })
    }, []);

    const isMoveSetCompleted: Config['viewOnly'] = !(ind.current < pgnArray.current.length);

    const myChange = () => {
        if (isItPlannedMove()) {
            if (getLastMove().includes("x")) {
                playCaptureSound();
            }
            else {
                playMoveSound();
            }

            changePGN_forPrinting();
            ind.current++;

            if (autoplayIsToggled && turnColor === orientation) {
                setTimeout(() => {   
                    handleHint();
                }, 350);
            }
        }
        else {
            playErrorSound();
            chess.undo();
            setTimeout(() => {
                setFen(chess.fen());
                setS(!s);
            }, 200);

            // Tracking
            numMistakes.current++;
        }
    };

    const myMovable: Config['movable'] = {
        free: false,
        color: turnColor,
        dests: toDests(chess),
        showDests: true,
    }

    const myMove = (orig: Key, dest: Key): void => {
        if (orig === 'a0' || dest === 'a0') {
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
        change: myChange,
        move: myMove
    }

    const myLastMove: Config['lastMove'] = (saveFromTo != null) ? saveFromTo.current : ["a0", "a0"];

    const myHighlight: Config['highlight'] = {
        lastMove: true,
        check: true
    }

    const myAnimation: Config['animation'] = {
        enabled: true,
        duration: 200,
    }

    const myDraggable: Config['draggable'] = {
        showGhost: true
    }

    return (
        <div className="flashcard">
            <div className="top-line">
                <div>
                    <div className="title">{title}</div>
                </div>
            </div>

            <div className="middle-line">
                <div className="board-buttons-with-pgn">
                    <div>
                        <div className="my_board">
                            <Chessground
                                viewOnly={isMoveSetCompleted}
                                fen={fen}
                                orientation={orientation}
                                turnColor={turnColor}
                                movable={myMovable}
                                check={chess.in_check()}
                                lastMove={myLastMove}
                                highlight={myHighlight}
                                animation={myAnimation}
                                draggable={myDraggable}
                                events={myEvents}
                            />
                        </div>

                        <div className="buttonBox">
                            <button onClick={resetOfChess}>Do again</button>
                            <button onClick={handleHint}>Hint</button>
                            <button className={autoplayIsToggled ? "autoplayToggled" : ""} onClick={autoPlay}>Autoplay for {orientation === "white" ? "black" : "white"}</button>
                        </div>

                        <div className="gj">
                            {congrats}
                        </div>
                    </div>

                    <div className="pgn-box">
                        <div className="backgr" id="PGNprint" />
                    </div>
                </div>

                <div className="description-box">
                    <div className="description-part-of-flashcard">
                        <div className="descriptionTitle">Notes</div>
                        <div>{description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}