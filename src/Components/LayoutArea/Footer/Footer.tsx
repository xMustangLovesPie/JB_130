import "./Footer.css";
import Socials from "./Socials/Socials";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<Socials />
            <p className="rights">All Rights Reserved &copy; 2021</p>
        </div>
    );
}

export default Footer;
