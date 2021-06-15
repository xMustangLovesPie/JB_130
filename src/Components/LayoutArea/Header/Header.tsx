import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Logo from "../Logo/Logo";
import "./Header.css";


function Header(): JSX.Element {
    return (
        
        <div className="Header">
            <Logo/>
			<h1>Welcome To GonoGroo - The groupon for you!</h1>
            <AuthMenu />
        
        
        </div>
    );
}

export default Header;
