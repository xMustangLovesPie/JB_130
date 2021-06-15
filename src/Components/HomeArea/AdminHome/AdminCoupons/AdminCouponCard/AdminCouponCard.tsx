
import CouponModel from "../../../../../Models/CouponModel";
import globals from "../../../../../Services/Globals";
import "./AdminCouponCard.css";

interface AdminCouponCardProps {
	adminCoupon: CouponModel;
}

function AdminCouponCard(props: AdminCouponCardProps): JSX.Element {
    return (
        <div className="AdminCouponCard Box">
			<div>
                Title:{props.adminCoupon.title} <br />
                Category:{props.adminCoupon.category} <br />
                description:{props.adminCoupon.description} <br />
                Start Date:{props.adminCoupon.startDate} <br />
                End Date: {props.adminCoupon.endDate} <br />
                Amount: {props.adminCoupon.amount} <br />
                Price: {props.adminCoupon.price} <br />
                <img src={globals.urls.images+props.adminCoupon.imageName}/>
            </div>
        </div>
    );
}

export default AdminCouponCard;
