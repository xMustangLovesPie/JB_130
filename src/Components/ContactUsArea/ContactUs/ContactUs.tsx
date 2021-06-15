import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { Cancel, MailOutline, Send } from "@material-ui/icons";
import "./ContactUs.css";

function ContactUs(): JSX.Element {
  return (
    <div className="ContactUs Box">
        The Contact Us is not supposed to work. I don't wanna be spammed :) It's just there to look pretty
      <Typography variant="h3" className="Headline"> <MailOutline/>
        Contact Us
      </Typography>
        <form noValidate autoComplete="off">
      <TextField
        label="Name"
        variant="outlined"
        color="secondary"
        className="TextBox"
      />
      <br />

      <TextField
        label="Email"
        variant="outlined"
        color="secondary"
        type="Email"
        className="TextBox"
      />
      <br />

      <TextField
        label="Message"
        variant="outlined"
        color="secondary"
        className="TextBox"
      />
      <br />
      
      </form>

      <FormControlLabel
        label="Send me promotional emails"
        control={<Checkbox />}
      />
      <br />
      <ButtonGroup variant="contained" fullWidth>
        <Button color="primary" startIcon={<Send/>}>Send</Button>
        <Button color="secondary" startIcon={<Cancel/>}>Cancel</Button>
      </ButtonGroup>
    </div>
  );
}

export default ContactUs;
