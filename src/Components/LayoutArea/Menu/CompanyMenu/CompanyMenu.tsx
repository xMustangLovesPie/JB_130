import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

function CompanyMenu(): JSX.Element {
    return (
        <div className="CompanyMenu Menu">
			<NavLink to="/home" exact><Button>Home</Button></NavLink>
            <NavLink to="/company/coupons" exact><Button>Coupons</Button></NavLink>
        </div>
    );
}

export default CompanyMenu;
