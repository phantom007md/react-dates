import React, {Component} from 'react';
import InputGroup from "./utils/input";
import Card from "./utils/card";
import SelectGroup from "./utils/select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

class AddDate extends Component {

    state = {
        userID: null,
        houres: 0,
        topics: [],
        topic: {
            id: null,
            basePrice: 0,
        },
        finalPrice: 0
    }

    componentWillMount() {
        // moment.locale('IR-fa')
        // moment.loadPersian({dialect: 'persian-modern'})
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
    }

    setFinalPrice = async (hores)=> {
        await this.setState({hores})
        let finalPrice = await Math.floor(this.state.topic.basePrice * hores)
        await this.setState({finalPrice:finalPrice})
    }

    pay = () => {
    //    send request to pay the money for the topic and the hores requested
    }

    render() {
        return (
            <div className="dates__list">
                <Card title='ثبت درخواست خود'>
                    <div>

                        <DatePicker
                            placeholderText='زمان و روز خود را مشخص کنید'
                            showTimeSelect
                            dateFormat="llll"
                            selected={this.state.startDate}
                            onChange={(startDate) => {
                                this.setState({startDate})
                            }}
                        />

                        {/*<InputGroup type='text'*/}
                        {/*title='تاریخ و زمان شروع مد نظر :'*/}
                        {/*id='dateTime'/>*/}

                        <SelectGroup options={this.state.topics}
                                     onChange={e => this.setTopic(e.target.value)}
                                     title='دوره خود را انتخاب کنید'/>

                        <InputGroup type='text'
                                    title='هزینه هر ساعت :'
                                    id='basePrice'
                                    disabled
                                    defalutValue={this.state.topic.basePrice||0}/>

                        <InputGroup type='text'
                                    onChange={e=>this.setFinalPrice(e.target.value)}
                                    title='مدت زمان :'
                                    id='length'
                                    placeholder='مدت زمان مورد نظر را به ساعت وارد کنید'/>

                        <InputGroup type='text'
                                    title='هزینه قابل پرداخت :'
                                    id='finalPrice'
                                    disabled
                                    defalutValue={this.state.finalPrice||0}/>

                        <div className="form-group text-left">
                            <button type="button"
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
