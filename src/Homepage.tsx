import "./styles/homepage.css";

export default function Homepage() {
    const handleClick = () => {
        window.location.href = "https://flashchess.org/#/flashcard";
    }

    return (
        <div>
            <div className="flashchess-org">flashchess.org</div>

            <div className="box">
                <div className="description-samples-box">
                    <div className="flashchess-description">

                    </div>
                    <div className="samples-table">

                    </div>
                </div>

                <div className="description-of-work">

                </div>

                <button className="create-button" onClick={handleClick}>Create your own opening flashcard</button>
            </div>
        </div>
    );
}