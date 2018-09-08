import React, {Component} from 'react';
import './styles/App.css';
import DateList from "./components/dates-list";
import AddDate from "./components/add-date";
import Auth from "./components/auth";

class App extends Component {

    state = {
        activeTab: 'list',
        user: {
            id: null,
            name: null,
            isAdmin: null,
        },
    }

    componentWillMount() {
        (localStorage.getItem('DatesUser') && !this.state.user.id) &&
        this.setState({user: JSON.parse(localStorage.getItem('DatesUser'))})
    }

    componentWillUpdate() {
        (localStorage.getItem('DatesUser') && !this.state.user.id) &&
        this.setState({user: JSON.parse(localStorage.getItem('DatesUser'))})
    }

    logOut = async () => {
        await this.setState({user: {id: null, name: null, isAdmin: null}})
        localStorage.removeItem('DatesUser')
    }

    fetchUser = () => {
        this.setState({user: JSON.parse(localStorage.getItem('DatesUser'))})
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
                            <DateList user={this.state.user}/> : ''}
                        {(this.state.activeTab === 'add') ?
                            <AddDate user={this.state.user}/> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
