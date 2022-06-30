import { useSearchParams } from "react-router-dom";

import Flashcard from "./Flashcard";
import Homepage from "./Homepage";

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
    const plannedPGN = searchParams.get("pgn");
    const move = searchParams.get("move");
    var turn : "white" | "black" = (searchParams.get("turn") === "black") ? "black" : "white";
    var orientation : "white" | "black" = (searchParams.get("orientation") === "black") ? "black" : "white";

    if (title !== null && plannedPGN !== null && (move !== null && parseInt(move) !== null)){
        return (Flashcard(title, plannedPGN, parseInt(move), turn, orientation));
    }
    else {
      return (<Homepage />);
    }
}