import store from "../../../Redux/Store";

function CompanyHome(): JSX.Element {
    return (
        <div className="CompanyHome">
			<h2>{store.getState().authState.user.firstName}, Please choose an option from the menu</h2>
        </div>
    );
}

export default CompanyHome;
