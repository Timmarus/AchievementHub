import React from 'react';

import "./ProfileBar.css"
import { ConnectedAccount } from "../ConnectedAccount";
// import profilePic from "../../res/elex.jpg";
import discordPic from "../../res/AllAchievements/discord.png";
import steamPic from "../../res/AllAchievements/steam.png";

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
    steam: steamPic, 
    discord: discordPic
}

class ProfileBar extends React.Component{

    constructor () {
		super();
	}

    render(){

        const name = this.props.user.profile.realName; // name IRL
        const username = this.props.user.userName; // username on AchievementHub

        return(
            <div className="allAchievementsProfileContainer">

                <img src={aMap[this.props.user.profile.pic]} alt="Big profile avatar." className="allAchievementsBigProfileAvatar"/>
                <p className="allAchievementsBigName">{name}</p>
                <p className="allAchievementsUsername">@{username}</p>

                {this.props.user.profile.linkedAccounts.map(account =>
                    <ConnectedAccount platformPic={logoMap[account.type]} userTag={account.username} />
                )}
        </div>
        )
    }

}




export default ProfileBar;