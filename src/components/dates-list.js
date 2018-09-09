import React, {Component} from 'react';
import Card from "./utils/card";
import axios from 'axios';

const Status = props => {
    return <button disabled={props.disabled}
                   onClick={()=>{props.changeStatus(props.date.id);}}
                   className={(props.date.active) ? 'btn btn-success' : 'btn btn-warning'}>
        {
            (props.date.active) ? <span>تائید شده</span> : <span>تائید نشده</span>
        }
    </button>
}

class DateList extends Component {

    state = {
        dates: [],
    }

    componentDidMount() {
        this.fetchDates()
    }

    fetchDates = async () => {
        let dates = (await axios.get('dates')).data
        await this.setState({dates})
    }

    changeStatus = async (date) => {

        let res = (await axios.patch(`/dates/${date}`, {
            user_id: this.props.user.id,
            type: 'toggleStatus',
        })).data

        console.log(res)

        this.fetchDates()
    }

    deleteDate = async (date) => {
        let res = (await axios.delete(`/dates/${date}?user_id=${this.props.user.id}`)).data
        console.log(res)
        this.fetchDates()
    }

    editDate = (date) => {
        // edit not set yet
        // return console.log('edit')
        // axios.put(`/dates/${date}/`, {user_id: this.props.user.id, type: 'edit'})
        // this.fetchDates()
    }

    handleDatesToggle = e => {
        console.log(e.target.checked)
    }

    render() {
        let i = 1
        return (
            <div className="dates__list">
                <Card handleToggle={this.handleDatesToggle} withToggle title='لیست تمامی قرار ها'>
                    <div className='table-responsive'
                         style={{marginTop: '10px'}}>
                        <table
                            className="table table-bordered table-striped table-hover">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>نام و نام خانوادگی</th>
                                <th>موضوع</th>
                                <th>تاریخ و زمان</th>
                                <th>مدت</th>
                                <th>وضعیت</th>
                                <th style={{visibility: 'hidden'}}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.dates.map(date =>
                                    <tr key={date.id}>
                                        <td>{i++}</td>
                                        <td>{date.user.name}</td>
                                        <td>{date.topic.name}</td>
                                        <td>
                                            {date.start_date}
                                            {/*<span> 1397/06/25 </span>*/}
                                            {/*<span>-</span>*/}
                                            {/*<span> چهار شنبه </span>*/}
                                            {/*<span>-</span>*/}
                                            {/*<span> ساعت ۸ </span>*/}
                                        </td>
                                        <td>
                                            {date.length}
                                        </td>
                                        <td>
                                            <Status
                                                date={date}
                                                changeStatus={this.changeStatus}
                                                disabled={!this.props.user.isAdmin}/>
                                        </td>
                                        {
                                            (this.props.user.isAdmin)?
                                            <td>
                                            <span
                                                onClick={e=>this.editDate(date.id)}
                                                className='controls__item'>
                                                <i className="material-icons">edit</i>
                                            </span>
                                                <span
                                                    onClick={(e)=>{this.deleteDate(date.id)}}
                                                    className='controls__item'>
                                            <i className="material-icons">delete</i>
                                            </span>
                                            </td>: <td style={{visibility: 'hidden'}}></td>
                                        }
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        );
    }
}

export default DateList;
