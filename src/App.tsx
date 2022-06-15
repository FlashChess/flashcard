import { useSearchParams } from "react-router-dom";
import { useRef, useEffect } from "react";

import Flashcard from "./Flashcard";
import Homepage from "./Homepage";
import ConvertPGNtoArray from "./ConvertPGNtoArrya";

// URL Api 
// http://localhost:3000/flashcards/?
// title=&
// description=&
// pgn=&
// move=&
// turn=&
// orientation=

export default function App(){
    // Read URL variables 
    const [searchParams, setSearchParams] = useSearchParams();

    const title = searchParams.get("title");
    const description = "" + searchParams.get("description");

    const plannedPGN = useRef<string>(searchParams.get("pgn"));
    let pgn: string[] = []; 

    useEffect(() => {
      if (plannedPGN.current === null){
        pgn = [];
      }
      else {
        pgn = ConvertPGNtoArray(plannedPGN.current)
      }
    }, [plannedPGN.current]);


    const move = searchParams.get("move");
    var turn : "white" | "black" = (searchParams.get("turn") === "black") ? "black" : "white";
    var orientation : "white" | "black" = (searchParams.get("orientation") === "black") ? "black" : "white";

    if (title !== null && plannedPGN !== null && (move !== null && parseInt(move) !== null) && turn !== null && orientation !== null){
        return (Flashcard(title, description, pgn, parseInt(move), turn, orientation));
    }
    else {
      return (<Homepage />);
    }
}