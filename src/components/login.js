import React, {Component} from 'react';
import Card from "./utils/card";
import FormGroup from "./utils/input";


class Login extends Component {

    state = {
        status: 'login'
    }

    render() {
        return (
            <div className='auth'>
                {(this.state.status === 'sign-up') ?
                    <div className="sign-up">
                        <Card title='ثبت نام' style={{width: '300px'}}>
                            <form>
                                <FormGroup type='text'
                                           title='نام و نام خانوادگی :'
                                           id='name'
                                           placeholder='نام و نام خانوادگی خود را وارد کنید'/>
                                <FormGroup type='email'
                                           muted='ایمیل شما به کسی نمایش داده نمیشود'
                                           title='ایمیل :'
                                           id='email'
                                           placeholder='ایمیل خود را وارد کنید'/>
                                <FormGroup type='text'
                                           muted='موبایل شما به کسی نمایش داده نمیشود'
                                           title='شماره موبایل :'
                                           id='phone'
                                           placeholder='شماره موبایل خود را وارد کنید'/>
                                <div className="form-group text-center">
                                    <button type="button"
                                            className="btn btn-primary">ثبت نام
                                    </button>
                                </div>
                            </form>
                        </Card>
                    </div>
                    : ''}
                {
                    (this.state.status === 'login') ?
                        <div className="login">
                            <Card title='ورود'>
                                <form>
                                    <FormGroup type='text'
                                               title='شماره مبایل یا ایمیل :'
                                               id='phone'
                                               placeholder='موبایل یا ایمیل'/>
                                    <div className="form-group text-center d-flex justify-content-between">
                                        <button type="button"
                                                className="btn btn-primary">ورود</button>
                                        <button type="button"
                                                onClick={e=>{this.setState({status:'sign-up'})}}
                                                className="btn btn-outline-primary">ثبت نام</button>
                                    </div>
                                </form>
                            </Card>
                        </div>
                        : ''}
            </div>
        );
    }
}

export default Login;
