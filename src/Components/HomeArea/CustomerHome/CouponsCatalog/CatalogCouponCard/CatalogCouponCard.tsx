
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import CouponModel from "../../../../../Models/CouponModel";
import globals from "../../../../../Services/Globals";
import jwtAxios from "../../../../../Services/JwtAxios";
import notify from "../../../../../Services/Notification";
import "./CatalogCouponCard.css";

interface CatalogCouponCardProps {
	catalogCoupon: CouponModel;
}

function CatalogCouponCard(props: CatalogCouponCardProps): JSX.Element {

    const history = useHistory();
    
    async function purchaseCoupon(){
        try{
        var response = await jwtAxios.post<CouponModel>(globals.urls.customerCoupon+props.catalogCoupon.id);
            
            notify.success("Coupon has been successfully purchased!");
            history.push("/customer/my-coupons");
        
    } catch(error){
        console.log(Object.keys(error));
        console.log(error.response);
        notify.error(error.response.data.message)
        if(error.response.data.status===401){
            history.push("/logout");
            } else if(error.response.data.status===409){
                history.push("/customer/coupons");
                } else{
                    history.push("/home");
                }
        }
    }

    return (
        <div className="CatalogCouponCard Box">
			<div>
                Title:{props.catalogCoupon.title} <br />
                Category:{props.catalogCoupon.category} <br />
                description:{props.catalogCoupon.description} <br />
                Start Date:{props.catalogCoupon.startDate} <br />
                End Date: {props.catalogCoupon.endDate} <br />
                Amount: {props.catalogCoupon.amount} <br />
                Price: {props.catalogCoupon.price} <br />
                <img src={globals.urls.images+props.catalogCoupon.imageName}/> <br />
                <Button
                onClick={purchaseCoupon}
                >Purchase</Button>
            </div>
        </div>
    );
}

export default CatalogCouponCard;
