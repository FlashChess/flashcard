import { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { pgnPrint } from '@mliebelt/pgn-viewer';
import useSound from "use-sound";

import Chessground from "./flashcard/Chessground";
import { Config } from "chessground/config";
import toDests from "./flashcard/to-dests";
import "./styles/chboard.css";
import ConvertPGNtoArray from "./flashcard/ConvertPGNtoArrya";
import { count } from "console";

// import ChBoard from "./flashcard/ChBoard";

// http://localhost:3000/flashcard/?pgn=1.%20e4%20e5%202.%20Nf3%20Nc6%203.%20Bb5%20a6%204.%20Ba4%20Nf6%205.%20O-O%20Be7%206.%20Re1%20b5%207.%20Bb3&move=3&turn=black&orientation=white&title=Closed%20Ruy%20Lopez&description=Black%20chose%20not%20to%20capture%20White%27s%20e-pawn%20on%20the%20previous%20move,%20but%20the%20threat%20still%20hangs%20over%20White%27s%20head.%20White%20typically%20removes%20it%20with

// Sound
const moveSound = require("./sound/move.mp3");
const captureSound = require("./sound/capture.mp3");
const errorSound = require("./sound/error.mp3");
const energySound = require("./sound/energy.mp3");

export default function Flashcard(title: string, description: string, plannedPGN: string, move: number, turn: string, orientation: "white" | "black") {
  // Variables that computed once
  const pgnArray = useRef<string[]>([]);
  const initialPGN = useRef<string>();
  const initialFEN = useRef<string>();
  const point = useRef<number>(0);

  // Variables that determine current state
  const [fen, setFen] = useState<string>();
  let chess = new Chess(fen);
  const turnColor = chess.turn() === "w" ? "white" : "black";
  const pgn = useRef<string>();
  const [ind, setInd] = useState(-1);
  const saveFromTo = useRef<any>();

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
    return (pgnArray.current[ind]);
  }

  const changePGN_forPrinting = () => {
    var temp = chess.history();
    pgn.current += " " + temp[temp.length - 1];
  }

  const resetOfChess = () => {
    pgn.current = initialPGN.current;
    chess = new Chess(initialFEN.current);
    setFen(chess.fen);
    setInd(point.current);
  }

  const handleMove = (from: any, to: any) => {
    saveFromTo.current = [from, to];

    chess.move({ from, to, promotion: 'q' });

    setTimeout(() => {
      setFen(chess.fen());
    }, 200);

    if (isItPlannedMove()) {
      if (getLastMove().includes("x")) {
        playCaptureSound();
      }
      else {
        playMoveSound();
      }

      changePGN_forPrinting();
      setInd(ind + 1);
    }
    else {
      setTimeout(() => {
        playErrorSound();
        chess.undo();
        setFen(chess.fen);
      }, 100)
    }
  };

  const handleHint = () => {
    if (ind >= pgnArray.current.length) {
      return;
    }

    chess.move(pgnArray.current[ind]);
    setFen(chess.fen());
    if (ind < pgnArray.current.length) {
      changePGN_forPrinting();
      setInd(ind + 1);
    }

    if (getLastMove().includes("x")) {
      playCaptureSound();
    }
    else {
      playMoveSound();
    }
  };

  const goodJob = () => {
    playEnergySound();
    return (
      <h1>Good Job</h1>
    );
  };

  useEffect(() => {
    pgnPrint('PGNprint', { pgn: pgn.current, notationLayout: 'list' });
  }, [pgn.current]);

  // For Testing
  // const countRendering = useRef<number>(1);
  // console.log(countRendering.current++);

  // executes only once at the end of first rendering 
  useEffect(() => {
    if (turn == "white") {
      point.current = (move - 1) * 2;
    }
    else {
      point.current = (move - 1) * 2 + 1;
    }

    pgnArray.current = ConvertPGNtoArray(plannedPGN);
    const tempChess = new Chess();
    for (let i = 0; i < point.current; i++) {
      tempChess.move(pgnArray.current[i]);
    }

    initialPGN.current = tempChess.history().join(' ');
    initialFEN.current = tempChess.fen();
    setFen(initialFEN.current);
    pgn.current = initialPGN.current;
    setInd(point.current);
  }, []);

  const myViewOnly: Config['viewOnly'] = !(ind < pgnArray.current.length);

  const myMovable: Config['movable'] = {
    free: false,
    color: turnColor,
    dests: toDests(chess),
    showDests: true,
    events: {
      after: handleMove
    }
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
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="board">
        <Chessground
          viewOnly={myViewOnly}
          fen={fen}
          orientation={orientation}
          turnColor={turnColor}
          movable={myMovable}
          check={chess.in_check()}
          lastMove={myLastMove}
          highlight={myHighlight}
          animation={myAnimation}
          draggable={myDraggable}
        />
      </div>
      <div id="PGNprint" />
      <button onClick={resetOfChess}>Do again</button>
      <button onClick={handleHint}>Hint</button>
      <div>
        {ind >= pgnArray.current.length && goodJob()}
      </div>
    </div>
  );
}