import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import UserModel from "../../../../../Models/UserModel";
import { addCompanyAction } from "../../../../../Redux/CompaniesState";
import store from "../../../../../Redux/Store";
import globals from "../../../../../Services/Globals";
import jwtAxios from "../../../../../Services/JwtAxios";
import notify from "../../../../../Services/Notification";

function AddCompany(): JSX.Element {

    const {register, handleSubmit, errors} = useForm<UserModel>();
    const history = useHistory();

    useEffect(()=>{
        if(store.getState().authState.user===null){
            notify.error("Please log in before adding a Company!")
            history.push("/login");
        }
    })

    async function send(company: UserModel){
        try{
            const myFormData = new FormData();

            myFormData.append("email", company.email);
            myFormData.append("name", company.name);
            myFormData.append("password", company.password);

            var response = await jwtAxios.post<UserModel>(globals.urls.adminCompany, myFormData);

            const addedCompany = response.data;
            
            
            store.dispatch(addCompanyAction(addedCompany));
            notify.success("Company has been successfully added!");
            history.push("/Companies");
        
    } catch(error) {
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
    return (
        <div className="AddCompany Box">
			<h2>Add Company</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Email: </label>
                <input type = "email" name = "email" ref={register({required: true, minLength: 3})}/>
                {errors.email?.type==="required" && <span>Missing email.</span>}
                {errors.email?.type==="minLength" && <span>Minimal length is 3.</span>}
                <br /> <br />

                <label>Name: </label>
                <input type = "text" name = "name" ref={register({
                    required: {value: true, message: "Missing Name"}})}/>
                <span>{errors.name?.message}</span>
                <br /> <br />

                <label>Password: </label>
                <input type = "password" name = "password" ref={register({required: true})}/>
                {errors.password && <span>Missing password.</span>}
                <br /> <br />

                <button>Add</button>

            </form>
        </div>
    );
}

export default AddCompany;
