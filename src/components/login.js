import React, {Component} from 'react';
import Card from "./utils/card";
import InputGroup from "./utils/input";
import axios from 'axios';

class Login extends Component {

    state = {
        data: '',
        errMessage: '',
    }

    login = async () => {
        try{
            let res = await axios.post('register/login', {data:this.state.data})
            this.props.fetchUser(res.data)
        }catch (e) {
            // if status 404 کاربر پیدا نشد   and so on
            this.setState({errMessage:'کاربر وجود ندارد یا خطایی رخ داده.'})
        }
    }

    render() {
        return (
            <div className="login">
                <Card title='ورود'>
                    <form>
                        <InputGroup type='text'
                                    style={{direction:'ltr', textAlign: 'left'}}
                                    onChange={e=>{this.setState({data:e.target.value})}}
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
                    </form>
                </Card>
            </div>
        );
    }
}

export default Login;
