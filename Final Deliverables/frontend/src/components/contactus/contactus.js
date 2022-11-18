import { Card, CardContent, Grid, Typography, Button } from "@material-ui/core";
import { Label, Input } from "reactstrap";
import React,{useRef,useState} from "react";
import './contactus.css'
import NavBar from "../navbar/Navbar";
import Snackbar from '@material-ui/core/Snackbar'; 
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function ContactUs() {
  const form = useRef();
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <NavBar />
      <div style={{ marginTop: "18px", margin: "100px" }}>
        <Card style={{ maxWidth: '700px', margin: "0 auto", padding: "20px 5"}}>
          <CardContent>
            <h2 className="text-center mb-4" style={{fontWeight:'bold'}}>Contact Us</h2>
            <Typography
              gutterBottom
              style={{fontWeight:'bold'}}
              color="textSecondary"
              varient="body2"
              component="p"
              className="text-center mb-3"
            >
              Fill up the form we'll get back to you within 24 hrs
            </Typography>
            <form ref={form}>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6} item>
                  <Label>
                    FirstName<span className="text-danger"> *</span>
                  </Label>
                  <Input
                    label="FirstName"
                    placeholder="Enter First Name"
                    className="mt-2"
                    name="user_name1"
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <Label>
                    LastName <span className="text-danger"> *</span>
                  </Label>
                  <Input
                    className="mt-2"
                    label="lastName"
                    placeholder="Enter Last Name"
                    name="user_name2"
                    required
                  />
                </Grid>
                <Grid xs={12} item>
                  <Label>
                    Email <span className="text-danger"> *</span>
                  </Label>
                  <Input 
                  type="email" 
                  placeholder=" Enter Email " 
                  className="mt-2" 
                  name="user_email"
                  required  />
                </Grid>
                <Grid xs={12} item>
                  <Label>
                    Phone <span className="text-danger"> *</span>
                  </Label>
                  <Input
                    label="Phone"
                    placeholder="Enter Phone Number"
                    className="mt-2"
                    required
                  />
                </Grid>
                <Grid xs={12} item>
                  <Label>
                    Message <span className="text-danger"> *</span>
                  </Label>
                  <textarea
                    type="textarea"
                    rows='6'
                    name="message" 
                    placeholder="Type your Message here"
                    className="mt-2 form-control"
                    required
                  />
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="mt-2 p-2"
                  fullWidth 
                  disabled = {loading}
                >
                  {loading ?<CircularProgress
                                        size="30px"
                                        thickness = "4.5"
                                       />  : "submit"}
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
              <Alert onClose={handleClose} severity="success" variant="filled">
                 Message sent!
              </Alert>
            </Snackbar>
      </div>
    </>
  );
}
export default ContactUs;
