import React, {Component} from 'react';
import Login from "./login";
import SignUp from "./sign-up";


class Auth extends Component {

    state = {
        activeTab: 'login'
    }

    changeTab = (activeTab) => {
        this.setState({activeTab})
    }

    render() {
        return (
            <div className='auth'>
                {(this.state.activeTab === 'login') ?
                    <Login fetchUser={this.props.fetchUser}
                           changeTab={this.changeTab}/> : ''}
                {(this.state.activeTab === 'sign-up') ?
                    <SignUp changeTab={this.changeTab}
                            fetchUser={this.props.fetchUser}/> : ''}
            </div>
        );
    }
}

export default Auth;
