import { useState, useRef, useEffect } from "react";
import { Chessground as ChessgroundAPI } from "chessground";
import { Config } from "chessground/config";
import { Api } from "chessground/api";

import 'chessground/assets/chessground.base.css';
import "../../styles/board.css";
import "chessground/assets/chessground.cburnett.css";

export default function Chessground(config: Config) {
    const [api, setApi] = useState<Api | null>(null);
    const ref = useRef<HTMLDivElement>(null);

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

    return (
        <div ref={ref} style={{ height: '100%', width: '100%' }} />
    );
}

