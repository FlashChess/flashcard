export default function toDests(chess: any) {
    const dests = new Map();
    chess.board().forEach((b: any) => {
        b.forEach((s: any) => {
            if (s != null) { 
                const ms = chess.moves({ square: s.square, verbose: true }); 
                if (ms.length){
                    const newMS = [];
                    for (let i = 0; i < ms.length; i++){
                        newMS[i] = ms[i].to;
                    }
                    dests.set(s.square, newMS);
                }
            }
        })
    })

    return (dests);
}