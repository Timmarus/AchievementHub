// Import react
import React from 'react';
// import { Link } from "react-router-dom";
import './TopBar.css';
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import logo from "../../res/AchievementHubLogo.png";
import { logout } from "../../actions/user";
import { setRouteToAccount } from "../../actions/routes";

class TopBar extends React.Component{
	
	constructor () {
		super();
		this.state = {
			anchorEl: null,
			styles: null,
		};
	}
	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	}
	
	handleMenuClose = () => {
		this.setState({ anchorEl: null });
	}

	logoutUser = (app) => {
        logout(app);
	};

	setRoute = (app, route) => {
		setRouteToAccount(app, route);
	}


	render(){
		const {name, profilePic, app} = this.props;
		return(
			<div className='Bar'>
				<a><img  onClick={() => this.setRoute(app, "Landing")} src={logo} className="leftCornerLogo" alt="AchievementHub Logo"/></a>
				<a className="achievementHubText" onClick={() => this.setRoute(app, "Landing")}>AchievementHub</a>
				
				
				<div className='topBarRight'>
					<a href='#'><Avatar src={profilePic} alt="Profile avatar." id="avatar" className="profileAvatar" onClick={this.handleMenu} /></a>
					<Menu
						id="menu-topbar"
						anchorEl={this.state.anchorEl}
						//getContentAnchorEl={null}
						keepMounted
						open={Boolean(this.state.anchorEl)}
						onClose={this.handleMenuClose}
						classes = {{paper: 'dropdownMenuPaper', list: 'dropdownMenuList'}}
					>
					<Avatar src={profilePic} alt="avatar" id="dropdownAvatar" className="dropdownAvatar" />
					<MenuItem onClick={() => {this.setRoute(app, "Landing"); this.handleMenuClose()}} className="dropdownMenuDashboardLink"><strong>Dashboard</strong></MenuItem>
					<MenuItem onClick={() => {this.setRoute(app, "ChoosePic"); this.handleMenuClose()}} className="dropdownMenuItem">Change profile picture</MenuItem>
					<MenuItem onClick={() => {this.setRoute(app, "Profile"); this.handleMenuClose()}} className="dropdownMenuItem">Edit my profile</MenuItem>			
					<MenuItem onClick={() => {this.setRoute(app, "ManageGroup"); this.handleMenuClose()}} className="dropdownMenuItem">Manage Groups</MenuItem>		
					<MenuItem onClick={() => {this.setRoute(app, "Account"); this.handleMenuClose()}} className="dropdownMenuItem">Account Settings</MenuItem>
					<MenuItem onClick={()=>{this.logoutUser(app); this.handleMenuClose()}} className="dropdownMenuItem">Log out</MenuItem>
					</Menu>

					<a className="name" href='/Profile'>{name}</a>
					<IconButton className="addButton" onClick={() => {this.setRoute(app, "NewAchievement"); this.handleMenuClose()}}>
					<Add/>
					</IconButton>
				</div>
			</div>
			)


	}


}

export default TopBar;