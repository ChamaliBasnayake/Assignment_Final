import React, { Component } from 'react'
import { Button, Card } from 'antd'
import axios from 'axios';
              

class ViewHall extends Component {

    constructor(props) {
        super(props)

        this.state = {
                halls: []
        }
        this.editHall = this.editHall.bind(this);
        this.deleteHall = this.deleteHall.bind(this);
        this.addHall = this.addHall.bind(this);
    }

    deleteHall(id){
        axios.delete(`http://localhost:8080/api/halls/${id}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.props.history.push('/hall/view');
        })
        window.location.reload(false);
    }

    editHall(id){
        this.props.history.push(`/hall/update/${id}`);

    }

    componentDidMount(){
        axios.get(`http://localhost:8080/api/halls`)
        .then(res => {
          const halls = res.data;
          this.setState({ halls });
        })
    }

    addHall(){
        this.props.history.push('/hall/new');
    }

    render() {

        return (
            <div>
            <div>
            <button className="btn btn-primary" onClick={this.addHall}> Add Hall</button>
            </div>
            <br></br>
            <div className = "row" >
            <Card title={< div style= {{textAlign: "center"}} > Hall Details </ div >} bordered={false} style={{color: "black"}}> 
                   <table className = "table table-striped table-bordered">
                       <thead>
                           <tr>
                               <th> Hall Name </th>
                               <th> Seat Count </th>
                               <th> Price Per Seat</th>
                               <th style={{width: "200px"}}> Action</th>
                           </tr>
                       </thead>
                       <tbody>
                           {
                               this.state.halls.map(
                                   hall => 
                                   <tr key = {hall.id}>
                                        <td> {hall.name} </td>   
                                        <td> {hall.seatCount}</td>
                                        <td> {hall.pricePerSeat}</td>
                                        <td>
                                           <Button type="primary" onClick={ () => this.editHall(hall.id)}>Update</Button>
                                           &nbsp;
                                           <Button type="danger" onClick={ () => this.deleteHall(hall.id)}>Delete</Button>
                                        </td>
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

export default ViewHall;