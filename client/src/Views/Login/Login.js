import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Importing actions/required methods
import { updateLoginForm, login, signUp } from "../../actions/user";

import './Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.props.history.push("/Login");
    }

    // login form state
    state = {
        errors: false,
        errorFields: []
    }
    handleEnter(event, app) {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            if (event.target.name.startsWith("login")) {
                login(this, app);
            }
            else if (event.target.name.startsWith("register")) {
                signUp(this, app);
            }
        }
    }
      /*useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            console.log(event);
            // callMyFunction();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, []);*/

    render() {
        const { app } = this.props
        /*document.addEventListener("keydown", (event) => {
            this.handleEnter(event, app);
        }, {once: true});*/
        let invalidFields;
        this.state.errors ? invalidFields = this.state.errorFields : invalidFields = []
        return (
            <div className="login__bg-image center" style={{paddingTop: "5px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <div className="login__card center" style={{minWidth: "600px", minHeight: "100%", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}}>
                    <h2>Log In</h2>
                    { /*<p>Username length must be longer than 4, password length must be longer than 3</p> */}

                    <TextField
                        name="loginUserName"
                        label="username"
                        className="login__input app__input app__horizontal-center"
                        margin="normal"
                        onChange={e => updateLoginForm(this, e.target)}
                        onKeyPress={(event) => {this.handleEnter(event, app)}}
                    /><br />

                    <TextField
                        name="loginPassword"
                        label="Password"
                        type="password"
                        className="login__input app__input app__horizontal-center"
                        margin="normal"
                        onChange={e => updateLoginForm(this, e.target)}
                        onKeyPress={(event) => {this.handleEnter(event, app)}}
                    /><br />

                    <Button
                        className="login__button app__horizontal-center"
                        onClick={() => login(this, app)}

                    >
                        Log In
                    </Button><br />
                </div>
                <div className="login__card center" style={{minWidth: "600px", minHeight: "100%", borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}>
                    <h2>Register</h2>
                    <p>Username length must be longer than 4, password length must be longer than 3</p>

                    <TextField
                        name="registerRealName"
                        label="Real Name"
                        className={`login__input app__input app__horizontal-center ${invalidFields.includes("realName") ? "fail" : null }`}
                        margin="normal"
                        onChange={e => updateLoginForm(this, e.target)}
                        onKeyPress={(event) => {this.handleEnter(event, app)}}
                    /><br />

                    <TextField
                        name="registerUserName"
                        label="Username"
                        className={`login__input app__input app__horizontal-center ${invalidFields.includes("userName") ? "fail" : null }`}
                        margin="normal"
                        onChange={e => updateLoginForm(this, e.target)}
                        onKeyPress={(event) => {this.handleEnter(event, app)}}
                    /><br />

                    <TextField
                        name="registerPassword"
                        label="Password"
                        type="password"
                        className={`login__input app__input app__horizontal-center ${invalidFields.includes("password") ? "fail" : null }`}
                        margin="normal"
                        onChange={e => updateLoginForm(this, e.target)}
                        onKeyPress={(event) => {this.handleEnter(event, app)}}
                    /><br />


                    <TextField
                        name="registerEmail"
                        label="Email"
                        className={`login__input app__input app__horizontal-center ${invalidFields.includes("email") ? "fail" : null }`}
                        margin="normal"
                        onChange={e => updateLoginForm(this, e.target)}
                        onKeyPress={(event) => {this.handleEnter(event, app)}}
                    /><br />
                    <Button
                        className="signUpButton"
                        onClick={() => signUp(this, app)}>
                        Sign Up
                    </Button>
                </div>
                </div>
            </div>
        );
    }
}

export default Login;


// // Import react
// import React from 'react';
// import { Link } from "react-router-dom";
// import { TextField, Button } from "@material-ui/core"
// import { IconButton } from "@material-ui/core";
// import './Login.css';

// import { Route, Switch, BrowserRouter } from 'react-router-dom'; // import routing capabilities

// class Login extends React.Component{


//     constructor(props){
//         super(props)
//         this.state = {
//             userEntered: "",
//             passwordEntered: ""

//         }

//         this.handleUserChange = this.handleUserChange.bind(this);
//         this.handlePasswordChange = this.handlePasswordChange.bind(this);
        
//     }

//     // sets state's username to user input
//     handleUserChange(event){
//         this.setState({userEntered: event.target.value});
//     }

//     // sets state's password to user input
//     handlePasswordChange(event){
//         this.setState({passwordEntered: event.target.value});
//     }

//     // handles submission of the form
//     async handleSubmit(){
//         // post the auth to backend

//         //it authenticated, go to landing
//     }

//     render(){
//         return(
//             <div className="loginContainer">

//                 <p className='title'>Login page</p>

//                 <form>
//                     <div className="loginInputField">
//                         <TextField onChange={this.handleUserChange} className="loginTextField" id="outlined-basic" label="username" variant="outlined" />
//                     </div>
//                     <div className="loginInputField">
//                         <TextField onChange={this.handlePasswordChange} type="password" className="loginTextField" id="outlined-basic" label="password" variant="outlined" />
//                     </div>
//                 </form>

//                 <IconButton onClick={this.handleSubmit} variant="outlined" href="/Landing" color="primary">Login</IconButton>
//             </div>
//         )


//     }

// }

// export default Login;