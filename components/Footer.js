import { FaXTwitter } from "react-icons/fa6";
export default function Footer() {
    return (
        <div className="p-5 footer">
            <img className="footer-logo" src="/img/madwithard_logo.png"></img>
            <div className="footer-links">
                <a className="footer-link" href="https://twitter.com/WizardsMad"><FaXTwitter /></a>
            </div>
        </div>
    )
}
