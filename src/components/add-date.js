import React, {Component} from 'react';
import InputGroup from "./utils/input";
import Card from "./utils/card";
import SelectGroup from "./utils/select";
import axios from 'axios';

class AddDate extends Component {

    state = {
        topics:[],
        finalPrice: 0
    }

    componentDidMount() {
        this.fetchTopics()
    }

    fetchTopics = async () => {
        let topics = (await axios.get('http://127.0.0.1:8000/api/topics')).data;
        await this.setState({topics})
    }

    render() {
        return (
            <div className="dates__list">
                <Card title='ثبت درخواست خود'>
                    <form>

                        <InputGroup type='text'
                                    title='تاریخ و زمان شروع مد نظر :'
                                    id='dateTime'/>

                        <SelectGroup options={this.state.topics} title='دوره خود را انتخاب کنید'/>

                        <InputGroup type='text'
                                    title='هزینه هر ساعت :'
                                    id='basePrice'
                                    disabled
                                    defaultValue='50'/>

                        <InputGroup type='text'
                                   title='مدت زمان :'
                                   id='length'
                                   placeholder='مدت زمان مورد نظر را به ساعت وارد کنید'/>

                        <InputGroup type='text'
                                    title='هزینه قابل پرداخت :'
                                    id='finalPrice'
                                    disabled
                                    defaultValue='500'/>

                        <div className="form-group text-left">
                            <button type="button"
                                    disabled={this.state.finalPrice <= 0}
                                    className="btn btn-warning">پرداخت
                            </button>
                        </div>

                    </form>
                </Card>
            </div>
        );
    }
}

export default AddDate;
