import React, {Component} from 'react';
import InputGroup from "./utils/input";
import Card from "./utils/card";
import SelectGroup from "./utils/select";
import moment from 'moment-jalaali'
import axios from 'axios';
import Alert from "./utils/alert";
import DatePicker from './datepicker/src/components/DatePicker'
import './datepicker/dist/react-datepicker2.min.css'


// import PropTypes from 'prop-types';
// import DatePicker from '../packages/react-datepicker2/index';
// import '../packages/react-datepicker2/react-datepicker2.min.css';


class AddDate extends Component {

    state = {
        dateTime: moment(),
        horses: 0,
        topics: [],
        topic: {
            id: null,
            basePrice: 0,
        },
        finalPrice: 0,
        loading: {
            btn: false,
        }
    }

    componentDidMount() {
        this.fetchTopics()
    }

    fetchTopics = async () => {
        try {
            let topics = (await axios.get('/topics')).data;
            await this.setState({topics})
        } catch (e) {
            console.log(e.message)
            this.setState({errMessage: 'خطایی در واکشی داده ها رخ داده.'})
        }
    }

    setTopic = async topicID => {
        try {
            let topic = (await axios.get(`/topics/${topicID}`)).data
            await this.setState({
                topic: {
                    id: topic.id,
                    basePrice: topic.basePrice
                }
            })
            this.setFinalPrice()
        } catch (e) {
            console.log(e.message)
            this.setState({errMessage: 'خطایی در واکشی داده ها رخ داده.'})
        }
    }

    setFinalPrice = async () => {

        if (typeof this.state.horses === 'number') {
            let finalPrice = Math.floor(this.state.topic.basePrice * this.state.horses)
            await this.setState({finalPrice})
        } else {
            this.setState({errMessage: 'خطا در داده های ورودی.'})
        }
    }

    pay = async () => {
        try {
            await this.setState({loading: {...this.state.loading, btn: true}})
            let res = await axios.post('/payments/pay', {
                uri: window.location.href,
                user_id: parseInt(this.props.user.id),
                topic_id: parseInt(this.state.topic.id),
                horses: parseInt(this.state.horses),
                dateTime: this.state.dateTime,
                discount: this.state.discount,
            })
            window.location = res.data.redirect
        } catch (e) {
            console.log(e.message)
            setTimeout(()=>{
                this.setState({loading: {...this.state.loading, btn: false}})
            }, 3000)
            this.setState({errMessage: 'خطایی در عملیات پرداخت رخ داده است.'})
        }
    }

    render() {
        return (
            <div className="dates__list">
                {(this.state.errMessage) ?
                    <Alert handleOnClick={(e) => {
                        this.setState({errMessage: null})
                    }} danger>
                        {this.state.errMessage}
                    </Alert> : ''}
                <Card title='ثبت درخواست خود'>
                    <div>

                        <div className="form-group dates-datepicker">
                            <label>زمان دوره خود را مشخص کنید</label>
                            <DatePicker
                                isGregorian={false}
                                onChange={dateTime => this.setState({ dateTime })}
                                value={this.state.dateTime}
                            />
                        </div>

                        <SelectGroup options={this.state.topics}
                                     onChange={e => this.setTopic(e.target.value)}
                                     title='دوره خود را انتخاب کنید'/>

                        <div className="form-group">
                            <label>هزینه هر ساعت :</label>
                            <div
                                className="filed">{this.state.topic.basePrice}</div>
                        </div>

                        <InputGroup type='number'
                                    onChange={async e => {
                                        let horses = parseInt(e.target.value)
                                        await this.setState({horses})
                                        this.setFinalPrice()
                                    }}
                                    value={this.state.horses}
                                    title='مدت زمان :'
                                    id='length'
                                    placeholder='مدت زمان مورد نظر را به ساعت وارد کنید'/>

                        <div className="form-group">
                            <label>هزینه نهایی :</label>
                            <div className="filed">{this.state.finalPrice}</div>
                        </div>

                        <InputGroup type='text'
                            onChange={async e => { 
                                this.setState({discount:e.target.value})
                            }}
                            value={this.state.discount}
                            title='کد تخفیف'
                            id='discount'
                            placeholder='کد تخفیف را وارد کنید' />

                        <div className="form-group text-left">
                            <button type="button"
                                    onClick={this.pay}
                                    disabled={(this.state.finalPrice <= 0 || this.state.loading.btn)}
                                    className="btn btn-warning">پرداخت
                            </button>
                        </div>

                    </div>
                </Card>
            </div>
        );
    }
}

export default AddDate;
