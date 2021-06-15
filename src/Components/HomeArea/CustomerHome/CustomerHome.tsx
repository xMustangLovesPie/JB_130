import store from "../../../Redux/Store";

function CustomerHome(): JSX.Element {
    return (
        <div className="CustomerHome">
			<h2>{store.getState().authState.user.firstName}, Please choose an option from the menu</h2>
        </div>
    );
}

export default CustomerHome;
