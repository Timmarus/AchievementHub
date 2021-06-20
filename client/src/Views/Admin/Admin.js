// Import react
import React from 'react';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './Admin.css';
import { deleteUser, updateUsername, updateAdminForm, makeAdmin, createUser} from '../../actions/admin';
class Admin extends React.Component{

    constructor(props){
        super(props);
        this.props.history.push("/Admin");
    }

    //global state
    state = {
        adminCreateUserUsername: "",
        adminCreateUserPassword: "",
        adminChangeUsernameOldUsername: "",
        accountChangeUsername: "",
        adminDeleteUserUsername: "",
        adminMakeAdminUsername: ""
    }

    render(){
        console.log("hello")
        return(

            <div className="adminContainer">

                <div className="adminCreateUser">
                    <h2>Create User</h2>
                    <TextField
                        name="adminCreateUserUsername"
                        label="Username"
                        className="adminTextField"
                        margin="normal"
                        onChange={e => updateAdminForm(this, e.target)}
                    />
                    <TextField
                        name="adminCreateUserPassword"
                        label="Password"
                        type="password"
                        className="login__input app__input app__horizontal-center"
                        margin="normal"
                        onChange={e => updateAdminForm(this, e.target)}
                    />
                    <Button
                        className="adminButton"
                        onClick={() => createUser(this)}
                    >
                        Confirm
                    </Button>

                </div>


                <div className="adminChangeUsername">
                    <h2>Change User's username</h2>

                    <TextField
                        name="adminChangeUsernameOldUsername"
                        label="Username"
                        className="adminTextField"
                        margin="normal"
                        onChange={e => updateAdminForm(this, e.target)}
                    />

                    <TextField
                        name="accountChangeUsername"
                        label="New Username"
                        className="adminTextField"
                        margin="normal"
                        onChange={e => updateAdminForm(this, e.target)}
                    />

                    <Button
                        className="adminDangerButton"
                        onClick={() => updateUsername(this)}
                    >
                        Confirm
                    </Button>
                </div>


                <div className="adminDeleteUser">
                    <h2>Delete user</h2>
                    <TextField
                        name="adminDeleteUserUsername"
                        label="Username"
                        className="adminTextField"
                        margin="normal"
                        onChange={e => updateAdminForm(this, e.target)}
                    />
                    <Button
                        className="adminDangerButton"
                        onClick={() => deleteUser(this)}
                    >
                        Confirm
                    </Button>

                </div>

                <div className="adminMakeAdmin">
                    <h2>Make Admin</h2>
                    <TextField
                        name="adminMakeAdminUsername"
                        label="Username"
                        className="adminTextField"
                        margin="normal"
                        onChange={e => updateAdminForm(this, e.target)}
                    />
                    <Button
                        className="adminDangerButton"
                        onClick={() => makeAdmin(this)}
                    >
                        Confirm
                    </Button>

                </div>

            </div>
        )


    }

}

export default Admin;