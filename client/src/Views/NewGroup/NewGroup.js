// Import react
import React from 'react';
// import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core"

import { ProfileBar } from "../../Components/ProfileBar"
import './NewGroup.css';
import { createGroup } from "../../actions/group";
import {formToState} from "../../actions/user";
import { setRouteToAccount } from "../../actions/routes";
import addAchievement from "../../res/addAchievement.png"


class NewGroup extends React.Component{

    constructor(props){
        super(props);
        this.props.history.push("/NewGroup");
    }


    state = {

    }

    setRoute = (app, route) => {
		setRouteToAccount(app, route);
	}

    render(){
        const {app, user} = this.props;
        return(
            <div>
                <ProfileBar {...app} user={user}/>
                {/* This should let them pick an image eventually? */}
                <div className="uploadBock">
                    <Button className="findButton">
                        <img alt="Add Achievement" src={addAchievement}></img>
                    </Button>


                </div>
                    <div className="newAchievementInputField">
                        <TextField name="groupName" onChange={e => formToState(this, e.target)} className="achievementDetails" id="outlined-basic" label="Group Name" variant="outlined"/>
                    </div>
                <Button onClick={() => {createGroup(this, app); this.setRoute(app, "ManageGroup");}} variant="outlined" color="primary">
                    Create!
                </Button>
            </div>
        )
    }


}

export default NewGroup;