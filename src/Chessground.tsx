import { useState, useRef, useEffect } from "react";
import { Chessground as ChessgroundAPI } from "chessground";
import { Config } from "chessground/config";

import 'chessground/assets/chessground.base.css';
import "./styles/board.css";
import "chessground/assets/chessground.cburnett.css";

export default function Chessground(config : Config) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ChessgroundAPI(ref.current, { ...config });
    }
  });

  return (
      <div ref = { ref } style={{ height: '100%', width: '100%' }} />
  );
}

