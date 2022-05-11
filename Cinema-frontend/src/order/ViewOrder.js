import React, { Component } from 'react'
import { Card, Button } from 'antd'
import axios from 'axios';
              
class ViewOrder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            customerName: '',
            phone: '',
            movieName: this.props.match.params.movieName,
            date: this.props.match.params.date,
            odcSeats: '',
            balconySeats: '',
            superbalconySeats: '',
            payment: '',
            showHide: false,
        }
        this.approveOrder = this.approveOrder.bind(this);
    }

    approveOrder = (e) => {
        e.preventDefault();
        let order = {
            movieName: this.state.movieName,
            date: this.state.date, 
            odcSeats: this.state.odcSeats,
            balconySeats: this.state.balconySeats,
            superbalconySeats: this.state.superbalconySeats
        };
        console.log('order => ' + JSON.stringify(order));

        axios.put(`http://localhost:8080/api/booking/`+this.state.movieName+'/'+this.state.date,order)
        .then(res => {
            this.props.history.push('/seat/view');
            

        })
    }

    componentDidMount(){
        axios
        .get(`http://localhost:8080/api/orders`)
        .then(({ data })=> {
            this.setState({ 
                customerName: data.customerName,
                phone: data.phone,
                movieName: data.movieName,
                date: data.date,
                odcSeats: data.odcSeats,
                balconySeats: data.balconySeats,
                superbalconySeats: data.superbalconySeats,
                payment: data.payment
          });
        })
        .catch((err)=> {})
    }

    render() {
        return (
            <div>
            <br></br>
            <div className = "row" >
            <Card title={< div style= {{textAlign: "center"}} > Order Details </ div >} bordered={false} style={{color: "black"}}> 
                   <table className = "table table-striped table-bordered">
                       <thead>
                           <tr>
                               <th> Customer Name </th>
                               <th> Phone Number </th>
                               <th> Movie Name </th>
                               <th> Date </th>
                               <th> ODC Seats </th>
                               <th> Balcony Seats </th>
                               <th> Super Balcony Seats </th>
                               <th> Payment to be Paid </th>
                               <th style={{width: "200px"}}> Action</th>
                           </tr>
                       </thead>
                       <tbody>
                                <tr>
                                    <td>{this.state.customerName}</td>
                                    <td>{this.state.phone}</td>
                                    <td>{this.state.movieName}</td>
                                    <td>{this.state.date}</td>
                                    <td>{this.state.odcSeats}</td>
                                    <td>{this.state.balconySeats}</td>
                                    <td>{this.state.superbalconySeats}</td>
                                    <td>{this.state.payment}</td>
                                    <td>
                                    <Button type="primary" onClick={this.approveOrder}>Approve</Button>     
                                    </td>
                                </tr>
                        </tbody>
                   </table>
            </Card>
         </div>  

    </div> 
        )}
}


export default ViewOrder;