import { Component } from "react";
import logoImage from "../../../Assets/Images/Logo.png";
import "./Logo.css";

class Logo extends Component {

    public render(): JSX.Element {
        return (
            <div className="Logo">
				<img src={logoImage} alt="This is a logo"/>
            </div>
        );
    }
}

export default Logo;
