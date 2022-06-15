import { useState } from "react";

import ChBoard from "./flashcard/ChBoard";

export default function Flashcard(title: string, description: string, pgnArray: string[], move: number, turn: string, orientation: string) {
    return (
        <div className = "flashcard">
            <div className = "title">{ title }</div>
            <div className = "description">{ description }</div>
            <div className = "board"></div>
            <div id = "PGNprint" />
        </div>
    );
}