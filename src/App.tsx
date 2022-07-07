import { useSearchParams } from "react-router-dom";

import Flashcard from "./app/Flashcard";
import CreateFlashcard from "./app/CreateFlashcard";

export default function App(){
    // Read URL variables 
    const [searchParams, setSearchParams] = useSearchParams();

    const title = searchParams.get("title");
    const description = "" + searchParams.get("description");
    const plannedPGN = searchParams.get("pgn");
    const move = searchParams.get("move");
    var turn : "white" | "black" = (searchParams.get("turn") === "black") ? "black" : "white";
    var orientation : "white" | "black" = (searchParams.get("orientation") === "black") ? "black" : "white";

    if (title !== null && plannedPGN !== null && (move !== null && parseInt(move) !== null)){
        return (Flashcard(title, description, plannedPGN, parseInt(move), turn, orientation));
    }
    else {
      return (<CreateFlashcard />);
    }
}