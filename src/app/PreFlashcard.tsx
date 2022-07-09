import { useSearchParams } from "react-router-dom";

import Flashcard from "./Flashcard";

export default function PreFlashcard(){
    // Read URL variables 
    const [searchParams, setSearchParams] = useSearchParams();

    const title = "" + searchParams.get("title");
    const description = "" + searchParams.get("description");
    const plannedPGN = searchParams.get("pgn");
    const move = searchParams.get("move");
    var turn : "white" | "black" = (searchParams.get("turn") === "black") ? "black" : "white";
    var orientation : "white" | "black" = (searchParams.get("orientation") === "black") ? "black" : "white";

    if (plannedPGN !== null && (move !== null && parseInt(move) !== null)){
        return (Flashcard(title, description, plannedPGN, parseInt(move), turn, orientation));
    }
    else {
      return (<h1>Incorrect URL</h1>);
    }
}