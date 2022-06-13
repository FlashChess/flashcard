import React, { useState, useRef, useEffect } from "react";
import Chessground from "./Chessground";
import ConvertPGNtoArray from "./ConvertPGNtoArray";


export default function Flashcard(title: string, description: string, plannedPGN: string, move: number, turn: string, orientation: string) {
    const ArrPlannedPGN = useRef<string[]>([]);
    const initialPGN = useRef<string>();
    const initialFEN = useRef<string>(); 
    const point = useRef<number>(0);

    useEffect(() => {
        if (turn == "white"){
          point.current = (move - 1) * 2;
        }
        else {
          point.current = (move - 1) * 2 + 1; 
        }
    
        ArrPlannedPGN.current = ConvertPGNtoArray(plannedPGN);
      }, []);

    return (
        <div>Flashcard</div>
    );
}