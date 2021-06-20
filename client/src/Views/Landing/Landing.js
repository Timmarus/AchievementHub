// Import react
import React from 'react';
import { Link } from "react-router-dom";
import { ProfileBar } from "../../Components/ProfileBar"
import { LandingAchievement } from "../../Components/LandingAchievements";
import { getAllAchievements } from "../../actions/achievement";
import './Landing.css';

class Landing extends React.Component{

    constructor(props){
        super(props);
        this.props.history.push("/Landing");
    }

    //global sta
    state = {

    }
    render(){
        const {app, user} = this.props;
        //sapp.setState(]})
        const coinsPerAchievement = 3;
        //getAllAchievements(user.userName, app); // sets app state to have a list of achievements
        console.log(app.state);
        return(
            <div className="landingContainer">
                <ProfileBar {...app} user={user}/>

                <div className="AllLandingAchievementsContainer">
                    <div className="AllLandingAchievementsSubContainer">
                        {console.log(app.state.allAchievements)}
                        {app.state.allAchievements ? 
                        // Display all achievements
                        app.state.allAchievements.map((achievement) => 
                            <LandingAchievement 
                            app={app}
                            coins={coinsPerAchievement}
                            dateAchieved={achievement.date}
                            name={achievement.name}
                            person={achievement.achiever}
                            game={achievement.game}
                            platform="steam"
                            />
                        ):
                        // Display loading if no achievements are loaded
                        <div className="loadingAchievements">Loading Achievements...</div>}
                        {/* <LandingAchievement coins="3" dateAchieved="October 5 2020" name="Decisive Victory" person="Alexander Chen" platform="steam" game="Terraria"/>
                        <LandingAchievement coins="2" dateAchieved="October 3 2020" name="Triple Takedown" person="Alexandra Tran" platform="discord" game="God of War"/>
                        <LandingAchievement coins="6" dateAchieved="October 1 2020" name="100 Wins" person="Timm Ilyas" platform="steam" game="Among Us"/> */}
                        <LandingAchievement coins="3" dateAchieved={Date.now()} name="Registered to AchievementHub" person={app.state.currentUser.userName} platform="steam" game="AchievementHub" />
                    </div>

                </div>   

            </div>
        
        )
    }

}

export default Landing;