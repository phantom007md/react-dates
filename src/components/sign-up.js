import React, {Component} from 'react';
import Card from "./utils/card";
import InputGroup from "./utils/input";
import axios from 'axios';
import Alert from "./utils/alert";

class SignUp extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        errMessage:null,
    }

    signUp = async () => {
        try {

            let res = (await axios.post('/register/store', this.state)).data

            let data = {
                id:res.id,
                name:res.name,
                isAdmin:res.isAdmin,
            }

            localStorage.setItem('DatesUser', JSON.stringify(data))

            this.props.fetchUser()

        } catch (e) {
            console.log(e.message)
            this.setState({errMessage: 'خطایی در ثبت نام رخ داده.'})
        }
    }

    render() {
        return (
            <div className="sign-up">
                <Card title='ثبت نام' style={{width: '300px'}}>
                    {(this.state.errMessage) ?
                        <Alert handleOnClick={(e)=>{this.setState({errMessage: null})}} danger>
                            {this.state.errMessage}
                        </Alert> : ''}
                    <div>
                        <InputGroup type='text'
                                    onKeyPress={e => {
                                        e.key === 'Enter' && this.signUp()
                                    }}
                                    onChange={e => {
                                        this.setState({name: e.target.value})
                                    }}
                                    title='نام و نام خانوادگی :'
                                    id='name'
                                    placeholder='نام و نام خانوادگی خود را وارد کنید'/>
                        <InputGroup type='email'
                                    onKeyPress={e => {
                                        e.key === 'Enter' && this.signUp()
                                    }}
                                    onChange={e => {
                                        this.setState({email: e.target.value})
                                    }}
                                    muted='ایمیل شما به کسی نمایش داده نمیشود'
                                    title='ایمیل :'
                                    id='email'
                                    placeholder='ایمیل خود را وارد کنید'/>
                        <InputGroup type='text'
                                    onKeyPress={e => {
                                        e.key === 'Enter' && this.signUp()
                                    }}
                                    onChange={e => {
                                        this.setState({phone: e.target.value})
                                    }}
                                    muted='موبایل شما به کسی نمایش داده نمیشود'
                                    title='شماره موبایل :'
                                    id='phone'
                                    placeholder='شماره موبایل خود را وارد کنید'/>
                        <div className="form-group d-flex justify-content-between">
                            <button type="button"
                                    onClick={this.signUp}
                                    className="btn btn-primary">ثبت نام
                            </button>
                            <button type="button"
                                    onClick={e=>this.props.changeTab('login')}
                                    className="btn btn-outline-primary">ورود
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default SignUp;
