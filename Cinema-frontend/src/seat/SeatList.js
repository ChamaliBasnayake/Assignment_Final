import React, { Component } from 'react'
import { Card } from 'antd'
import axios from 'axios';
              

class SeatList extends Component {

    constructor(props) {
        super(props)

        this.state = {
                seats: []
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:8080/api/booking`)
        .then(res => {
          const seats = res.data;
          this.setState({ seats });
        })
    }

    render() {

        return (
            <div>
            <br></br>
            <div className = "row" >
            <Card title={< div style= {{textAlign: "center"}} > Seats Details </ div >} bordered={false} style={{color: "black"}}> 
                   <table className = "table table-striped table-bordered">
                       <thead>
                           <tr>
                               <th> Movie Name </th>
                               <th> Date </th>
                               <th> Available ODC Seats </th>
                               <th> Available Balcony Seats </th>
                               <th> Available Super Balcony Seats </th>
                           </tr>
                       </thead>
                       <tbody>
                           {
                               this.state.seats.map(
                                   seat => 
                                   <tr key = {seat.id}>
                                        <td> {seat.name} </td>   
                                        <td> {seat.date}</td>
                                        <td> {seat.odcSeats}</td>
                                        <td> {seat.balconySeats}</td>
                                        <td> {seat.superbalconySeats}</td>
                                   </tr>
                               )
                           }
                       </tbody>
                   </table>
                   </Card>
            </div>

       </div>
        );
    }
}

export default SeatList;