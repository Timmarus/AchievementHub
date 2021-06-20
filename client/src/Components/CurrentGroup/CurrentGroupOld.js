// Import react
import React from "react";
import "./CurrentGroup.css";
import adminCrown from "../../res/adminCrown.png";
import { Button } from "@material-ui/core";

class CurrentGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.appState.user,
    };
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

  render() {
    const { groupName, groupPic, admin } = this.props;
    return (
      <div className="currentGroupBox">
        <img alt="Group" src={groupPic} className="bigGroupPic"></img>
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
        )}
      </div>
    );
  }
}

export default CurrentGroup;
