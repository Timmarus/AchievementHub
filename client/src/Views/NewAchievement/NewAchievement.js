// Import react
import React from 'react';
// import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core"
import {formToState} from "../../actions/user";
import {setRouteToAccount} from "../../actions/routes";
import { ProfileBar } from "../../Components/ProfileBar"
// import '../../App.css';
import './NewAchievement.css';

import addAchievement from "../../res/addAchievement.png"
import magnifyingGlass from "../../res/magnifyingGlass.png"
import { postAchievement } from '../../actions/achievement';


class NewAchievement extends React.Component{

    constructor(props){
        super(props)
        this.props.history.push("/NewAchievement")

    }
    state = {
        
    }

    render(){
        
        const {app, user} = this.props
        return(
            <div>
                <ProfileBar {...app} user={user}/>
                
                {/* <div className="uploadBlock">
                    <Button className="findButton">
                        <img alt="Add Achievement" src={addAchievement}></img>
                    </Button>
                    <p> OR </p>
                    <Button className="findButton">
                        <img alt="Magnifying Glass" src={magnifyingGlass}></img>
                    </Button>
                </div> */}
                <h2>Enter Achievement Details</h2>

                <div className="newAchievementInputField">
                    <TextField name="name" onChange={(e) => formToState(this, e.target)} className="achievementDetails" id="outlined-basic" label="Achievement Name" variant="outlined" />
                </div>

                <div className="newAchievementInputField">
                    <TextField name="game" onChange={(e) => formToState(this, e.target)} className="achievementDetails" id="outlined-basic" label="Game" variant="outlined" />
                </div>

                <Button onClick={() => postAchievement(this, user.userName, app)} href="/Landing" variant="outlined" color="primary">
                    Post Achievement!
                </Button>
            </div>
        )
    }


}

export default NewAchievement;