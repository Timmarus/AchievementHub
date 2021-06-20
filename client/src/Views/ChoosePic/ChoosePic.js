// Import react
import React from 'react';
import { ProfileBar } from "../../Components/ProfileBar"
import { TextField, Button } from "@material-ui/core"
//stylesheet import
import './ChoosePic.css';

// import possible profile pictures
import avatar1 from "../../res//Avatars/User/userAvatar1.png";
import avatar2 from "../../res//Avatars/User/userAvatar2.png";
import avatar3 from "../../res//Avatars/User/userAvatar3.png";
import avatar4 from "../../res//Avatars/User/userAvatar4.png";

import { setRouteToAccount } from "../../actions/routes";
import { setProfilePic } from "../../actions/user"

class ChoosePic extends React.Component{

    constructor(props){
        super(props);
        this.props.history.push("/ChoosePic");
    }

    //global sta
    state = {
        
    }
    render(){
        const {user, app} = this.props
        
        return (
        <div className="choosePicContainer">

            <h2>Pick your profile picture here!</h2>

            <Button onClick={() => {setProfilePic(1, user.userName, app); setRouteToAccount(app, "Landing")}} className="avatarButton">
                <img alt="avatar1" src={avatar1}></img>
            </Button>

            <Button onClick={() => {setProfilePic(2, user.userName, app); setRouteToAccount(app, "Landing")}} className="avatarButton">
                <img alt="avatar2" src={avatar2}></img>
            </Button>

            <Button onClick={() => {setProfilePic(3, user.userName, app); setRouteToAccount(app, "Landing")}} className="avatarButton">
                <img alt="avatar3" src={avatar3}></img>
            </Button>

            <Button onClick={() => {setProfilePic(4, user.userName, app); setRouteToAccount(app, "Landing")}} className="avatarButton">
                <img alt="avatar4" src={avatar4}></img>
            </Button>

        </div>
        
        )
        
    }

}

export default ChoosePic;