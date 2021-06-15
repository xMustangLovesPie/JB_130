import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import { loginAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import "./Login.css";

function Login(): JSX.Element {

    const history = useHistory();

    const { register, handleSubmit } = useForm<CredentialsModel>();

    useEffect(() => {
        const user = store.getState().authState.user;
        if(user!=null){
            notify.error("You are already logged in as a " + user.userType);
            history.push("/home");
        }
      });

    async function send(credentials: CredentialsModel) {
        if(credentials.type==""){
            notify.error("please select a user type");
            return;
        }
        try {
            const response = await axios.post<UserModel>(globals.urls.login+credentials.type, credentials);
            store.dispatch(loginAction(response.data));
            notify.success("You have successfully logged in");
            history.push("/home"); 
        } catch (error) {
            console.log(Object.keys(error));
        console.log(error.response);
        notify.error(error.response.data.message)
        if(error.response.data.status===401){
            history.push("/login");
            } else{
                    history.push("/home");
                }
        }
    }

    return (
        <div className="Login">
			<h2>Login</h2>

                <form onSubmit={handleSubmit(send)}>

                    <input placeholder="Username" type="text" name="email" ref={register}/> <br /> <br />

                    <input placeholder="Password" type="password" name="password" ref={register}/> <br /> <br />

                    <select name="type" id="type" ref={register}>
                        <option value="">Select user type</option>
                        <option value="ADMINISTRATOR">Admin</option>
                        <option value="COMPANY">Company</option>
                        <option value="CUSTOMER">Customer</option>
                    
                    </select> <br/>
                    <button>Login</button>

                </form>
        </div>
    );
}

export default Login;
