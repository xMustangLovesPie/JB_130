import { Button, ButtonGroup, Input, TextField, Typography } from "@material-ui/core";
import { Delete, Update } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router";
import CouponModel from "../../../../../Models/CouponModel";
import { addCouponAction } from "../../../../../Redux/CouponState";
import store from "../../../../../Redux/Store";
import globals from "../../../../../Services/Globals";
import jwtAxios from "../../../../../Services/JwtAxios";
import notify from "../../../../../Services/Notification";

interface RouteParams{
    id: string;
}

interface CouponDetailsProps extends RouteComponentProps<RouteParams> {
	
}

function CouponDetails(props: CouponDetailsProps): JSX.Element {

    const id = +props.match.params.id;
    // coupon state
    const [coupon, setCoupon] = useState<CouponModel>(store.getState().couponsState.coupons.find(p => p.id === id));


    useEffect(()=>{
        if(store.getState().authState.user===null){
            notify.error("Please log in before adding a Coupon!")
            history.push("/login");
        } else{
            setCoupon(store.getState().couponsState.coupons.find(p => p.id === id));
        }
    })
    

    const {register, handleSubmit, errors} = useForm<CouponModel>();
    const history = useHistory();

    async function send(couponToSend: CouponModel) {
        couponToSend.id = id;
        try{

            const myFormData = new FormData();
            myFormData.append("id", id.toString());
            myFormData.append("title", couponToSend.title);
            myFormData.append("category", couponToSend.category);
            myFormData.append("description", couponToSend.description);
            myFormData.append("amount", couponToSend.amount.toString());
            myFormData.append("price", couponToSend.price.toString());
            myFormData.append("startDate", couponToSend.startDate.toString());
            myFormData.append("endDate", couponToSend.endDate.toString());
            myFormData.append("image", couponToSend.image.item(0));

            var response = await jwtAxios.put<CouponModel>(globals.urls.companyCoupon, myFormData);

            const addedCoupon = response.data;
            
            
            store.dispatch(addCouponAction(addedCoupon));
            notify.success("Coupon has been successfully updated!");
            history.push("/company/coupons");
        
    } catch(error){
        console.log(Object.keys(error));
        console.log(error.response);
        notify.error(error.response.data.message)
        if(error.response.data.status===401){
            history.push("/logout");
            } else if(error.response.data.status===409){
                history.push("/company/coupons");
                } else{
                    history.push("/home");
                }
        }
    }

    async function deleteCoupon() {
        console.log(id);
        try{

            await jwtAxios.delete(globals.urls.companyCoupon+id);
            
            notify.success("Coupon has been successfully deleted!");
            history.push("/company/coupons");
        
    } catch(error){
        console.log(Object.keys(error));
        console.log(error);
        notify.error(error.response.data.message)
        history.push("/company/coupons");
        }
    }

    

    return (
        
        <div className="CouponDetails Box">
				{
                    coupon && 
                    <>
                    <Typography variant="h3" className="Headline">
                        Coupon Details
                    </Typography>
                    <form onSubmit={handleSubmit(send)}>

                    <br />

                    <TextField

                        inputRef={register({required: true})}
                        label="Title"
                        name="title"
                        defaultValue={coupon.title}
                        variant="outlined"
                        color="secondary"
                        required={true}
                        className="TextBox"
                    />
                    <br />

                    <Input
                        inputRef={register({required: true})}
                        name="category"
                        defaultValue={coupon.category}
                        color="secondary"
                        required={true}
                        className="TextBox"
                    />
                    <br />

                    <TextField
                        inputRef={register({required: true})}
                        label="Description"
                        name="description"
                        defaultValue={coupon.description}
                        variant="outlined"
                        color="secondary"
                        required={true}
                        className="TextBox"
                    />
                    <br />

                    <TextField
                        inputRef={register({required: true})}
                        label="Start Date"
                        name="startDate"
                        type="date"
                        defaultValue={coupon.startDate}
                        variant="outlined"
                        color="secondary"
                        required={true}
                        className="TextBox"
                    />
                    <br />

                    <TextField
                        inputRef={register({required: true})}
                        label="End Date"
                        name="endDate"
                        type="date"
                        defaultValue={coupon.endDate}
                        variant="outlined"
                        color="secondary"
                        required={true}
                        className="TextBox"
                    />
                    <br />


                    <TextField
                        inputRef={register({required: true})}
                        label="Amount"
                        name="amount"
                        type="number"
                        defaultValue={coupon.amount}
                        variant="outlined"
                        color="secondary"
                        required={true}
                        className="TextBox"
                    />
                    <br />

                    <TextField
                        inputRef={register({required: true})}
                        label="Price"
                        name="price"
                        type="number"
                        defaultValue={coupon.price}
                        variant="outlined"
                        color="secondary"
                        required={true}
                        className="TextBox"
                    />
                    <br />

                    <TextField
                        inputRef={register({required: true})}
                        name="image"
                        type="file"
                        variant="outlined"
                        color="secondary"
                        required={true}
                        className="TextBox"
                    />
                    <br />


                <ButtonGroup variant="contained" fullWidth>
                    <Button
                        color="primary"
                        startIcon={<Update/>}
                        type="submit"
                        >
                        Update
                    </Button>
                    <Button
                        color="secondary" 
                        startIcon={<Delete/>}
                        onClick={deleteCoupon}
                        >
                        Delete</Button>
                </ButtonGroup>
                </form>
                    </>
                }
                
            </div>
    );
}

export default CouponDetails;
