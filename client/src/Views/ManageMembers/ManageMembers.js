// Import react
import React from "react";
import "./ManageMembers.css";
import adminCrown from "../../res/adminCrown.png";
import addIcon from "../../res/addAchievement.png"
import { TextField, Button } from "@material-ui/core";
import {deleteGroup, joinGroup, setGroupPic} from "../../actions/group";
import { checkSession, formToState } from "../../actions/user";
import { setRouteToAccount } from "../../actions/routes";

// import possible group pictures
import group1 from "../../res/Avatars/Group/groupAvatar1.png";
import group2 from "../../res/Avatars/Group/groupAvatar2.png";
import group3 from "../../res/Avatars/Group/groupAvatar3.png";
import group4 from "../../res/Avatars/Group/groupAvatar4.png";

class ManageMembers extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/ManageGroup");
  }
  
  state = {

  }

  setRoute = (app, route) => {
		setRouteToAccount(app, route);
	}

  render() {
    const { app, admin, user } = this.props; //groupPic,
    
    
    return (
      <div className="manageMembersBox">
        <h2> You are the group leader. Add a group member by username, or delete this group here.</h2>
            <TextField name="userName" onChange={e => formToState(this, e.target)} className="achievementDetails" id="outlined-basic" label="username" variant="outlined"/>

            <Button onClick={() => {joinGroup(this, app.state.toManage, app);}} variant="outlined" color="primary">
                Add Member!
            </Button>

            <Button onClick={() => {deleteGroup(app.state.toManage, app); this.setRoute(app, "Landing")}}
             variant="outlined" color="primary" 
             href='./Landing' className="dangerButton">
                Delete group
            </Button>
          
          <br></br>
          <h2>Set your group picture by clicking on desired group pic below</h2>
            <Button onClick={() => {setGroupPic(1, app.state.toManage, app); setRouteToAccount(app, "Landing")}} className="avatarButton">
                <img alt="groupAvatar1" src={group1}></img>
            </Button>

            <Button onClick={() => {setGroupPic(2, app.state.toManage, app); setRouteToAccount(app, "Landing")}} className="avatarButton">
                <img alt="groupAvatar2" src={group2}></img>
            </Button>

            <Button onClick={() => {setGroupPic(3, app.state.toManage, app); setRouteToAccount(app, "Landing")}} className="avatarButton">
                <img alt="groupAvatar3" src={group3}></img>
            </Button>

            <Button onClick={() => {setGroupPic(4, app.state.toManage, app); setRouteToAccount(app, "Landing")}} className="avatarButton">
                <img alt="groupAvatar4" src={group4}></img>
            </Button>

            

      </div>
    );
  }
}

export default ManageMembers;
