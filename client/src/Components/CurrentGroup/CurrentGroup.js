// Import react
import React from "react";
import "./CurrentGroup.css";
import adminCrown from "../../res/adminCrown.png";
import addIcon from "../../res/addAchievement.png"
import { Button } from "@material-ui/core";
import {leaveGroup} from "../../actions/group";
import { checkSession } from "../../actions/user";
import { setRouteToAccount } from "../../actions/routes";

// import possible group pictures
import group1 from "../../res/Avatars/Group/groupAvatar1.png";
import group2 from "../../res/Avatars/Group/groupAvatar2.png";
import group3 from "../../res/Avatars/Group/groupAvatar3.png";
import group4 from "../../res/Avatars/Group/groupAvatar4.png";
const groupPicMap = {1: group1, 2: group2, 3:group3, 4: group4};

class CurrentGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  leaveGroup = (e) => {
    //accepts the invite by calling parent function passed down thru props to handle the acceptance
    e.preventDefault();

    const left = e.target.parentNode.parentNode.getElementsByClassName(
      "currentGroupName"
    )[0].innerHTML;
    console.log(this.state.user.groups)
    let leaving = this.state.user.groups.filter((group) => {
      return group.name === left;
    });
    this.props.leaveGroupHandler(leaving[0], false);
  };

  setRoute = (app, route) => {
		setRouteToAccount(app, route);
	}

  render() {
    const { app, groupName, admin, groupPic, user } = this.props; //groupPic,
    console.log(groupName);
    console.log(admin);
    return (
      <div className="currentGroupBox">
        <img alt="Group" src={groupPicMap[groupPic]} className="bigGroupPic"></img>
        <p className="currentGroupName">{groupName}</p>
        {admin ? 
          <div>
              <img
                alt="Admin Crown"
                src={adminCrown}
                className="bigAdminCrown"
              ></img>
              {/* <Button
                variant="contained"
                color="primary"
                className="deleteGroupButton"
                onClick={() => {deleteGroup(groupName, app); checkSession(app)}}
              >
                Delete group
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                className="manageMembersButton"
                onClick={() => {this.setRoute(app, "ManageMembers"); app.setState({toManage: groupName});}}
              >
                Manage this group
              </Button>
            </div>
          :
            <Button
              href='./Landing'
              variant="contained"
              color="primary"
              className="leaveGroupButton"
              onClick={() => {leaveGroup(groupName, app);
                this.setRoute(app, "Landing");
              }}
            >
              Leave group
            </Button>
          }

        {/* <img alt="Group" src={groupPic} className="bigGroupPic"></img>
        <p className="currentGroupName">{groupName}</p>
        {admin && (
          <div>
            <img
              alt="Admin Crown"
              src={adminCrown}
              className="bigAdminCrown"
            ></img>
            <Button
              variant="contained"
              color="primary"
              className="deleteGroupButton"
            >
              Delete group
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="manageMembersButton"
            >
              Manage members
            </Button>
          </div>
        )}
        {!admin && (
          <Button
            variant="contained"
            color="primary"
            className="leaveGroupButton"
            onClick={this.leaveGroup}
          >
            Leave group
          </Button>
        )} */}
      </div>
    );
  }
}

export default CurrentGroup;
