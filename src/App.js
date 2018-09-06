import React, {Component} from 'react';
import './styles/App.css';
import DateList from "./components/dates-list";
import AddDate from "./components/add-date";
import Auth from "./components/auth";

class App extends Component {

    state = {
        activeTab: 'add',
        user: {
            id: null,
            name: null,
        },
    }

    componentWillMount() {
        (localStorage.getItem('user') && !this.state.user.id) &&
        this.setState({user: JSON.parse(localStorage.getItem('user'))})
    }

    componentWillUpdate() {
        (localStorage.getItem('user') && !this.state.user.id) &&
        this.setState({user: JSON.parse(localStorage.getItem('user'))})
    }

    logOut = async () => {
        await this.setState({user: {id: null, name: null}})
        localStorage.removeItem('user')
    }

    fetchUser = (user) => {
        this.setState({
            user: {
                id: user.id,
                name: user.name,
            }
        })
    }

    render() {
        return (
            <div className="dates">
                {(!this.state.user.id) ?
                    <Auth fetchUser={this.fetchUser}/> : ''}
                <div className="container-fluid">
                    <div className="container">
                        {this.state.user.id &&
                        <div className=" user d-flex justify-content-between">
                            <div>{this.state.user.name}</div>
                            <div style={{cursor: 'pointer'}}
                                 onClick={this.logOut}>خروج
                            </div>
                        </div>
                        }
                        <div className="index-actions">
                            <button
                                className={(this.state.activeTab === 'add') ? "btn btn-info" : "btn btn-outline-info"}
                                onClick={e => {
                                    this.setState({activeTab: 'add'})
                                }}
                            >ثبت درخواست
                            </button>
                            <button
                                className={(this.state.activeTab === 'list') ? "btn btn-info" : "btn btn-outline-info"}
                                onClick={e => {
                                    this.setState({activeTab: 'list'})
                                }}
                            >لیست قرار ها
                            </button>
                        </div>
                        {(this.state.activeTab === 'list') ?
                            <DateList/> : ''}
                        {(this.state.activeTab === 'add') ?
                            <AddDate/> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
