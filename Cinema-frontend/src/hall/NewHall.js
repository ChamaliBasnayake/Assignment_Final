import React, { Component } from 'react';
import { createHall } from '../util/APIUtils';
import './NewHall.css';  
import { Form, Input, Button, notification, Card } from 'antd';
              
const FormItem = Form.Item;


const hallData = {
    name: "",
    seatCount: "",
    pricePerSeat: "",
};

class NewHall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            seatCount: {
                value: ''
            },
            pricePerSeat: {
                value: ''
            }
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSeatCountChange = this.handleSeatCountChange.bind(this); 
        this.handlePricePerSeatChange = this.handlePricePerSeatChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleNameChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
        hallData.name=event.target.value;
    }

    handleSeatCountChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
        hallData.seatCount=event.target.value;
        // const seatNum = event.target.value;
        // hallData.seatCount = parseInt(seatNum, 0);
        // console.log(typeof hallData.seatCount);
    }

    handlePricePerSeatChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
        // const seatPrice = event.target.value;
        // hallData.pricePerSeat = parseFloat(seatPrice);
        // console.log(typeof hallData.pricePerSeat);
        hallData.pricePerSeat=event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault(); 
        console.log(hallData);
        createHall(hallData)
        .then(response => {
            this.props.history.push("/hall/view");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login add a movie.');    
            } else {
                notification.error({
                    message: 'Cinema Application',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });              
            }
        });
        
    }

    cancel(){
        this.props.history.push('/hall/view');
    }

    validateName = (name) => {
        if(!name) {
            return {
                validateStatus: 'error',
                errorMsg: 'Hall Name may not be empty'                
            }
        }else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateSeatCount = (seatCount) => {
        if(!seatCount) {
            return {
                validateStatus: 'error',
                errorMsg: 'Seat Count may not be empty'                
            }
        }
        var num = /^-?[0-9]+$/;
        if(!num.test(seatCount)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a correct seat count'
            }
        }
        else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validatePricePerSeat = (pricePerSeat) => {
        if(!pricePerSeat) {
            return {
                validateStatus: 'error',
                errorMsg: 'Price per Seat may not be empty'                
            }
        }
        var num = /^[-+]?[0-9]+\.[0-9]+$/;
        if(!num.test(pricePerSeat)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a correct price value'
            }
        }
        else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    isFormInvalid() {
        if(this.state.name.validateStatus !== 'success' && this.state.seatCount.validateStatus !== 'success'){
            return true;
        }
    }

    render() {

        return (
            <div className="new-hall-container">
                <div className="new-hall-content">
                <Card title={< div style= {{textAlign: "center"}} > Add Hall </ div >} bordered={false} style={{color: "white", fontSize: "50px"}}>
                    <Form onSubmit={this.handleSubmit} className="hall-form">
                        <FormItem validateStatus={this.state.name.validateStatus}  help={this.state.name.errorMsg}>
                            <Input 
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Enter hall name"
                                value={this.state.name.value} 
                                onChange={(event) => this.handleNameChange(event, this.validateName)} />    
                        </FormItem>

                        <FormItem validateStatus={this.state.seatCount.validateStatus}  help={this.state.seatCount.errorMsg}>
                            <Input 
                                size="large"
                                name="seatCount"
                                autoComplete="off"
                                placeholder="Enter Seat Count"
                                value={this.state.seatCount.value} 
                                onChange={(event) => this.handleSeatCountChange(event, this.validateSeatCount)} />    
                        </FormItem>

                        <FormItem validateStatus={this.state.pricePerSeat.validateStatus}  help={this.state.pricePerSeat.errorMsg}>
                            <Input 
                                size="large"
                                name="pricePerSeat"
                                autoComplete="off"
                                placeholder="Enter Price Per Seat"
                                value={this.state.pricePerSeat.value} 
                                onChange={(event) => this.handlePricePerSeatChange(event, this.validatePricePerSeat)} />    
                        </FormItem>

                        <FormItem>
                            <Button
                            type="primary"
                            htmlType="submit"
                            disabled={this.isFormInvalid()}
                            >
                            Submit
                            </Button>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                        </FormItem>
                </Form>
                </Card>
                </div>    
            </div>
        );
    }
}

export default NewHall;