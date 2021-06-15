import { Component } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
// import UserModel from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

interface AuthMenuState {
	user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
			user: store.getState().authState.user
        };
    }

    public componentDidMount(): void {
        const unsubscribe = store.subscribe(()=>{
            this.setState({ user: store.getState().authState.user });
        })
    }

    public render(): JSX.Element {

        return (
            <div className="AuthMenu">
				{
                    this.state.user && <>
                    {/* <span>Hello { this.state.user.firstName + " " + this.state.user.lastName }</span> */}
                    <span>Hello { store.getState().authState.user.firstName + " " + store.getState().authState.user.lastName }</span>
                    <span> | </span>
                    <NavLink to ="/logout">Logout</NavLink>
                    </>
                }
				{
                    !this.state.user && <>
                    <span>Hello guest</span>
                    <span> | </span>
                    <NavLink to ="/login">Login</NavLink>
                    </>
                }
            </div>
        );
    }
}

export default AuthMenu;
