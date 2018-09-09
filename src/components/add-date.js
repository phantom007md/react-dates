import React, {Component} from 'react';
import InputGroup from "./utils/input";
import Card from "./utils/card";
import SelectGroup from "./utils/select";
import moment from 'moment-jalaali'
import axios from 'axios';


// import PropTypes from 'prop-types';
// import DatePicker from '../packages/react-datepicker2/index';
// import '../packages/react-datepicker2/react-datepicker2.min.css';


class AddDate extends Component {

    state = {
        startDate: moment(),
        horses: 0,
        topics: [],
        topic: {
            id: null,
            basePrice: 0,
        },
        user: {
            id: null,
            name: null,
        },
        finalPrice: 0,
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
        this.fetchTopics()
    }

    fetchTopics = async () => {
        let topics = (await axios.get('http://127.0.0.1:8000/api/topics')).data;
        await this.setState({topics})
    }

    setTopic = async topicID => {
        let topic = (await axios.get(`/topics/${topicID}`)).data
        await this.setState({topic: {id: topic.id, basePrice: topic.basePrice}})
        this.setFinalPrice()
    }

    setFinalPrice = async () => {
        let finalPrice = Math.floor(this.state.topic.basePrice * this.state.horses)
        await this.setState({finalPrice})
    }

    pay = async () => {
        try {
            let res = await axios.post('/payments/pay', {
                user_id: this.state.user.id,
                topic_id: this.state.topic.id,
                horses: this.state.horses,
                start_date: this.state.startDate,
            })

            if (res.data.redirect !== 'failed') {
                window.location = res.data.redirect
            } else {
                console.log(res.data, ' :', 'خطایی رخ داده است')
            }
        } catch (e) {
            console.dir(e)
        }
    }

    render() {
        return (
            <div className="dates__list">
                <Card title='ثبت درخواست خود'>
                    <div>

                        {/*<DatePicker onChange={startDate => this.setState({ startDate })} value={this.state.startDate} />*/}

                        <InputGroup type='text'
                                    id='dp'
                                    title='تاریخ و زمان شروع مد نظر :'
                                    id='dateTime'/>

                        <SelectGroup options={this.state.topics}
                                     onChange={e => this.setTopic(e.target.value)}
                                     title='دوره خود را انتخاب کنید'/>

                        <div className="form-group">
                            <label>هزینه هر ساعت :</label>
                            <div
                                className="filed">{this.state.topic.basePrice}</div>
                        </div>

                        <InputGroup type='text'
                                    onChange={async e => {
                                        let horses = e.target.value
                                        await this.setState({horses})
                                        this.setFinalPrice()
                                    }}
                                    title='مدت زمان :'
                                    id='length'
                                    placeholder='مدت زمان مورد نظر را به ساعت وارد کنید'/>

                        <div className="form-group">
                            <label>هزینه نهایی :</label>
                            <div className="filed">{this.state.finalPrice}</div>
                        </div>

                        <div className="form-group text-left">
                            <button type="button"
                                    onClick={this.pay}
                                    disabled={this.state.finalPrice <= 0}
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
