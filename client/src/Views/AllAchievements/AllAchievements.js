// Import react
import React from 'react';
// import { Link } from "react-router-dom";
// import { Button, Avatar } from "@material-ui/core";
// import TopBar from "../Components/TopBar";
// import profilePic from "../res/elex.jpg";
// import discordPic from "../res/AllAchievements/discord.png";
import steamPic from "../../res/AllAchievements/steam.png";
import steamAchievement1 from "../../res/AllAchievements/tf2achievement1.jpg";
import steamAchievement2 from "../../res/AllAchievements/tf2achievement2.jpg";
import steamAchievement3 from "../../res/AllAchievements/tf2achievement3.jpg";
import steamAchievement4 from "../../res/AllAchievements/tf2achievement4.jpg";
import steamAchievement5 from "../../res/AllAchievements/tf2achievement5.png";
import hubLogo from "../../res/AchievementHubLogo.png";
import { ProfileBar } from "../../Components/ProfileBar";

// import '../../Components/ProfileBar/ProfileBar.css'; // import styles
import './AllAchievements.css'; // import styles

class AllAchievements extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const {app, user} = this.props;
        return(
            
            <div>

                <div className="allAchievementsContainer">
                {/* Contains general profile information including their name, username, and gamer names in steam/discord */}
                <ProfileBar {...app} user={user}/>
                    {/* <div className="allAchievementsProfileContainer">

                        <img src={profilePic} alt="Big profile avatar." className="allAchievementsBigProfileAvatar"/>
                        <p className="allAchievementsBigName">{name}</p>
                        <p className="allAchievementsUsername">{username}</p>

                        <div className="allAchievementsProfileDiscordContainer">
                            <div className="allAchievementsDiscordName">
                                <img src={discordPic} alt="Discord Icon" className="allAchievementsProfileDiscordNameIcon"/>
                                <p className="allAchievementsDiscordNameText">{discordName}</p> 
                            </div>
                        </div>
                            
                        <div className="allAchievementsProfileSteamContainer">
                            <div className="allAchievementsSteamName">
                                <img src={steamPic} alt="Steam Icon" className="allAchievementsProfileSteamNameIcon"/>
                                <p className="allAchievementsSteamNameText">{steamName}</p> 
                            </div>
                        </div>


                    </div> */}

                    <div className="allAchievementsListContainer">
                    {/* Contains list of achievements a player received in steam and other gaming services */}

                        <div className="allAchievementsSteamAchievements">
                        {/* For Steam achievements specifically. */}

                            <span className="allAchievementsSteamIconHeadContainer">
                                <img src={steamPic} alt="Steam Icon" className="allAchievementsSteamNameIconHead"/> 
                            </span>
                            

                            <div className="allAchievementsSteamAchievementsListContainer">
                                {/* List of achievements for steam. Div box should be grey */}
                                <div className="allAchievementsSteamAchievementsList">
                                    <img src={steamAchievement1} alt="Steam Username" className="allAchievementsSteamNameIcon"/> 
                                    <img src={steamAchievement2} alt="Steam Username" className="allAchievementsSteamNameIcon"/> 
                                    <img src={steamAchievement3} alt="Steam Username" className="allAchievementsSteamNameIcon"/> 
                                    <img src={steamAchievement4} alt="Steam Username" className="allAchievementsSteamNameIcon"/> 
                                    <img src={steamAchievement5} alt="Steam Username" className="allAchievementsSteamNameIcon"/> 
                                </div>
                            </div>

                        </div>

                        <div className="allAchievementsOtherAchievements">
                        {/* For other achievements */}

                        <span className="allAchievementsOtherIconHeadContainer">
                                <img src={hubLogo} alt="Other Achievements" className="allAchievementsOtherNameIconHead"/> 
                            </span>
                            

                            <div className="allAchievementsOtherAchievementsListContainer">
                                {/* List of achievements for steam. Div box should be grey */}
                                <div className="allAchievementsOtherAchievementsList">
                                    <img src={steamAchievement2} alt="Achievement" className="allAchievementsOtherNameIcon"/> 
                                    <img src={steamAchievement1} alt="Achievement" className="allAchievementsOtherNameIcon"/> 
                                    <img src={steamAchievement3} alt="Achievement" className="allAchievementsOtherNameIcon"/> 
                                    <img src={steamAchievement4} alt="Achievement" className="allAchievementsOtherNameIcon"/> 
                                    <img src={steamAchievement5} alt="Achievement" className="allAchievementsOtherNameIcon"/> 
                                </div>
                            </div>
                        </div>

                        {/* This wall of breaks demonstrates scrollability on this view. */}
                        <br></br><br></br><br></br><br></br><br></br>
                        <br></br><br></br><br></br><br></br><br></br>
                        <br></br><br></br><br></br><br></br><br></br>
                        <br></br><br></br><br></br><br></br><br></br>
                        <br></br><br></br><br></br><br></br><br></br>
                        <br></br><br></br><br></br><br></br><br></br>
                    </div>
                </div>
                
            </div>
        )


    }

}

export default AllAchievements;