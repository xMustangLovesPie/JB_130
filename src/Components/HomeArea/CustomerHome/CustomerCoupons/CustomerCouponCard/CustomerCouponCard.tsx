
import CouponModel from "../../../../../Models/CouponModel";
import globals from "../../../../../Services/Globals";
import "./CustomerCouponCard.css";

interface CustomerCouponCardProps {
	customerCoupon: CouponModel;
}

function CustomerCouponCard(props: CustomerCouponCardProps): JSX.Element {
    return (
        <div className="CustomerCouponCard Box">
			<div>
                Title:{props.customerCoupon.title} <br />
                Category:{props.customerCoupon.category} <br />
                description:{props.customerCoupon.description} <br />
                Start Date:{props.customerCoupon.startDate} <br />
                End Date: {props.customerCoupon.endDate} <br />
                Amount: {props.customerCoupon.amount} <br />
                Price: {props.customerCoupon.price} <br />
                <img src={globals.urls.images+props.customerCoupon.imageName}/>
            </div>
        </div>
    );
}

export default CustomerCouponCard;
