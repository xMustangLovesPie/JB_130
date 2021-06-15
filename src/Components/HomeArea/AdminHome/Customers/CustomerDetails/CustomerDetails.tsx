import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { Delete, Update } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router";
import UserModel from "../../../../../Models/UserModel";
import { addCustomerAction } from "../../../../../Redux/CustomersState";
import store from "../../../../../Redux/Store";
import jwtAxios from "../../../../../Services/JwtAxios";
import notify from "../../../../../Services/Notification";

interface RouteParams{
    id: string;
}

interface CustomerDetailsProps extends RouteComponentProps<RouteParams> {
	
}

function CustomerDetails(props: CustomerDetailsProps): JSX.Element {

    const id = +props.match.params.id;
    // customer state
    const [customer, setCustomer] = useState<UserModel>(store.getState().customersState.customers.find(p => p.id === id));


    useEffect(()=>{
        if(store.getState().authState.user===null){
            notify.error("Please log in before adding a Customer!")
            history.push("/login");
        } else{
            setCustomer(store.getState().customersState.customers.find(p => p.id === id));
        }
    })
    

    const {register, handleSubmit, errors} = useForm<UserModel>();
    const history = useHistory();

    async function send(customerToSend: UserModel) {
        customerToSend.id = id;
        customerToSend.name = customer.name;
        try{

            var response = await jwtAxios.put<UserModel>("http://localhost:8080/api/admin/customer/", customerToSend);

            const addedCustomer = response.data;
            
            
            store.dispatch(addCustomerAction(addedCustomer));
            notify.success("Customer has been successfully updated!");
            history.push("/Customers");
        
    } catch(error){
        console.log(Object.keys(error));
        console.log(error.response);
        notify.error(error.response.data.message)
        if(error.response.data.status===401){
            history.push("/logout");
            } else if(error.response.data.status===409){
                history.push("/customers");
                } else{
                    history.push("/home");
                }
        }
    }

    async function deleteCustomer() {
        console.log(id);
        try{

            await jwtAxios.delete("http://localhost:8080/api/admin/customer/"+id);
            
            notify.success("Customer has been successfully deleted!");
            history.push("/Customers");
        
    } catch(error){
        console.log(Object.keys(error));
        console.log(error);
        notify.error(error.response.data.message)
        history.push("/customers");
        }
    }

    

    return (
        
        <div className="CustomerDetails Box">
				{
                    customer && 
                    <>
                    <Typography variant="h3" className="Headline">
                        Customer Details
                    </Typography>
                    <form onSubmit={handleSubmit(send)}>

                    <br />

                    <TextField
                        inputRef={register({required: true})}
                        label="First Name"
                        name="firstName"
                        defaultValue={customer.firstName}
                        variant="outlined"
                        color="secondary"
                        type="text"
                        required={true}
                        className="TextBox"
                    />
                    <br />

                    <TextField
                        inputRef={register({required: true})}
                        label="Last Name"
                        name="lastName"
                        defaultValue={customer.lastName}
                        variant="outlined"
                        color="secondary"
                        type="text"
                        required={true}
                        className="TextBox"
                    />
                    <br />

                    <TextField
                        inputRef={register({required: true})}
                        label="Email"
                        name="email"
                        defaultValue={customer.email}
                        variant="outlined"
                        color="secondary"
                        type="Email"
                        required={true}
                        className="TextBox"
                    />
                    <br />

                    <TextField
                        inputRef={register({required: true})}
                        label="Password"
                        name="password"
                        defaultValue={customer.password}
                        variant="outlined"
                        color="secondary"
                        type="password"
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
                        onClick={deleteCustomer}
                        >
                        Delete</Button>
                </ButtonGroup>
                </form>
                    </>
                }
                
            </div>
    );
}

export default CustomerDetails;
