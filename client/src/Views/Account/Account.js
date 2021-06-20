// Import react
import React from 'react';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './Account.css';

import { updateLoginForm } from "../../actions/user";
import { updateUsername, updatePassword, deleteUser } from "../../actions/account";

class Account extends React.Component{

    constructor(props){
        super(props);
        this.props.history.push("/Account");
    }

    //global state
    state = {

    }

    render(){
        const { app } = this.props
        return(

            <div className="accountContainer">


                {/* Change Username */}
                <div className="accountChangeUser">
                    <h2>Change username</h2>

                    <TextField
                        name="accountChangeUsername"
                        label="New Username"
                        className="accountTextField"
                        margin="normal"
                        onChange={e => updateLoginForm(this, e.target)}
                    />
                    <Button
                        className="accountDangerButton"
                        onClick={() => updateUsername(this, app)}
                    >
                        Confirm
                    </Button>

                </div>

                {/* Change Password */}
                <div className="accountChangePassword">
                    <h2>Change Password</h2>

                    <TextField
                        name="accountNewPassword"
                        label="New password"
                        className="accountTextField"
                        margin="normal"
                        onChange={e => updateLoginForm(this, e.target)}
                    />

                    <TextField
                        name="accountNewPasswordConfirm"
                        label="Confirm new password"
                        className="accountTextField"
                        margin="normal"
                        onChange={e => updateLoginForm(this, e.target)}
                    />

                    <Button
                        className="accountDangerButton"
                        onClick={() => updatePassword(this, app)}
                    >
                        Confirm
                    </Button>
                </div>

                {/* Delete user */}
                <div className="accountDeleteUser">
                    <h2>Delete user</h2>
                        <p><strong>
                            Warning: Deleting your account permanently deletes 
                            all data. There is no way to get it back. Do you wish to proceed?
                        </strong></p>
                    <Button
                        className="accountDangerButton"
                        onClick={() => deleteUser(app)}
                    >
                        Confirm
                    </Button>

                </div>

            </div>
        )


    }

}

export default Account;