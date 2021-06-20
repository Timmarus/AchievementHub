// Import react
import React from 'react';
import './Group.css';
import adminCrown from '../../res/adminCrown.png';

class Group extends React.Component{

    render(){
        const {groupName, groupPic, admin} = this.props;
        return(
            <div className="group">
                {/*<img alt="Group" src={groupPic} className="groupPic"></img>*/}
                <p className="groupText">{groupName}</p>
                {admin && (
                    <img alt="Admin Crown" src={adminCrown} className='adminCrown'></img>
                )}
                
            </div>
        )
    }
}

export default Group;