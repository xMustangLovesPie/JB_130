import { Button, Link, Typography } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import "./Socials.css";

function Socials(): JSX.Element {

    
    
    return (
        <div className="Socials">
            <ul>
                <li>
                    <Button
                    color="default"
                    startIcon={<FacebookIcon />}
                    href="https://www.facebook.com/noam.gonopolski/"
                    >
                        Facebook
                    </Button>
                </li>

                <li>
                    <Button
                    color="default"
                    startIcon={<TwitterIcon />}
                    href="https://twitter.com/MustangLovesPie/"
                    >
                        Twitter
                    </Button>
                </li>

                <li>
                    <Button
                    color="default"
                    startIcon={<LinkedInIcon />}
                    href="https://www.linkedin.com/in/noam-gonopolski-26b4b0193/"
                    >
                        LinkedIn
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default Socials;
