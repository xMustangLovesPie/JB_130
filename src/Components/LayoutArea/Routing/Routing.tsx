import { Redirect, Route, Switch } from "react-router";
import About from "../../AboutArea/About/About";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import ContactUs from "../../ContactUsArea/ContactUs/ContactUs";
import AddCompany from "../../HomeArea/AdminHome/Companies/AddCompany/AddCompany";
import Companies from "../../HomeArea/AdminHome/Companies/Companies";
import CompanyDetails from "../../HomeArea/AdminHome/Companies/CompanyDetails/CompanyDetails";
import AdminCoupons from "../../HomeArea/AdminHome/AdminCoupons/AdminCoupons";
import AddCustomer from "../../HomeArea/AdminHome/Customers/AddCustomer/AddCustomer";
import CustomerDetails from "../../HomeArea/AdminHome/Customers/CustomerDetails/CustomerDetails";
import Customers from "../../HomeArea/AdminHome/Customers/Customers";
import Home from "../../HomeArea/Home";
import Page404 from "../../SharedArea/Page404/Page404";
import AddCoupon from "../../HomeArea/CompanyHome/CompanyCoupons/AddCoupon/AddCoupon";
import CouponDetails from "../../HomeArea/CompanyHome/CompanyCoupons/CouponDetails/CouponDetails";
import CompanyCoupons from "../../HomeArea/CompanyHome/CompanyCoupons/CompanyCoupons";
import CouponsCatalog from "../../HomeArea/CustomerHome/CouponsCatalog/CouponsCatalog";
import CustomerCoupons from "../../HomeArea/CustomerHome/CustomerCoupons/CustomerCoupons";


function Routing(): JSX.Element {
    // var userType = store.getState().authState.user.userType;
    return (
        <div className="Routing">
			<Switch>
                <Route path="/about" component={About} exact/>
                <Route path="/contact-us" component={ContactUs} exact/>

                <Route path="/home" component={Home} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/logout" component={Logout} exact/>
                
                <Route path="/companies" component={Companies} exact/>
                <Route path="/companies/add" component={AddCompany} exact/>
                <Route path="/companies/details/:id" component={CompanyDetails} exact/>

                <Route path="/customers" component={Customers} exact/>
                <Route path="/customers/add" component={AddCustomer} exact/>
                <Route path="/customers/details/:id" component={CustomerDetails} exact/>

                <Route path="/admin/coupons" component={AdminCoupons} exact/>
                <Route path="/company/coupons" component={CompanyCoupons} exact/>

                <Route path="/company/coupons/add" component={AddCoupon} exact/>
                <Route path="/company/coupons/details/:id" component={CouponDetails} exact/>

                <Route path="/customer/coupons/" component={CouponsCatalog} exact/>
                <Route path="/customer/my-coupons" component={CustomerCoupons} exact/>
               

                <Redirect from="/" to="/home" exact />
                <Route component={Page404}/>
            </Switch>
        </div>
    );
}

export default Routing;
