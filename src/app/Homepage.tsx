import { appInsights } from "../Telemetry";

import "../styles/homepage.css";
import { useEffect } from "react";

export default function Homepage() {
    const handleClick = () => {
        window.location.href = "https://flashchess.org/#/create";
    }

    const flashcardWikipedia = "https://en.wikipedia.org/wiki/Flashcard";
    const example1 = "https://flashchess.org/#/flashcard/?title=Queen%27s%20Gambit%20Accepted%20(Classic%20Nf3)&description=It%20is%20not%20really%20much%20of%20a%20gambit%20since%20white%20can%20recover%20the%20pawn%20immediately%20with%203.%20Qa4+,%20though%20unless%20white%20wants%20the%20queen%20placed%20on%20c4,%20this%20is%20unnecessary.%20Black%20does%20better%20not%20to%20hold%20on%20to%20the%20pawn.%20Attempts%20to%20immediately%20support%20it%20with%20either%203...b5%20or%203...Be6%20are%20not%20advisable.%20Black%27s%20biggest%20concern%20is%20to%20take%20advantage%20of%20the%20time%20it%20takes%20white%20to%20recover%20the%20pawn%20to%20get%20the%20pieces%20active%20and%20prepare%20for%20key%20pawn%20breaks%20in%20the%20center%20(usually%20...c5%20or%20...e5).%20White%20usually%20has%20better%20control%20of%20the%20center%20and%20has%20an%20easier%20time%20developing%20an%20advantage,%20but%20must%20play%20well%20to%20achieve%20this.&pgn=1.%20d4%20d5%202.%20c4%20dxc4%203.%20Nf3%20Nf6%204.%20e3%20e6%205.%20Bxc4%20c5%206.%20O-O%20a6&move=2&turn=black&orientation=white";
    const example2 = "https://flashchess.org/#/flashcard/?title=Queen%27s%20Gambit%20Declined%20Exchange%20Variation%20(Long)%20(5.%20Bg5%20c6)&description=With%203...Nf6%20Black%20begins%20the%20development%20of%20his%20minor%20pieces,%20continues%20to%20fight%20for%20the%20center,%20including%20the%20battleground%20squares%20d5%20and%20e4,%20and%20gets%20closer%20to%20castling.&pgn=1.%20d4%20d5%202.%20c4%20e6%203.%20Nc3%20Nf6%204.%20cxd5%20exd5%205.%20Bg5%20c6%206.%20e3%20Be7%207.%20Bd3%20Nbd7%208.%20Qc2%20O-O%209.%20Nge2%20Re8%2010.%20O-O%20Nf8%2011.%20f3%20Be6%2012.%20Rad1%20Rc8%2013.%20Kh1%20Ng6%2014.%20a3%20Nd7%2015.%20Bxe7%20Qxe7%2016.%20b4%20Nb6&move=2&turn=black&orientation=black";
    const example3 = "https://flashchess.org/#/flashcard/?title=Najdorf%20Sicilian,%20English%20Attack%20(12%20g5)&description=Plan%20for%20white%20pawn%20attack%20on%20the%20g%20line%20after%20castling.&pgn=1.%20e4%20c5%202.%20Nf3%20d6%203.%20d4%20cxd4%204.%20Nxd4%20Nf6%205.%20Nc3%20a6%206.%20Be3%20e5%207.%20Nb3%20Be6%208.%20f3%20Be7%209.%20Qd2%20O-O%2010.%20O-O-O%20Nbd7%2011.%20g4%20b5%2012.%20g5%20b4%2013.%20Ne2%20Ne8%2014.%20f4%20a5%2015.%20f5&move=3&turn=white&orientation=white";
    const example4 = "https://flashchess.org/#/flashcard?title=Caro-Kann%20Defence:%20Classical%20Variation&description=The%20vast%20majority%20of%20times,%20black%20plays%20the%20solid%203...dxe4,%20one%20of%20the%20most%20well-studied%20of%20the%20Caro-Kann%20lines.%20Black%20has%20alternatives%20to%20avoid%20the%20weight%20of%20theory,%20although%203...e6,%20blocking%20the%20bishop,%20and%20effectively%20forming%20a%20French,%20with%20one%20tempo%20less,%20seems%20a%20dubious%20line.&pgn=1.%20e4%20c6%202.%20d4%20d5%203.%20Nc3%20dxe4%204.%20Nxe4%20Bf5%205.%20Ng3%20Bg6%206.%20h4%20h6%207.%20Nf3%20Nd7%208.%20h5%20Bh7%209.%20Bd3%20Bxd3%2010.%20Qxd3%20e6%2011.%20Bd2%20Ngf6%2012.%20O-O-O%20Be7%2013.%20Kb1%20O-O&move=1&turn=black&orientation=black";
    const example5 = "https://flashchess.org/#/flashcard/?title=French%20Defence:%20Advance%20Variation,%20Euwe%20Variation&description=White%20gains%20some%20space%20advantage%20immediately,%20and%20prevents%20Black%20from%20developing%20their%20king%27s%20knight%20to%20its%20most%20natural%20square%20f6.%20Black%27s%20plan%20is%20straightforward:%20They%20want%20to%20eliminate%20White%27s%20pawns%20on%20d4/e5%20-%20and%20after%20doing%20so,%20Black%20will%20find%20it%20easier%20to%20develop%20the%20pieces%20of%20their%20kingside%20to%20good%20squares.&pgn=1.%20e4%20e6%202.%20d4%20d5%203.%20e5%20c5%204.%20c3%20Nc6%205.%20Nf3%20Bd7%206.%20Be2%20Nge7%207.%20Na3%20cxd4%208.%20cxd4%20Nf5%209.%20Nc2%20Qb6%2010.%20O-O&move=2&turn=black&orientation=black";

    useEffect(() => {
        appInsights.trackEvent({
            name: "Home"
        });
    }, []);

    return (
        <div>
            <div className="homepage-content">
                <div className="descriptionAndExamples-box">
                    <div className="flashchess-description">
                        <div className="paragraph">
                            To play chess well it is important to be familiar with numerous chess openings (because your opponents will be!). What even more important is not to confuse similar lines and always play the right moves.
                        </div>

                        <div className="paragraph">
                            We observed that studying or playing (even a lot!) a chess opening doesn't necessarily lead to its memorization. It requires many iterations and has a tendency of slipping away as the time passes by.
                        </div>

                        <div className="paragraph">
                            Flash Chess is a platform designed solely for memorizing chess openings. The approach is inspired by <a href={flashcardWikipedia}>flashcard</a> concept:
                        </div>

                        <div className="paragraph wiki-article">
                            &gt; Wiki: Flashcards are an application of the testing effect − the finding that <b>long-term memory</b> is increased when some of the learning period is devoted to retrieving the information through testing with proper feedback. Study habits affect the rate at which a flashcard-user learns, and proper spacing of flashcards has been proven to accelerate learning.
                        </div>

                        <div className="paragraph">
                            When you decide to add a new opening or variation (<div className="questions">why did my opponent get so better position last game? how should have I played instead?</div>) to your repertoire, you can create a flashcard and add it to your library.
                        </div>

                        <div className="paragraph">
                            Upon replaying, FlashChess.org will guide you through the sequence of moves giving immediate feedback and of course, congratulating when a flashcard played without errors! FlashChess.org leverages liches.org chess board to create a familiar environment and not to distract you from memorizing chess openings.
                        </div>
                    </div>
                    <div className="examples-table-box">
                        <div className="table-title-try">Give it a try!</div>
                        <div className="table-title-pre-created">Here is a list of flashcards which we pre-created:</div>

                        <table className="examples-table">
                            <tbody>
                                <tr><td><a className="table-line top-border" href={example1}>Queen's Gambit Accepted (Classic Nf3)</a></td></tr>
                                <tr><td><a className="table-line" href={example2}>Queen's Gambit Declined Exchange Variation (5. Bg5 c6)</a></td></tr>
                                <tr><td><a className="table-line" href={example3}>Najdorf Sicilian, English Attack (12 g5)</a></td></tr>
                                <tr><td><a className="table-line" href={example4}>Caro-Kann Defence: Classical Variation</a></td></tr>
                                <tr><td><a className="table-line" href={example5}>French Defence: Advance Variation, Euwe Variation</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <button className="create-button" onClick={handleClick}>Create your own opening flashcard</button>
            </div>
        </div>
    );
}