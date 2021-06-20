// Import react
import React from 'react';
// import { Link } from "react-router-dom";

import '../../App.css';
import './Header.css';
import logo from '../../res/AchievementHubLogo.png';
import timm from '../../res/timm.jpg';

class Header extends React.Component{


    render(){
        return(
            <div className='header'>
            	<div className='flexbox'>
	                <img alt="Logo" src={logo} />
	                <a href='/'>AchievementHub</a>
	            </div>
	            <div className='flexbox'>
	            	<h2><a href='/'>+</a></h2>
	            	<h2><a href='/'>Timm Ilyas</a></h2>
	            	<img alt="Timm" src={timm} className='profilePic'/>
	            </div>
            </div>
        )


    }


}

export default Header;