// Import react
import React from "react";
// import { Link } from "react-router-dom";
import { ProfileBar } from "../../Components/ProfileBar";

// import '../../App.css';
import "./ManageGroup.css";
import { CurrentGroup } from "../../Components/CurrentGroup";
import godOfWarIcon from "../../res/godOfWar.jpg";
import timmIcon from "../../res/timm.jpg";
import uoftEsportsIcon from "../../res/uoftEsports.jpg";
import { InvitationGroup } from "../../Components/InvitationGroup";
import { NewGroup } from "../NewGroup"
import { setRouteToAccount } from "../../actions/routes";
import addIcon from "../../res/addAchievement.png"
import { Button } from "@material-ui/core";

// import possible group pictures
import group1 from "../../res/Avatars/Group/groupAvatar1.png";
import group2 from "../../res/Avatars/Group/groupAvatar2.png";
import group3 from "../../res/Avatars/Group/groupAvatar3.png";
import group4 from "../../res/Avatars/Group/groupAvatar4.png";

const groupMap = {
  XBox_with_Tim: timmIcon,
  GoW4: godOfWarIcon,
  UofTEsportsClub: uoftEsportsIcon,
};

const groupInvitationsMap = {
  UofTEsportsClub: uoftEsportsIcon,
};

class ManageGroup extends React.Component {
  constructor(props) {
    super(props);
    
    this.props.history.push("/ManageGroup");
    this.invitationHandler = this.invitationHandler.bind(this);
    this.leaveGroupHandler = this.leaveGroupHandler.bind(this);

  }

  state = {

  }

  invitationHandler(invite, accepted) {
    //if accepted, add invitation group to list of current groups
    if (accepted) {
      // this.setState({user.groups: [...this.state.user.groups, invite]})
      let tempUser = this.state.user;
      tempUser.groups.push(invite);
      this.setState({ user: tempUser });
    }

    //regardless of accept or decline, remove from list of invitations

    let tempUser2 = this.state.user;
    tempUser2.groupInvitations = tempUser2.groupInvitations.filter(
      (invitation) => {
        return invitation.name !== invite.name;
      }
    );
    this.setState({ user: tempUser2 });
    // this.state.user.groupInvitations = this.state.user.groupInvitations.filter(invitation => {return invitation.name !== joined})
    // this.state.user.groups.push(invite)
    // this.setState({user: this.state.user})
    console.log(this.state);
  }

  leaveGroupHandler(leaving, admin) {
    //if accepted, add invitation group to list of current groups
    if (admin) {
        // Delete group from other users (implemented in phase 2 when multiple users exist)
    } 
    let tempUser = this.state.user;
    tempUser.groups = tempUser.groups.filter(
      (group) => {
        return group.name !== leaving.name;
      }
    );
    this.setState({ user: tempUser });
    console.log(this.state);
  }

  setRoute = (app, route) => {
		setRouteToAccount(app, route);
	}

  render() {
    const {app, user} = this.props;

    return (
      <div>
        <ProfileBar {...app} user={user}/>


        <div className="groupList">
          <p className="groupHeader">Current Groups</p>
          {user.profile.groups.map((group) => (
            <CurrentGroup
              app={app}
              // groupPic={groupMap[group.name]}
              groupPic={group.pic}
              groupName={group.name}
              admin={group.admin}
              user={user}
            />
          ))}
          <Button className="manageGroupNewGroupButton">
            <img alt="Add Achievement" onClick={() => {this.setRoute(app, "NewGroup")}} src={addIcon}></img>
          </Button>

        </div>
      </div>
    );
  }
}

export default ManageGroup;

          {/* <p className="groupHeader">Invitations</p>
          {this.props.appState.user.groupInvitations.map((invitation) => (
            <InvitationGroup
              appState={this.state}
              invitationHandler={this.invitationHandler}
              groupPic={groupInvitationsMap[invitation.name]}
              groupName={invitation.name}
            />
          ))} */}