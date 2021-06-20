import React from 'react';
import "./LandingAchievement.css";

import discord from "../../res/AllAchievements/discord.png";
import steam from "../../res/AllAchievements/steam.png";

import terraria from '../../res/ChampionOfTerraria.png';
import godOfWar from "../../res/godOfWar.jpg"
import amongUs from "../../res/amongUs.jpg";

import alex from '../../res/alex.jpg';
import elex from "../../res/elex.jpg";
import albert from "../../res/albert.jpg";
import timm from "../../res/timm.jpg"

import coin from "../../res/coin.png";
import controller from '../../res/AchievementHubLogoPart.png';
import question from "../../res/question.png"

//phase 1 mock data based, will use api calls or database in future to retrieve data and possibly images
let platforms = {steam, discord, "Unknown": question};
let games = {"God of War": godOfWar, "Terraria": terraria, "Among Us": amongUs, "Unknown": question};
let people = {"Alexander Chen": alex, "Alexandra Tran": elex, "Albert Zheng": albert, "Timm Ilyas": timm, 'Unknown': question};
let icons = {coin, controller, "Unknown": question}


class LandingAchievement extends React.Component {
 
    //constructor initiates props passed in
    constructor(props){
        super(props);
    }

    state = {

    }


    render(){
        const {dateAchieved, coins, name, person, game, platform} = this.props;

        const date = new Date(dateAchieved)
        let month = date.getUTCMonth() + 1;
        let day = date.getUTCDate();
        let year = date.getUTCFullYear();
        let formattedDate = year + "/" + month + "/" + day;
        let currPlatform = platform ? platforms[platform.toString()] : people['Unknown'];
        let currGame = game ? games[game.toString()] : people['Unknown']; // display game, timm of no game specified 
        let currPeople = person ? people[person.toString()] : people['Unknown']; // display user, timm if no user passed in

        
        return(
            <div className="landingAchievementContainer">
                <div className="landingAchievementInfoContainer">
                    {console.log("rendering achievement")}

                    {/* <img className="landingAchievementUser" alt="Platform Achieved on" src={currPeople}></img> */}

                    <img className="landingAchievementPlatform" alt="User" src={currPlatform}></img> 
                    <img className="landingAchievementHubIcon" alt="AchievementHub Icon" src={controller}></img>
                    {/* <img className="landingAchievementGame" alt="Game Played" src={currGame}></img> */}

                    <span className="landingAchievementAchievementText">
                        <br/>
                        {person} just earned {name}!
                    </span>

                    <span className="landingAchievementGameName">
                        <br/>
                        {game}
                    </span>

                    <span className="landingAchievementDate">
                        <br/>
                        {formattedDate}
                    </span>
                    
                </div>



                <div className="landingAchievementCoinsContainer">
                    {/* contains the coins and possibly more information */}
                    <img className="landingAchievementCoin" alt="Coins Earned" src={coin}></img>
                    <p className="landingAchievementCoinsEarned" ><strong>+{coins}</strong></p>
                </div>
                


                {/* test by displaying all icons passed from test props */}
                {/* <img alt="coin" src={people['timm']}></img> */}
            </div>
        )
    }
}


export default LandingAchievement;