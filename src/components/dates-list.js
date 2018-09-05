import React, {Component} from 'react';
import Card from "./utils/card";

const Status = props => {
    if (props.status) {
        return <button disabled={props.disabled || true}
                       className='btn btn-success'>تایید شده</button>
    }
    return <button disabled={props.disabled || true}
                   className='btn btn-warning'>تایید نشده</button>
}

class DateList extends Component {

    state = {
        isLoggedIn: false,
        status: true,
        isAdmin: false,
    }

    render() {
        return (
            <div className="dates__list">
                    <Card title='لیست تمامی قرار ها'>
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
                                <tr>
                                    <td>1</td>
                                    <td>سید محمد حسین طباطبائی</td>
                                    <td>Javascript Basics</td>
                                    <td>
                                        <span> 1397/06/25 </span>
                                        <span>-</span>
                                        <span> چهار شنبه </span>
                                        <span>-</span>
                                        <span> ساعت ۸ </span>
                                    </td>
                                    <td>۶ ساعت</td>
                                    <td>
                                        <Status disabled={!this.isAdmin}
                                                status={this.state.status}/>
                                    </td>
                                    {
                                        this.state.isAdmin &&
                                        <td>
                                            <span className='controls__item'>
                                                <i className="material-icons">edit</i></span>
                                            <span className='controls__item'>
                                                <i className="material-icons">delete</i>
                                            </span>
                                        </td>
                                    }
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
            </div>
        );
    }
}

export default DateList;
