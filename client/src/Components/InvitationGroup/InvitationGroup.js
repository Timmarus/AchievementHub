// Import react
import React from "react";
import "./InvitationGroup.css";
import { Button } from "@material-ui/core";

class InvitationGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.appState.user,
    };
  }

  acceptInvite = (e) => {
    //accepts the invite by calling parent function passed down thru props to handle the acceptance
    e.preventDefault();

    const joined = e.target.parentNode.parentNode.getElementsByClassName("currentGroupName")[0].innerHTML;
    let invite = this.state.user.groupInvitations.filter(invitation => {return invitation.name === joined})
    invite[0].admin = false
    this.props.invitationHandler(invite[0], true)
  };

  rejectInvite = (e) => {
    //accepts the invite by calling parent function passed down thru props to handle the acceptance
    e.preventDefault();

    const joined = e.target.parentNode.parentNode.getElementsByClassName("currentGroupName")[0].innerHTML;
    let invite = this.state.user.groupInvitations.filter(invitation => {return invitation.name === joined})
    invite[0].admin = false
    this.props.invitationHandler(invite[0], false)
  };

  render() {
    const { groupName, groupPic } = this.props;
    return (
      <div className="currentGroupBox">
        <img alt="Group" src={groupPic} className="bigGroupPic"></img>
        <p className="currentGroupName">{groupName}</p>
        <Button
          variant="contained"
          color="primary"
          className="inviteDeclineButton"
          onClick={this.rejectInvite}
        >
          Decline
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="inviteAcceptButton"
          onClick={this.acceptInvite}
        >
          Accept
        </Button>
      </div>
    );
  }
}

export default InvitationGroup;
