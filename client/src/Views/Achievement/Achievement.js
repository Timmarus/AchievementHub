import React from 'react';
// import { Link } from "react-router-dom";

import { ProfileBar } from "../../Components/ProfileBar"
import '../../App.css';
import LandingAchievement from "../../Components/LandingAchievements/LandingAchievement"
import './Achievement.css'

class Achievement extends React.Component{

    render(){
		return(
		<div className="achievementContainer">
			<ProfileBar/>
			<div className="achievementInfoContainer">
				<div className="achievementInfoSubContainer">
				<LandingAchievement coins="3" dateAchieved="October 5 2020" name="Decisive Victory" person="Alexander Chen" platform="steam" game="Terraria"/>
				</div>
			</div>
		</div>
		)
        /*return(
            <div className="AchievementContainer">
				<ProfileBar />
                <img alt="Icon Profile" className='icon profilePic' src={alex} />
                <p>{achievementUser} just earned</p>
                <img alt="Achievement" className='icon' src={achievement} />
                <h2>{achievementName}</h2>
                <p><i>{achievementDesc}</i></p>
                <p><strong>{achievementGame}</strong></p>
                <p>{achievementDate}</p>
                <p><img alt="Controller" className='icon' src={controller} /></p>
            </div>
        )
*/
    }


}

export default Achievement;