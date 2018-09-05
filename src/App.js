import React, {Component} from 'react';
import './styles/App.css';
import DateList from "./components/dates-list";
import AddDate from "./components/add-date";

class App extends Component {

    state = {
        activeTab: 'dates-list'
    }

    render() {
        return (
            <div className="dates">
                <div className="container-fluid">
                    {(this.state.activeTab === 'dates-list') ? <DateList/> : ''}
                    {(this.state.activeTab === 'add-date') ? <AddDate/> : ''}
                </div>
            </div>
        );
    }
}

export default App;
