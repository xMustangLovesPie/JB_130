import { AddBox } from "@material-ui/icons";
import { Component } from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import UserModel from "../../../../Models/UserModel";
import { getAllCustomersAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notification";
import CustomerCard from "./CustomerCard/CustomerCard";
import "./Customers.css";

interface CustomersState {
	customers: UserModel[],
}

interface CustomersProps extends RouteComponentProps {
    
}

class Customers extends Component<CustomersProps, CustomersState> {
    public constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
			customers: store.getState().customersState.customers,
        };
    }

    public async componentDidMount() {
        
        try {

                const response = await jwtAxios.get<UserModel[]>(globals.urls.adminCustomer); //this command will wait so the browser doesn't get stuck

                store.dispatch(getAllCustomersAction(response.data));

                this.setState({customers: response.data});

        } catch (error) {
            notify.error("Session Expired. Please log in");
            this.props.history.push("/logout");
        }
    }

    public render(): JSX.Element {
        return (

            <div className="Customers">

                <NavLink to = "customers/add" exact>
                    <AddBox color = "secondary">Add</AddBox>
                </NavLink>

                <br/>

				{this.state.customers.map(p=> <CustomerCard customer={p} key={p.id}/>)}
            </div>
        );
    }
}

export default withRouter(Customers);
