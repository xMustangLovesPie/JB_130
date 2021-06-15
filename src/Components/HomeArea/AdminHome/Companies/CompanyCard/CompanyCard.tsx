// import CompanyModel from "../../../../../Models/CompanyModel";
import { Button, Typography } from "@material-ui/core";
import { Details } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import UserModel from "../../../../../Models/UserModel";

interface CompanyCardProps {
	company: UserModel
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard Box">
			<div>
            
                <Typography variant="h6">
                    Company Name:{props.company.name} <br />
                    Email: {props.company.email} <br />
                </Typography>
                <NavLink to={"companies/details/" + props.company.id}>
                    <Button
                    color="primary" 
                    startIcon={<Details/>}>
                        Details
                    </Button>
                </NavLink>
            </div>
        </div>
    );
}

export default CompanyCard;
