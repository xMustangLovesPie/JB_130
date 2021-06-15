
import { Button } from "@material-ui/core";
import { Details } from "@material-ui/icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../../../Models/CouponModel";
import globals from "../../../../../Services/Globals";
import "./CompanyCouponsCard.css";

interface CompanyCouponsCardProps {
	companyCoupon: CouponModel;
}

function CompanyCouponCard(props: CompanyCouponsCardProps): JSX.Element {
    const [image, setImage] = useState("");
    return (
        <div className="CompanyCouponsCard Box">
			<div>
                Title:{props.companyCoupon.title} <br />
                Category:{props.companyCoupon.category} <br />
                description:{props.companyCoupon.description} <br />
                Start Date:{props.companyCoupon.startDate} <br />
                End Date: {props.companyCoupon.endDate} <br />
                Amount: {props.companyCoupon.amount} <br />
                Price: {props.companyCoupon.price} <br />
                <img src={globals.urls.images+props.companyCoupon.imageName}/>
            </div>

            <NavLink to={"coupons/details/" + props.companyCoupon.id}>
                    <Button
                    color="primary" 
                    startIcon={<Details/>}>
                        Details
                    </Button>
            </NavLink>
        </div>
    );
}

export default CompanyCouponCard;
