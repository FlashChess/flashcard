import { appInsights } from "../Telemetry";

import { useState } from "react";
import "../styles/feedback.css";

export default function Feedback() { // Your email:
    const [happy, setHappy] = useState<boolean>(false);
    const [sad, setSad] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<string>("");
    const [email, SetEmail] = useState<string>("");

    const changeHappy = () => {
        if (!happy && sad) {
            setSad(false);
        }

        setHappy(!happy);
    }

    const changeSad = () => {
        if (!sad && happy) {
            setHappy(false);
        }

        setSad(!sad);
    }

    const handleSend = () => {
        appInsights.trackEvent({
            name: "Feedback",
            properties: {
                Happy: happy,
                Feedback: feedback,
                Email: email
            }
        })
        alert("Thank you for your feedback!");
        window.location.href = "https://flashchess.org";
    }

    return (
        <div className="feedback-form-box">
            <div className="feedback-form">
                <div className="part">
                    <div className="part1-title">Send feedback to us!</div>
                    <div>Thank you for taking the time to give us feedback.</div>
                </div>

                <div className="part">
                    <div>Are you satisfied with your experience?</div>
                    <div className="emoji-box">
                        <button className={"emoji-button " + (happy ? "emoji-button-pressed" : "emoji-button-notPressed")} onClick={changeHappy}>&#128512;</button>
                        <button className={"emoji-button " + (sad ? "emoji-button-pressed" : "emoji-button-notPressed")} onClick={changeSad}>&#128533;</button>
                    </div>
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Tell us about your experience..." ></textarea>
                </div>

                <div className="part">
                    <div>Can we email you about your feedback?</div>
                    <input value={email} onChange={(e) => SetEmail(e.target.value)} placeholder="Your email..."></input>
                </div>

                <div className="send-button-box">
                    <button className="send-button" onClick={handleSend}>Send</button>
                </div>

                <div className="github-FlashChess">You also can open a PR on our GitHub repository <a className="github-FlashChess" href="https://github.com/FlashChess/flashcard">FlashChes</a></div>
            </div>
        </div>
    );
}