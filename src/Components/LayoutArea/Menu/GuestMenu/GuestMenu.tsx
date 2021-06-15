import { NavLink } from "react-router-dom";

function GuestMenu(): JSX.Element {
    return (
        <div className="GuestMenu Menu">
            <nav>
                <NavLink to="/home" exact>Home</NavLink>
                <NavLink to="/about" exact>About</NavLink>
                <NavLink to="/contact-us" exact>Contact Us</NavLink>
            </nav>
        </div>
    );
}

export default GuestMenu;
