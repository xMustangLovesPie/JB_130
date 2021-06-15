import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { Delete, Update } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router";
import UserModel from "../../../../../Models/UserModel";
import { addCompanyAction } from "../../../../../Redux/CompaniesState";
import store from "../../../../../Redux/Store";
import globals from "../../../../../Services/Globals";
import jwtAxios from "../../../../../Services/JwtAxios";
import notify from "../../../../../Services/Notification";

interface RouteParams{
    id: string;
}

interface CompanyDetailsProps extends RouteComponentProps<RouteParams> {
	
}

function CompanyDetails(props: CompanyDetailsProps): JSX.Element {

    const id = +props.match.params.id;
    // company state
    const [company, setCompany] = useState<UserModel>(store.getState().companiesState.companies.find(p => p.id === id));


    useEffect(()=>{
        if(store.getState().authState.user===null){
            notify.error("Please log in before adding a Company!")
            history.push("/login");
        } else{
            setCompany(store.getState().companiesState.companies.find(p => p.id === id));
        }
    })
    

    const {register, handleSubmit, errors} = useForm<UserModel>();
    const history = useHistory();

    async function send(companyToSend: UserModel) {
        companyToSend.id = id;
        companyToSend.name = company.name;
        try{

            var response = await jwtAxios.put<UserModel>(globals.urls.adminCompany, companyToSend);

            const addedCompany = response.data;
            
            
            store.dispatch(addCompanyAction(addedCompany));
            notify.success("Company has been successfully updated!");
            history.push("/Companies");
        
    } catch(error){
        console.log(Object.keys(error));
        console.log(error.response);
        notify.error(error.response.data.message)
        if(error.response.data.status===401){
            history.push("/logout");
            } else if(error.response.data.status===409){
                history.push("/companies");
                } else{
                    history.push("/home");
                }
        }
    }

    async function deleteCompany() {
        console.log(id);
        try{

            await jwtAxios.delete(globals.urls.adminCompany+id);
            
            notify.success("Company has been successfully deleted!");
            history.push("/Companies");
        
    } catch(error){
        console.log(Object.keys(error));
        console.log(error);
        notify.error(error.response.data.message)
        history.push("/companies");
        }
    }

    

    return (
        
        <div className="CompanyDetails Box">
				{
                    company && 
                    <>
                    <Typography variant="h3" className="Headline">
                        Company Details
                    </Typography>
                    <form onSubmit={handleSubmit(send)}>

                    <Typography variant="h5" >
                        Name: {company.name}
                    </Typography>
                    <br />

                    <TextField
                        inputRef={register({required: true})}
                        label="Email"
                        name="email"
                        defaultValue={company.email}
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
                        defaultValue={company.password}
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
                        onClick={deleteCompany}
                        >
                        Delete</Button>
                </ButtonGroup>
                </form>
                    </>
                }
                
            </div>
    );
}

export default CompanyDetails;
