import { AddBox } from "@material-ui/icons";
import { Component } from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import UserModel from "../../../../Models/UserModel";
import { getAllCompaniesAction } from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notification";
import "./Companies.css";
import CompanyCard from "./CompanyCard/CompanyCard";

interface CompaniesState {
	companies: UserModel[],
}

interface CompaniesProps extends RouteComponentProps {
    
}

class Companies extends Component<CompaniesProps, CompaniesState> {
    public constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
			companies: store.getState().companiesState.companies,
        };
    }

    public async componentDidMount() {
        
        try {

                const response = await jwtAxios.get<UserModel[]>(globals.urls.adminCompany); 

                store.dispatch(getAllCompaniesAction(response.data));
    
                this.setState({companies: response.data});

        } catch (error) {
            notify.error("Session Expired. Please log in");
            this.props.history.push("/logout");
        }
    }

    public render(): JSX.Element {
        return (

            <div className="Companies">

                <NavLink to = "companies/add" exact>
                    <AddBox color = "secondary">Add</AddBox>
                </NavLink>

                <br/>

				{this.state.companies.map(p=> <CompanyCard company={p} key={p.id}/>)}
            </div>
        );
    }
}

export default withRouter(Companies);
