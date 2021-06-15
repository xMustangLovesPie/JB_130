import { Typography } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';

function About(): JSX.Element {
    return (
        <div className="About">
			<Typography variant="h3" className="Headline"> <InfoIcon/>
            About Section
            </Typography>
			
            <h3>
                Hi! I am Noam, the maker of GonoGroo.<br/>
                This is my final coupons project that I made for the end of John Bryce. <br/><br/>
                Not gonna lie, I loved everything about this project except the moments where React 
                would simply break without me doing anything! :D
                That is not to say that I didn't do my best though :&#41; I feel like 
                what I enjoy most about programming is cracking programs that require thinking
                outside the box when it comes to logic and algorithms, not so much Web design.
                However I feel like it's a fine-wine thing, and the more time I spend it the more it 
                grows on me, and the more I enjoy it.
                I hope you enjoy looking at the project I made and appreciate the sweat and blood that
                went into making this front+back end! Thank you so much for giving me the tools
                that allowed me to get to the place I am today &#60;3<br/><br/>
                Special thanks to Eldar that went through everything with us and had nerves of steel 
                throughout the entire course, and to Asaf who showed us new ways of thinking and making programming 
                ever so fun! Wouldn't have done it without you guys.               
            </h3>
            <p>
                Yours Truly, Noam Gonopolski
            </p>
        </div>
    );
}

export default About;
