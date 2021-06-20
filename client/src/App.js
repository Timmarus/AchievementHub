// Import react
import React from 'react';

import './App.css';


import { Route, Switch, BrowserRouter } from 'react-router-dom'; // import routing capabilities

// TODO: Import route components here
import { Achievement } from './Views/Achievement';
import { AllAchievements } from './Views/AllAchievements';
import { Landing } from './Views/Landing';
import { ManageGroup } from './Views/ManageGroup';
import { NewAchievement } from './Views/NewAchievement';
import { Profile } from './Views/Profile';
import { Login } from './Views/Login';
import { Admin } from "./Views/Admin"
import { Account } from "./Views/Account"
import { NewGroup } from "./Views/NewGroup"
import {ChoosePic} from "./Views/ChoosePic"
import { ManageMembers } from "./Views/ManageMembers"

import { TopBar } from './Components/TopBar';

import stub from "./res/elex.jpg"
import question from "./res/question.png"

import { checkSession } from './actions/user';
import { isAbsolute } from 'path';

import a1 from './res/Avatars/User/userAvatar1.png'
import a2 from './res/Avatars/User/userAvatar2.png'
import a3 from './res/Avatars/User/userAvatar3.png'
import a4 from './res/Avatars/User/userAvatar4.png'

const aMap = {
	1: a1,
	2: a2,
	3: a3,
	4: a4
}

class App extends React.Component{
  
  constructor(props) {
    super(props)
    checkSession(this);
  }

  //global state
  state = {
    currentUser: null,
    currentPage: null,
    userProfile: null,
    allAchievements: null
  }


  render(){
    const { currentUser, currentPage} = this.state;
    const isAdmin = this.state.currentUser ? this.state.currentUser.isAdmin : false;
    console.log(this.state)
    if (true){
      return (
        <div className="App">
          {/* {<Header />} */}
          <TopBar className="appTopBar" 
          name={this.state.currentUser ? this.state.currentUser.userName : "Not logged in"}
          profilePic={this.state.currentUser ? aMap[this.state.currentUser.profile.pic] : question}
          app={this}
          {...this.props}
          />
          
          <div className="topBarAdjustment"></div>
  
        {/* A router decides what our page shows */}
          <BrowserRouter>
            <Switch> { /* Switch statement for routes */ }
              { /* Routes display different page components*/ }
              <Route
                          exact path={["/", "/Login", "/Landing", "/Admin", "/Account",
                                      "/NewAchievement", "/AllAchievements", "/Profile",
                                      "/ManageGroup", "/NewGroup", "/ManageMembers", "/ChoosePic"] /* any of these URLs are accepted. */ }
                          render={ props => (
                              <div className="app">
                                  {/* If they're an admin, let them into admin page */}
                                  {!currentUser ? <Login {...props} app={this} /> : 
                                  isAdmin ? <Admin {...props} app={this}/> : 
                                  !currentPage || currentPage == "Landing" ? <Landing {...props} app={this} user={this.state.currentUser}/> :
                                  currentPage == "Account" ? <Account {...props} app={this} user={this.state.currentUser}/> :
                                  currentPage == "NewAchievement" ? <NewAchievement {...props} app={this} user={this.state.currentUser}/> :
                                  currentPage == "AllAchievements" ? <NewAchievement {...props} app={this} user={this.state.currentUser}/> :
                                  currentPage == "Profile" ? <Profile {...props} app={this} user={this.state.currentUser}/> :
                                  currentPage == "ManageGroup" ? <ManageGroup {...props} app={this} user={this.state.currentUser}/> :
                                  currentPage == "NewGroup" ? <NewGroup {...props} app={this} user={this.state.currentUser}/> :
                                  currentPage == "ManageMembers" ? <ManageMembers {...props} app={this} user={this.state.currentUser}/> :
                                  currentPage == "ChoosePic" ? <ChoosePic {...props} app={this} user={this.state.currentUser}/> :
                                  <div>404 Not Found</div>
                                  }
                              </div>                   // ... spread operator - provides all of the props in the props object
                              
                          )}
                      />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
    
  }
}

export default App;
