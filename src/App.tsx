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
    const plannedPGN = searchParams.get("pgn");
    const move = searchParams.get("move");
    const turn = searchParams.get("turn");
    const orientation = searchParams.get("orientation");
    const title = searchParams.get("title");
    const description = "" + searchParams.get("description");

    if (title !== null && plannedPGN !== null && move !== null && turn !== null && orientation !== null){
        return (Flashcard(title, description, plannedPGN, parseInt(move), turn, orientation));
    }
    else {
      return (<Homepage />);
    }
}