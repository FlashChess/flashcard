import { appInsights } from "../Telemetry";

import "../styles/homepage.css";
import { useEffect } from "react";

export default function Homepage() {
    const handleClick = () => {
        window.location.href = "https://flashchess.org/#/create";
    }

    const flashcardWikipedia = "https://en.wikipedia.org/wiki/Flashcard";
    const example1 = "https://flashchess.org/#/flashcard/?title=C02%20French%20Defense:%20Advance%20Variation,%20Main%20Line%20(6.%20a3)%20&description=By%20playing%206.a3%20White%20eliminates%20any%20possibility%20of%20a%20b4%20intrusion.%20Also%20White%20is%20preparing%20to%20assert%20himself%20on%20the%20queenside%20via%20b2-b4.Furthermore,%20b2-b4%20frees%20the%20c1%20bishop%20from%20minding%20the%20b2%20pawn.&pgn=1.%20e4%20e6%202.%20d4%20d5%203.%20e5%20c5%204.%20c3%20Nc6%205.%20Nf3%20Qb6%206.%20a3%20Nge7%207.%20b4%20cxd4%208.%20cxd4%20Nf5%209.%20Bb2%20Be7%2010.%20Bd3%20Bd7%2011.%20Bxf5%20exf5%2012.%20Nc3%20Be6%2013.%20O-O&move=3&turn=white&orientation=white";
    const example2 = "https://flashchess.org/#/flashcard/?title=C02%20French%20Defense:%20Advance%20Variation,%20Euwe%20Variation&description=With%205...Bd7,%20Black%20enters%20the%20Euwe%20Variation.%20This%20move%20is%20less%20committal%20than%20the%20main%20line%205...Qb6,%20as%20it%20allows%20Black%20to%20reserve%20the%20option%20of%20where%20to%20place%20their%20Queen.&pgn=1.%20e4%20e6%202.%20d4%20d5%203.%20e5%20c5%204.%20c3%20Nc6%205.%20Nf3%20Bd7%206.%20Be2%20Nge7%207.%20Na3%20cxd4%208.%20cxd4%20Nf5%209.%20Nc2%20Qb6%2010.%20O-O%20Rc8&move=2&turn=black&orientation=black";
    const example3 = "https://flashchess.org/#/flashcard/?title=B90%20Sicilian%20Defense:%20Najdorf%20Variation,%20English%20Attack&description=The%20English%20Attack%20is%20a%20brute-force%20all-purpose%20attacking%20setup%20characterized%20by%20White's%20moves%20Be3,%20Qd2,%20f3,%20g4,%20h4,%20O-O-O,%20Rg1,%20and%20crack%20open%20the%20kingside.&pgn=1.%20e4%20c5%202.%20Nf3%20d6%203.%20d4%20cxd4%204.%20Nxd4%20Nf6%205.%20Nc3%20a6%206.%20Be3%20e5%207.%20Nb3%20%207...%20Be6%208.%20f3%20Be7%209.%20Qd2%20O-O%2010.%20O-O-O%20Nbd7%2011.%20g4%20b5%2012.%20g5&move=3&turn=white&orientation=white";
    const example4 = "https://flashchess.org/#/flashcard/?title=B35%20Sicilian%20Defense:%20Accelerated%20Dragon,%20Modern%20Bc4%20Variation&description=As%20most%20of%20the%20Sicilian%20variations,%20the%20Accelerated%20Dragon%20leads%20to%20asymmetrical%20and%20to%20some%20extent%20unbalanced%20positions.%20This%20gives%20chances%20to%20play%20for%20a%20win%20with%20Black.%20Especially%20good%20for%20dynamic%20and%20active%20players.&pgn=1.%20e4%20c5%202.%20Nf3%20Nc6%203.%20d4%20cxd4%204.%20Nxd4%20g6%205.%20Nc3%20Bg7%206.%20Be3%20Nf6%207.%20Bc4%20O-O%208.%20Bb3%20d6%209.%20f3%20Bd7%2010.%20Qd2%20Nxd4&move=3&turn=black&orientation=black";
    const example5 = "https://flashchess.org/#/flashcard/?title=Scicilian%20Fisher%20trap&description=10.%20Bxf7+&pgn=1.%20e4%20c5%202.%20Nf3%20Nc6%203.%20d4%20cxd4%204.%20Nxd4%20g6%205.%20Nc3%20Bg7%206.%20Be3%20Nf6%207.%20Bc4%20O-O%208.%20Bb3%20Na5%209.%20e5%20Ne8%2010.%20Bxf7+%20Rxf7%2011.%20Ne6&move=3&turn=white&orientation=white";
    const example6 = "https://flashchess.org/#/flashcard/?title=French%20Defence:%20Trap%20Haubrich-Orlov%201991&description=Ng3&pgn=1.%20e4%20e6%202.%20d3%20d5%203.%20Nd2%20Nf6%204.%20g3%20dxe4%205.%20dxe4%20Bc5%206.%20Ngf3%20Ng4%207.%20Qe2%20Bxf2+%208.%20Kd1%20Ne3+%209.%20Qxe3%20Bxe3&move=2&turn=black&orientation=black";

    useEffect(() => {
        appInsights.trackEvent({
            name: "Home"
        });
    }, []);

    return (
        <div className="homepage-content">
            <div className="descriptionAndExamples-box">
                <div className="flashchess-description">
                    <article>
                        <h1>About flashchess.org</h1>
                        <p>flashchess.org - is a platform designed solely for memorizing chess openings. The approach is inspired by <a href={flashcardWikipedia}>flashcard</a> concept:</p>
                        <p className="italic">&gt; Wikipedia: Flashcards are an application of the testing effect − the finding that <span className="font-weight-500">long-term memory</span> is increased when some of the learning period is devoted to retrieving the information through testing with proper feedback. Study habits affect the rate at which a flashcard-user learns, and proper spacing of <span className="font-weight-500">flashcards has been proven to accelerate learning</span>.</p>
                    </article>

                    <article className="article-margin">
                        <h1>Why it's great:</h1>
                        <p>To play chess well it's important to be familiar with numerous chess openings (because your opponents will be!). What even more important is not to confuse similar lines and always play the right moves.</p>
                        <p>We observed that studying or playing (even a lot!) a chess opening doesn't necessarily lead to its memorization. It requires many iterations and has a tendency of slipping away as the time passes by.</p>
                        <p className="font-weight-500">This is where our opening flashcards perform best! Because it takes less than a minute to play a sequence of moves, this allows you to repeat 10 different openings in any of your free 10-minute breaks.</p>
                        <p>When you decide to add a new opening or variation (<span className="italic">why did my opponent get so better position last game? how should have I played instead?</span>) to your repertoire, you can create a flashcard and add it to your library.</p>
                        <p className="font-weight-500">Upon replaying, flashchess.org will guide you through the sequence of moves giving immediate feedback and of course, congratulating when a flashcard played without errors! Flashchess.org leverages liches.org chess board to create a familiar environment and not to distract you from memorizing chess openings.</p>
                    </article>
                </div>

                <div className="examples-table-box">
                    <div className="examples-table-second-box">
                        <div className="table-title-try">Give it a try!</div>
                        <div className="table-title-pre-created">Here is a list of flashcards which we pre-created:</div>

                        <table className="examples-table">
                            <tbody>
                                <tr>
                                    <td><a href={example1}>C02 French Defense: Advance Variation, Main Line (6. a3)</a> </td>
                                    <td>&#11036;</td>
                                </tr>
                                <tr>
                                    <td><a href={example2}>C02 French Defense: Advance Variation, Euwe Variation</a></td>
                                    <td>&#11035;</td>
                                </tr>
                                <tr>
                                    <td><a href={example3}>B90 Sicilian Defense: Najdorf Variation, English Attack</a></td>
                                    <td>&#11036;</td>
                                </tr>
                                <tr>
                                    <td><a href={example4}>B35 Sicilian Defense: Accelerated Dragon, Modern Bc4 Variation</a></td>
                                    <td>&#11035;</td>
                                </tr>
                                <tr>
                                    <td><a href={example5}>Scicilian Fisher trap</a></td>
                                    <td>&#11036;</td>
                                </tr>
                                <tr>
                                    <td><a href={example6}>French Defence: Trap Haubrich-Orlov 1991</a></td>
                                    <td>&#11035;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="examples-table-box-button-container">
                        <button className="create-button" onClick={handleClick}>Create your own opening flashcard</button>
                    </div>
                </div>
            </div>
        </div>
    );
}