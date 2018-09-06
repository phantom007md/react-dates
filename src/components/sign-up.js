import React, {Component} from 'react';
import Card from "./utils/card";
import FormGroup from "./utils/input";


class SignUp extends Component {

    render() {
        return (
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
        );
    }
}

export default SignUp;
