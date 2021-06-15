
import { Component } from "react";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import AdminMenu from "./AdminMenu/AdminMenu";
import CompanyMenu from "./CompanyMenu/CompanyMenu";
import CustomerMenu from "./CustomerMenu/CustomerMenu";
import GuestMenu from "./GuestMenu/GuestMenu";
import "./Menu.css";

interface MenuState {
    user: UserModel;
}

class Menu extends Component<{}, MenuState> {

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

        console.log(this.state.user)
        return(   
            (this.state.user==null) && <div>Welcome Guest! <GuestMenu/> {console.log(this.state.user)}</div> ||
            (this.state.user?.userType=="ADMINISTRATOR") && <div>Welcome Back Admin! <AdminMenu/></div> ||
            (this.state.user?.userType=="COMPANY") && <div>Welcome Back {this.state.user.firstName}!  <CompanyMenu/></div> ||
            (this.state.user?.userType=="CUSTOMER") && <div>Welcome Back {this.state.user.firstName}! <CustomerMenu/> </div> 
        )
        
    }
}

export default Menu;
