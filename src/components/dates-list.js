import React, {Component} from 'react';

const Status = props => {
    if (props.status) {
        return <div className='status status--success'>تایید شده</div>
    }
    return <div className='status status--danger'>تایید نشده</div>
}

class DateList extends Component {

    state = {
        status: false,
        isAdmin: false,
    }

    render() {
        return (
            <div className="dates__list">
                <div className="container">
                    <div className="card card-body">
                        <h5 className="card-title">لیست تمامی قرار ها</h5>
                        <div className='table-responsive'
                             style={{marginTop: '20px', height: '500px'}}>
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
                                        <Status status={this.state.status}/>
                                    </td>
                                    {
                                        this.state.isAdmin &&
                                        <td>
                                            <span style={{
                                                padding: '0 5px',
                                                cursor: 'pointer'
                                            }}><i
                                                className="material-icons">edit</i></span>
                                            <span style={{
                                                padding: '0 5px',
                                                cursor: 'pointer'
                                            }}><i
                                                className="material-icons">delete</i></span>
                                        </td>
                                    }
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DateList;
