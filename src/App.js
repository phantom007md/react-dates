import React, {Component} from 'react';
import './styles/App.css';
import DateList from "./components/dates-list";
import AddDate from "./components/add-date";
import Login from "./components/login";

class App extends Component {

    state = {
        activeTab: 'add-date',
        username: 'محمد حسین طباطبائی'
    }

    logOut = () => {
        console.log('logout')
    }

    render() {
        return (
            <div className="dates">
                {/*<Login/>*/}
                <div className="container-fluid">
                    <div className="container">
                        <div className="user d-flex justify-content-between">
                            <div>{this.state.username}</div>
                            <div style={{cursor: 'pointer'}} onClick={this.logOut}>خروج</div>
                        </div>
                        <div className="index-actions">
                            <button className="btn btn-outline-info"
                                    onClick={e => {
                                        this.setState({activeTab: 'add-date'})
                                    }}
                            >ثبت درخواست
                            </button>
                            <button className="btn btn-outline-info"
                                    onClick={e => {
                                        this.setState({activeTab: 'dates-list'})
                                    }}
                            >لیست قرار ها
                            </button>
                        </div>
                        {(this.state.activeTab === 'dates-list') ?
                            <DateList/> : ''}
                        {(this.state.activeTab === 'add-date') ?
                            <AddDate/> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
