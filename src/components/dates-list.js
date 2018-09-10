import React, {Component} from 'react';
import Card from "./utils/card";
import axios from 'axios';
import Alert from "./utils/alert";

const Status = props => {
    return <button disabled={props.disabled}
                   onClick={() => {
                       props.changeStatus(props.date.id);
                   }}
                   className={(props.date.active) ? 'btn btn-success' : 'btn btn-warning'}>
        {
            (props.date.active) ? <span>تائید شده</span> :
                <span>تائید نشده</span>
        }
    </button>
}

const PrevDates = props =>

    <label htmlFor="togglePastDates" className='d-flex align-items-center'>
        <span style={{padding: '0 5px', color: '#854000', userSelect: 'none'}}>نمایش قرار های قبلی من</span>
        <input disabled={props.disabled} checked={props.myPrevDates}
               onChange={props.handleToggle}
               id='togglePastDates' type="checkbox"/>
    </label>


class DateList extends Component {

    state = {
        dates: [],
        myPrevDates: false,
        errMessage: null,
        loading: {
            activeToggle: false,
            prevDates: false,
        }
    }

    componentDidMount() {
        this.fetchDates()
    }

    fetchDates = async () => {
        try {
            let dates = (await axios.get('dates', {
                myPrevDates: this.state.myPrevDates,
                user_id: this.props.user.id,
            })).data
            await this.setState({dates})
        } catch (e) {
            console.log(e.message)
            this.setState({errMessage: 'خطایی در واکشی اطلاعات رخ داده است.'})
        }
    }

    changeStatus = async (date) => {
        try {
            let res = (await axios.patch(`/dates/${date}`, {
                user_id: this.props.user.id,
                type: 'toggleStatus',
            })).data
            await this.setState({
                loading: {
                    ...this.state.loading,
                    activeToggle: true
                }
            });
            setTimeout(() => {
                this.setState({
                    loading: {
                        ...this.state.loading,
                        activeToggle: false
                    }
                })
            }, 2000);
            this.fetchDates();
        } catch (e) {
            console.log(e.message)
            this.setState({errMessage: 'خطایی در تغییر وضعیت قرار رخ داده.'})
            setTimeout(() => {
                this.setState({
                    loading: {
                        ...this.state.loading,
                        activeToggle: false
                    }
                })
            }, 3000)
        }
    }

    deleteDate = async (date) => {
        try {
            (await axios.delete(`/dates/${date}?user_id=${this.props.user.id}`)).data
            this.fetchDates()
        } catch (e) {
            console.log(e.message)
            this.setState({errMessage: 'خطایی در حذف خطا ها رخ داده.'})
        }
    }

    editDate = (date) => {
        this.setState({errMessage: 'بخش ویرایش به زودی فعال خواهد شد.'})
        // edit not set yet
        // return console.log('edit')
        // axios.put(`/dates/${date}/`, {user_id: this.props.user.id, type: 'edit'})
        // this.fetchDates()
    }

    handleDatesToggle = async e => {
        await this.setState({myPrevDates: e.target.checked})
        this.fetchDates();
        this.setState({loading: {...this.state.loading, prevDates: true}})
        setTimeout(() => {
            this.setState({loading: {...this.state.loading, prevDates: false}})
        }, 2000)
    }

    render() {
        let i = 1
        return (
            <div className="dates__list">
                {(this.state.errMessage) ?
                    <Alert handleOnClick={(e) => {
                        this.setState({errMessage: null})
                    }} danger>
                        {this.state.errMessage}
                    </Alert> : ''}
                <Card prevDates={<PrevDates
                    handleToggle={this.handleDatesToggle}
                    disabled={this.state.loading.prevDates}
                    myPrevDates={this.state.myPrevDates}
                />}
                      title='لیست تمامی قرار ها'>
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
                                                changeStatus={(this.props.user.isAdmin) ? this.changeStatus : () => {
                                                    console.error('You are not admin!!')
                                                }}
                                                disabled={this.state.loading.activeToggle}/>
                                        </td>
                                        {
                                            (this.props.user.isAdmin) ?
                                                <td>
                                            <span
                                                onClick={(e) => {
                                                    this.editDate(date.id)
                                                }}
                                                className='controls__item'>
                                                <i className="material-icons">edit</i>
                                            </span>
                                                    <span
                                                        onClick={(e) => {
                                                            this.deleteDate(date.id)
                                                        }}
                                                        className='controls__item'>
                                            <i className="material-icons">delete</i>
                                            </span>
                                                </td> :
                                                <td style={{visibility: 'hidden'}}></td>
                                        }
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        );
    }
}

export default DateList;
