import { Button, Typography } from "@material-ui/core";
import { Details } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import UserModel from "../../../../../Models/UserModel";

interface CustomerCardProps {
	customer: UserModel
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
    return (
        <div className="CustomerCard Box">
			<div>
            
                <Typography variant="h6">
                    First Name:{props.customer.firstName} <br />
                    Last Name:{props.customer.lastName} <br />
                    Email: {props.customer.email} <br />
                </Typography>

                <NavLink to={"customers/details/" + props.customer.id}>
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

export default CustomerCard;
