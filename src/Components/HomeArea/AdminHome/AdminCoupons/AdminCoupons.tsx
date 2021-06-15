import { Component } from "react";
import CouponModel from "../../../../Models/CouponModel";
import { getAllCouponsAction } from "../../../../Redux/CouponState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notification";
import AdminCouponCard from "./AdminCouponCard/AdminCouponCard";
import "./AdminCoupons.css";

interface AdminCouponsState {
    adminCoupons: CouponModel[]
}


class AdminCoupons extends Component<{}, AdminCouponsState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
			adminCoupons: store.getState().couponsState.coupons
        };
    }

    public async componentDidMount() {
        try {

                const response = await jwtAxios.get<CouponModel[]>(globals.urls.adminCoupon); 

                store.dispatch(getAllCouponsAction(response.data));

                this.setState({adminCoupons: response.data});

        } catch (error) {
            notify.error(error);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="AdminCoupons">
				{this.state.adminCoupons.map(p=> <AdminCouponCard adminCoupon={p} key={p.id}/>)}
            </div>
        );
    }
}

export default AdminCoupons;
