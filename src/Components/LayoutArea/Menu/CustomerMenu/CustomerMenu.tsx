import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

function CustomerMenu(): JSX.Element {
    return (
        <div className="CustomerMenu Menu">
			<NavLink to="/home" exact><Button>Home</Button></NavLink>
            <NavLink to="/customer/coupons" exact><Button>Coupons Catalog</Button></NavLink>
            <NavLink to="/customer/my-coupons" exact><Button>My Coupons</Button></NavLink>
        </div>
    );
}

export default CustomerMenu;
