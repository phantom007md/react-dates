import React, {Component} from 'react';
import Card from "./utils/card";
import InputGroup from "./utils/input";
import axios from 'axios';
import Alert from "./utils/alert";

class Login extends Component {

    state = {
        data: '',
        errMessage: '',
    }

    login = async () => {
        try {

            let res = (await axios.post('/register/login', {data: this.state.data})).data
            console.log(res);
            

            let data = {
                id: res.id,
                name: res.name,
                isAdmin: res.isAdmin,
            }

            localStorage.setItem('DatesUser', JSON.stringify(data))
            this.props.fetchUser()

        } catch (e) {
            console.log(e.message)
            // if status 404 کاربر پیدا نشد   and so on
            this.setState({errMessage: 'کاربر وجود ندارد یا خطایی رخ داده.'})
        }
    }

    render() {
        return (
            <div className="login">
                <Card title='ورود'>
                    {(this.state.errMessage) ?
                        <Alert handleOnClick={(e)=>{this.setState({errMessage: null})}} danger>
                            {this.state.errMessage}
                        </Alert> : ''}
                    <div>
                        <InputGroup type='text'
                                    onKeyPress={e => {
                                        e.key === 'Enter' && this.login()
                                    }}
                                    style={{
                                        direction: 'ltr',
                                        textAlign: 'left'
                                    }}
                                    onChange={e => {
                                        this.setState({data: e.target.value})
                                    }}
                                    title='شماره مبایل یا ایمیل :'
                                    id='phone'/>
                        <div
                            className="form-group text-center d-flex justify-content-between">
                            <button type="button"
                                    onClick={e => {
                                        this.login()
                                    }}
                                    className="btn btn-primary">ورود
                            </button>
                            <button type="button"
                                    onClick={e => {
                                        this.props.changeTab('sign-up')
                                    }}
                                    className="btn btn-outline-primary">ثبت نام
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Login;
