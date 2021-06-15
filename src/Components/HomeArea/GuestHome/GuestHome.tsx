import { Typography } from "@material-ui/core";

function GuestHome(): JSX.Element {
    return (
        <div className="GuestHome">
			<Typography variant="h3" className="Headline">
            Please log in as either Admin, Company, or Customer
            </Typography>
        </div>
    );
}

export default GuestHome;
