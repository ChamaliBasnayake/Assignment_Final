import React, { Component } from 'react'
import { Card } from 'antd'
import axios from 'axios';


class UpdateHall extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            seatCount: '',
            pricePerSeat: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSeatCountHandler = this.changeSeatCountHandler.bind(this);
        this.changePricePerSeatHandler = this.changePricePerSeatHandler.bind(this);
        this.updateHall = this.updateHall.bind(this);
    }

    componentDidMount(){
       axios.get(`http://localhost:8080/api/halls/`+this.props.match.params.id)
        .then(res => {
          const hall = res.data;
          this.setState({ 
            name: hall.name,
            seatCount: hall.seatCount,
            pricePerSeat: hall.pricePerSeat
           });
        })
    }

    updateHall = (e) => {
        e.preventDefault();
        let hall = {
            name: this.state.name,
            seatCount: this.state.seatCount, 
            pricePerSeat: this.state.pricePerSeat
        };
        console.log('hall => ' + JSON.stringify(hall));
        console.log('id => ' + JSON.stringify(this.state.id));

        axios.put(`http://localhost:8080/api/halls/`+this.props.match.params.id,hall)
        .then(res => {
            this.props.history.push('/hall/view');
        })
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeSeatCountHandler= (event) => {
        this.setState({seatCount: event.target.value});
    }

    changePricePerSeatHandler= (event) => {
        this.setState({pricePerSeat: event.target.value});
    }

    cancel(){
        this.props.history.push('/hall/view');
    }

    render() {
        return (
            <div className="new-movie-container">
            <div className="new-movie-content">
                        <Card title={< div style= {{textAlign: "center"}} > Update Hall </ div >} bordered={false} style={{color: "black", fontSize: "20px", width: "500px"}}>
                                    <form>
                                        <div className = "form-group">
                                            <label> Hall Name: </label>
                                            <input placeholder="Hall Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Seat Count: </label>
                                            <input placeholder="Seat Count" name="seatCount" className="form-control" 
                                                value={this.state.seatCount} onChange={this.changeSeatCountHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price Per Seat: </label>
                                            <input placeholder="Price Per Seat" name="pricePerSeat" className="form-control" 
                                                value={this.state.pricePerSeat} onChange={this.changePricePerSeatHandler}/>
                                        </div>
                                        <br/>
                                        <button className="btn btn-success" onClick={this.updateHall}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                    </Card>
                                </div>
                            </div>
        )
    }
}

export default UpdateHall