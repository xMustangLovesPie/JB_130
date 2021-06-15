import { useEffect, useState } from "react";
import CouponModel from "../../../../Models/CouponModel";
import { getAllCouponsAction } from "../../../../Redux/CouponState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notification";
import CustomerCouponCard from "./CustomerCouponCard/CustomerCouponCard";
import "./CustomerCoupons.css";

interface CustomerCouponsProps {
	
}

function CustomerCoupons(props: CustomerCouponsProps): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsState.coupons);
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        getCoupons();
},[]);

async function getCoupons() {
    try {
        const response =  await jwtAxios.get<CouponModel[]>(globals.urls.customerCoupon);
        store.dispatch(getAllCouponsAction(response.data));
        setCoupons(response.data);
    } catch (error) {
        notify.error(error);
    }
}

async function getCouponsByPrice() {
    if(price==="") {
        notify.error("Please enter a price");
        return;
    } else if(parseInt(price)<0){
        notify.error("Price mustn't be a negative number");
    }
    try {
        const response = await jwtAxios.get<CouponModel[]>(globals.urls.customerCoupon+"price/"+price);
        store.dispatch(getAllCouponsAction(response.data));
        setCoupons(response.data);
    } catch (error) {
        notify.error(error);
    }
}

async function getCouponsByCategory() {
    if(category===""){
        notify.error("Please select a category");
        return;
    }
    try {
        const response = await jwtAxios.get<CouponModel[]>(globals.urls.customerCoupon+"category/"+category);
        store.dispatch(getAllCouponsAction(response.data));
        setCoupons(response.data);
    } catch (error) {
        notify.error(error);
    }
}

    return (
        <div className="CustomerCoupons">

<div> Sort By:
                    <div>Category:

                        <select 
                        name="category"
                        onChange={event => setCategory(event.target.value)}
                        >
                            <option value="">Select category</option>
                            <option value="CLOTHING">Clothing</option>
                            <option value="VACATION">Vacation</option>
                            <option value="ELECTRONICS">Electronics</option>
                            <option value="VIDEOGAMES">Video Games</option>
                        </select>
                            <button 
                                type="button"
                                onClick={getCouponsByCategory}>
                                Select
                            </button>

                    </div>
                    <div>Price:
                        
                            <input 
                                name="couponPriceForm" 
                                id="couponPriceForm" 
                                type = "number" 
                                step="0.01" 
                                onChange={event => setPrice(event.target.value)}
                                />
                            <button 
                                type="button"
                                onClick={getCouponsByPrice}>
                                Select
                            </button>
                        
                    </div>
                </div>
			
			{coupons.map(p=> <CustomerCouponCard customerCoupon={p} key={p.id}/>)}
        
        </div>
    );
}

export default CustomerCoupons;
