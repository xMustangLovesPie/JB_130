import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu Menu">
			<nav>
            <NavLink to="/home" exact><Button>Home</Button></NavLink>
            <NavLink to="/companies" exact><Button>Companies</Button></NavLink>
            <NavLink to="/customers" exact><Button>Customers</Button></NavLink>
            <NavLink to="/admin/coupons" exact><Button>Coupons</Button></NavLink>
            </nav>
        </div>
    );
}

export default AdminMenu;
