import { useEffect } from "react";
import { useHistory } from "react-router";
import { logoutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";

function Logout(): JSX.Element {

    const history = useHistory();

    // Running the following as component did mount
    useEffect(()=>{ // React hook for running side-effects inside a functional component
        store.dispatch(logoutAction())
        notify.success("You are now logged out.")
        history.push("/home");
    });

    return (
        <div className="Logout">
			
        </div>
    );
}

export default Logout;
