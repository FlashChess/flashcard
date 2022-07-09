import "../styles/not-found.css";

export default function NotFound() {
    return (
        <div className="not-found">
            <div className="sorry">Sorry!</div>
            <div className="cant-find">We can't find the resource you're looking for.</div>
            <div className="suggestion">Please check that the Web site address is spelled correctly.</div>
            <div className="suggestion">Or go to our <a className="suggestion" href="https://flashchess.org">home page</a>, and use the menus to navigate to a specific section.</div>
        </div>
    );
}