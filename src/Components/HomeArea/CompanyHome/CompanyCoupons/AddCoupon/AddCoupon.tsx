import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CouponModel from "../../../../../Models/CouponModel";
import { addCouponAction } from "../../../../../Redux/CouponState";
import store from "../../../../../Redux/Store";
import globals from "../../../../../Services/Globals";
import jwtAxios from "../../../../../Services/JwtAxios";
import notify from "../../../../../Services/Notification";

function AddCoupon(): JSX.Element {

    const {register, handleSubmit, errors} = useForm<CouponModel>();
    const history = useHistory();

    useEffect(()=>{
        if(store.getState().authState.user===null){
            notify.error("Please log in before adding a Coupon!")
            history.push("/login");
        }
    })

    async function send(coupon: CouponModel){
        if(coupon.category==""){
            notify.error("please select a category");
            return;
        } else if (Date.parse(coupon.startDate.toString()) < (Date.now() - (24 * 60 * 60 * 1000))){
            notify.error("please select a start date of today or later");
            return;
        } else if (Date.parse(coupon.endDate.toString()) < Date.now()){
            notify.error("please select a end date of today or later");
            return;
        } else if (Date.parse(coupon.startDate.toString()) > Date.parse(coupon.endDate.toString())){
            notify.error("start date needs to be before end date");
            return;
        }
        try{

            const myFormData = new FormData();
            myFormData.append("title", coupon.title);
            myFormData.append("category", coupon.category);
            myFormData.append("description", coupon.description);
            myFormData.append("amount", coupon.amount.toString());
            myFormData.append("price", coupon.price.toString());
            myFormData.append("startDate", coupon.startDate.toString());
            myFormData.append("endDate", coupon.endDate.toString());
            myFormData.append("image", coupon.image.item(0));      

            var response = await jwtAxios.post<CouponModel>(globals.urls.companyCoupon, myFormData);

            const addedCoupon = response.data;
            
            store.dispatch(addCouponAction(addedCoupon));
            notify.success("Coupon has been successfully added!");
            history.push("/company/coupons");
        
    } catch(error){
        console.log(Object.keys(error));
        console.log(error.response);
        console.log(error.response.data.message);
        notify.error(error.response.data.message)
        if(error.response.data.status===401){
            history.push("/home");
            } else if(error.response.data.status===409){
                history.push("/company/coupons");
                } else{
                    history.push("/logout");
                }
        }
    }
    return (
        <div className="AddCoupon Box">
			<h2>Add Coupon</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Title: </label>
                <input type = "text" name = "title" ref={register({required: true, minLength: 3})}/>
                {errors.title?.type==="required" && <span>Missing email.</span>}
                {errors.title?.type==="minLength" && <span>Minimal length is 3.</span>}
                <br /> <br />

                <label>Category: </label>
                <select name="category" ref={register}>
                        <option value="">Select category</option>
                        <option value="CLOTHING">Clothing</option>
                        <option value="VACATION">Vacation</option>
                        <option value="ELECTRONICS">Electronics</option>
                        <option value="VIDEOGAMES">Video Games</option>
                    
                    </select> <br/>  <br/>

                <label>Description: </label>
                <input type = "text" name = "description" ref={register({
                    required: {value: true, message: "Missing Description"}})}/>
                <span>{errors.description?.message}</span>
                <br /> <br />

                <label>Amount: </label>
                <input type = "number" min="0" name = "amount" ref={register({required: true})}/>
                {errors.amount && <span>Missing amount.</span>}
                <br /> <br />

                <label>Price: </label>
                <input type = "number" step="0.01" min="0" name = "price" ref={register({required: true})}/>
                {errors.price && <span>Missing price.</span>}
                <br /> <br />

                <label>Start Date: </label>
                <input type = "date"  name = "startDate" ref={register({required: true})}/>
                {errors.startDate && <span>Missing date.</span>}
                <br /> <br />

                <label>End Date: </label>
                <input type = "date"  name = "endDate" ref={register({required: true})}/>
                {errors.endDate && <span>Missing date.</span>}
                <br /> <br />

                <label>Image: </label>
                <input type = "file" name = "image" ref={register({required: true})} accept="image/*"/>
                {errors.image && <span>Missing image.</span>}
                <br /> <br />

                <button>Add</button>

            </form>
        </div>
    );
}

export default AddCoupon;
