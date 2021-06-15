import { Component } from "react";
import UserModel from "../../Models/UserModel";
import store from "../../Redux/Store";
import AdminHome from "./AdminHome/AdminHome";
import CompanyHome from "./CompanyHome/CompanyHome";
import CustomerHome from "./CustomerHome/CustomerHome";
import GuestHome from "./GuestHome/GuestHome";

interface HomeState {
    user: UserModel
}

class Home extends Component<{}, HomeState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
			user: store.getState().authState.user
        };
    }

    public render(): JSX.Element {
        return (
            
			(this.state.user==null) && <div><GuestHome/></div> ||
            (this.state.user?.userType=="ADMINISTRATOR") && <div><AdminHome/></div> ||
            (this.state.user?.userType=="COMPANY") && <div><CompanyHome/></div> ||
            (this.state.user?.userType=="CUSTOMER") && <div><CustomerHome/> </div> 
            
        );
    }
}

export default Home;
