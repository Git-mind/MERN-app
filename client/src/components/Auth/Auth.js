import React, {useState, useEffect} from 'react'
import { Avatar, Paper, Grid, Typography, Container, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
import { gapi } from "gapi-script";
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup} from "../../actions/auth";

const initialState = {firstName: '', lastName: '', email: '', password:'', confirmPassword:''}

const Auth = () => {
  useEffect(() => {
    function start() {
    gapi.client.init({
    clientId:"128710837230-lgp1d3h3d81j4bk87u6pllvtn5infi7a.apps.googleusercontent.com",
    scope: 'email',
      });
       }
      gapi.load('client:auth2', start);
       }, []);

  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e)=>{
    // default behavior for browser to refresh on form submit
    // e = event
    // always add e.preventDefault() to prevent reload onSubmit
    e.preventDefault();
    
    //logic for sign up and sign in
    console.log(isSignup)

    if(isSignup){
      // dispatch signup action
      // pass in entire form data to store it in database
      // pass in history to navigate
      dispatch(signup(formData, history))

    } else{
      dispatch(signin(formData, history))

    }
  }

  const handleChange = (e)=>{
    //spread formData
    //update only a specific input. Each input has it own unique name
    // []: only change the one specific input that user is on
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  //2022: update. Need to 'npm i gapi-script'
  const googleSuccess = async (res)=>{
    console.log(res)
    // ?. - optional chaining operator that won't throw an error if we don't have access to the rest object
    const result = res?.profileObj; 
    const token = res?.tokenId;

    try {
      dispatch( {type:'AUTH', data: { result, token}} );
      
      history.push('/')

    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error)=>{
    console.log(error)
    console.log("Google Sign in was unsuccessful. Try Again Later")
  }

   //call back function to switch on and off.
  // get current value  and pass it as parameter into the function and switches between true and false
  const switchMode = ()=>{
   setIsSignup((prevIsSignup) => !prevIsSignup);
    console.log(isSignup)
    setShowPassword(false);
  }
  return (
    <Container componenet="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.Avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        
        <Typography variant="h5">{isSignup ? 'Sign Up': 'Sign In'}</Typography>
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input  name="firstName" label="First Name" handleChange={handleChange} autoFocus xs={6}/>
                  <Input  name="lastName" label="Last Name" handleChange={handleChange} autoFocus xs={6}/>       
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text": "password"} handleShowPassword={handleShowPassword}/>
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"  />}
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>

          <GoogleLogin
            clientId="128710837230-lgp1d3h3d81j4bk87u6pllvtn5infi7a.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>

      </Paper>

    </Container>
  )
}

export default Auth