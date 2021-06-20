// Import react
import React from 'react';
import './ConnectedAccount.css';
import Button from "@material-ui/core/Button";

import { deleteLinkedAccount } from "../../actions/user";

class ConnectedAccount extends React.Component{
	state = {
		deleted: false,
		username: null,
	}

    render(){
        const {platformPic, userTag, linkedId, userId, app, editable} = this.props;
        if (this.state.deleted) {
        	return "";
        }
        this.state.username = userTag;
        return(
            <div className="platformBox">

                <img alt="Group" src={platformPic} className="platformPicture"></img>
                <p className="platformText">{this.state.username}</p>
                {editable ? (
	                <Button className="platformButton" variant="contained" color="secondary" onClick={() => deleteLinkedAccount(this, app)}>
	                                Remove
	                    </Button>
	            ) : (<span></span>)
	        	}
            </div>
        )
    }
}

export default ConnectedAccount;