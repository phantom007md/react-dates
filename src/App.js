import React, {Component} from 'react';
import './styles/App.css';
import DateList from "./components/dates-list";
import AddDate from "./components/add-date";
import Auth from "./components/auth";

const Alert = props =>
    <div
        className={(props.success) ? "alert alert-success" : "alert alert-danger" + "  fade show"}
        role="alert">
        {props.children}
        <button onClick={props.clearQueryString} style={{float: 'left', right:'auto', left: '0'}}
                type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

class App extends Component {

    state = {
        activeTab: 'add',
        status: null,
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

    componentDidMount() {
        this.setState({status: this.getQueryString('status')})
    }

    logOut = async () => {
        await this.setState({user: {id: null, name: null, isAdmin: null}})
        localStorage.removeItem('DatesUser')
    }

    fetchUser = () => {
        this.setState({user: JSON.parse(localStorage.getItem('DatesUser'))})
    }

    clearQueryString = () => {
        let uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
            let clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }
        this.setState({status: null})
    }

    getQueryString = (field, url) => {
        let href = url ? url : window.location.href;
        let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        let string = reg.exec(href);
        return string ? string[1] : null;
    };

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
                        <div style={{paddingTop: '10px'}}>
                            {(this.state.status === 'ok') ?
                                <Alert success
                                       clearQueryString={this.clearQueryString}>
                                    پرداخت با موفقیت انجام شد
                                </Alert>
                                : ''}
                            {(this.state.status === 'failed') ?
                                <Alert clearQueryString={this.clearQueryString}>
                                    خطا در انجام عملیات
                                </Alert>
                                : ''}
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
