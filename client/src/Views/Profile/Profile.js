// Import react
import React from 'react';
import { Button, TextField, InputLabel, Select, MenuItem } from "@material-ui/core";
// import { Avatar } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import TopBar from "../Components/TopBar";
import profilePic from "../../res/elex.jpg";
import godOfWarIcon from "../../res/godOfWar.jpg";
import timmIcon from "../../res/timm.jpg";
import { Group } from "../../Components/Group";
import discordIcon from "../../res/discord.png";
import steamIcon from "../../res/steam.png";

import './Profile.css';
import { ConnectedAccount } from '../../Components/ConnectedAccount';
import { addLinkedAccount, formToState, updateProfileData } from "../../actions/user";

import a1 from '../../res/Avatars/User/userAvatar1.png'
import a2 from '../../res/Avatars/User/userAvatar2.png'
import a3 from '../../res/Avatars/User/userAvatar3.png'
import a4 from '../../res/Avatars/User/userAvatar4.png'

const aMap = {
	1: a1,
	2: a2,
	3: a3,
	4: a4
}

const logoMap = 
{
    steam: steamIcon, 
    discord: discordIcon
}

const groupMap = 
{
    XBox_with_Tim: timmIcon,
    GoW4: godOfWarIcon
}

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.props.history.push("/Profile");
        //this.state.userLinkedAccounts = this.props.state.currentUser.profile.linkedAccounts;
    }
    state = {
        disabled: true,
        userLinkedAccounts: null
    }

    handleInfoChange = (event, app) => {
        let result = updateProfileData(this, app);
        if (result === true) {
            this.setState({disabled: true});
        }
    }
    render() {
        const { app } = this.props;
        console.log(app);
        const name = app.state.currentUser.profile.realName;
        const username = app.state.currentUser.userName;
        const email = app.state.currentUser.profile.email;
        let date = new Date(parseInt(app.state.currentUser.profile.joined));
        let month = date.getUTCMonth() + 1;
        let day = date.getUTCDate();
        let year = date.getUTCFullYear();
        let formattedDate = year + "/" + month + "/" + day;
        let invalidFields;
        this.state.errors ? invalidFields = this.state.errorFields : invalidFields = []
        return (
            <div>
                <div className="profileContainer">
                    <p></p>
                    <img src={aMap[app.state.currentUser.profile.pic]} alt="Big profile avatar." className="bigProfileAvatar" />
                    <p className="bigName">{name}</p>
                    <p className="usernameText">@{username}</p>
                    <Button variant="contained" className="profileButton" color="primary" href="./AllAchievements">
                        View all achievements
                </Button>
                </div>
                <div className="buttomInfoContainer">
                    <div className="subContainer connectedAccountsContainer">
                        <div className="subContainerHeader">
                            <p className="mediumText">Connected accounts</p>
                        </div>
                        {app.state.currentUser.profile.linkedAccounts.map(account =>
                            <ConnectedAccount platformPic={logoMap[account.type]} userTag={account.username} id={account._id} user={app.state.currentUser._id} app={ app } editable={true} />
                        )}
                        <div className="platformBox" style={{display: "flex", flexDirection: "row"}}>
                        <div style={{flex: 0.2, paddingTop: "15px"}}>
                        <Select id="newAccountType" displayEmpty name="newLinkedAccountType" className="platformPic" autowidth="true" style={{minWidth: "80%"}} onChange={e => formToState(this, e.target)} >
                            <MenuItem value="steam">Steam</MenuItem>
                            <MenuItem value="discord">Discord</MenuItem>
                        </Select>
                        </div>
                        <div style={{flex: 0.8}}>
                        <TextField Displayed name="newLinkedAccountName" id='standard-basic' label="Username" className="platformText" onChange={e => formToState(this, e.target)}/>
                        </div>
                        <Button className="platformButton" variant="contained" color="primary" onClick={(e) => addLinkedAccount(this, app)}>
                                Add
                    </Button>
                    </div>
                    </div>



                    <div className="subContainer generalInfoContainer">
                        <div className="subContainerHeader">
                            <p className="mediumText">General Info</p>
                            <Button variant="contained" color="primary" onClick={() => this.setState({ disabled: false })}>
                                Edit
                    </Button>
                        </div>
                        <form className='generalInfoForm'>
                            <div className="inputField">
                                <TextField Displayed name="realName" id="standard-basic" label="Real name" className={`${invalidFields.includes("realName") ? "fail" : null }`} defaultValue={name} onChange={e => formToState(this, e.target)} disabled={this.state.disabled} />
                            </div>
                            <div className="inputField">
                                <TextField Displayed name="username" id="standard-basic" label="Username" className={`${invalidFields.includes("userName") ? "fail" : null }`} defaultValue={username} onChange={e => formToState(this, e.target)} disabled={this.state.disabled} />
                            </div>
                            <div className="inputField">
                                <TextField Displayed name="email" id="standard-basic" label="Email" className={`${invalidFields.includes("email") ? "fail" : null }`} defaultValue={email} onChange={e => formToState(this, e.target)} disabled={this.state.disabled} />
                            </div>
                            <InputLabel className="joinedLabel">Joined on: {formattedDate}</InputLabel>
                            <Button className="saveButton" variant="contained" color="primary" onClick={(event) => this.handleInfoChange(event, app)}>
                                Save
                    </Button>
                        </form>
                    </div>
                    <div className="subContainer groupsContainer">
                        <div className="subContainerHeader">
                            <p className="mediumText">Groups</p>
                            <Button variant="contained" className="profileButton" color="primary" href="./ManageGroup">
                                Manage Groups
                    </Button>
                        </div>
                        {app.state.currentUser.profile.groups.map(group =>
                            <Group groupPic={groupMap[group.name]} groupName={group.name} admin={group.admin}/>
                        )}
                    </div>
                </div>
            </div>
        )


    }

}

export default Profile;