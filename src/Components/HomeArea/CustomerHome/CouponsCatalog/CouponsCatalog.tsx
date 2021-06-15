import { useEffect, useState } from "react";
import CouponModel from "../../../../Models/CouponModel";
import { getAllCouponsAction } from "../../../../Redux/CouponState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notification";
import CatalogCouponCard from "./CatalogCouponCard/CatalogCouponCard";
import "./CouponsCatalog.css";

interface CouponsCatalogProps {
	
}

function CouponsCatalog(props: CouponsCatalogProps): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsState.coupons);

    useEffect(() => {
        getCoupons();
},[coupons.values]);

async function getCoupons() {
    try {
        const response =  await jwtAxios.get<CouponModel[]>(globals.urls.customerCoupon+"get-purchasable/");
        store.dispatch(getAllCouponsAction(response.data));
        setCoupons(response.data);
    } catch (error) {
        notify.error(error);
    }
}

    return (
        <div className="CouponsCatalog">
			{coupons.map(p=> <CatalogCouponCard catalogCoupon={p} key={p.id}/>)}
        </div>
    );
}

export default CouponsCatalog;
