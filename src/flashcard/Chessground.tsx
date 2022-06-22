import { useState, useRef, useEffect } from "react";
import { Chessground as ChessgroundAPI } from "chessground";
import { Config } from "chessground/config";
import { Api } from "chessground/api"; // new

import 'chessground/assets/chessground.base.css';
import "../styles/board.css";
import "chessground/assets/chessground.cburnett.css";

export default function Chessground(config: Config) {
    const [api, setApi] = useState<Api | null>(null); // new
    const ref = useRef<HTMLDivElement>(null);

    // // count rendering
    // const count = useRef<number>(1);
    // console.log("chessground", count.current++);

    useEffect(() => {
        if (ref.current && !api) {
          const chessgroundApi = ChessgroundAPI(ref.current, { ...config });
          setApi(chessgroundApi);
        } else if (ref.current && api) {
          api.set(config);
        }
    }, [ref]);
    
    useEffect(() => {
        api?.set(config);
    }, [api, config]);

    // useEffect(() => {
    //     if (ref.current) {
    //         ChessgroundAPI(ref.current, { ...config });
    //     }
    // }, [ref, config]);

    return (
        <div ref={ref} style={{ height: '100%', width: '100%' }} />
    );
}

