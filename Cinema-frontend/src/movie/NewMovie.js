import React, { Component } from 'react';
import { createMovie } from '../util/APIUtils';
import './NewMovie.css';  
import { Form, Input, Button, notification, Card, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
              
const FormItem = Form.Item;
const { TextArea } = Input;

const movieData = {
    name: "",
    category: "",
    language: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: ""
   
};

class NewMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            category: {
                value:''
            },
            language: {
                value: ''
            },
            description: {
                value: ''
            },
            startDate: {
                 value: ''
             },
             endDate: {
                value: ''
            },
            startTime: {
                value: ''
            },
                

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this); 
        this.handleLangChange = this.handleLangChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
        movieData.name=event.target.value;
    }

    handleChange(event) 
    {   
         this.setState({value: event.target.value});  
         movieData.category=event.target.value;
    }

    handleLangChange(event) 
    {   
         this.setState({value: event.target.value});  
         movieData.language=event.target.value;
    }

    handleDescriptionChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
        movieData.description=event.target.value;
    }

    handleStartDateChange(date, dateString) 
    {
        var event = new Date(date);
        let newDate = JSON.stringify(event)
        newDate = newDate.slice(1,11)
        movieData.startDate=newDate;
    }

    handleEndDateChange(date, dateString) 
    {   
        var event = new Date(date);
        let newDate = JSON.stringify(event)
        newDate = newDate.slice(1,11)
        movieData.endDate=newDate;   
    }
    
    handleStartTimeChange(time, timeString) 
    {
        var event = new Date(time);
        let newTime = event.toLocaleTimeString('it-IT')
        movieData.startTime=newTime;   
    }

    handleEndTimeChange(time, timeString) 
    {   
        var event = new Date(time);
        let newTime = event.toLocaleTimeString('it-IT')
        movieData.endTime=newTime;    
    }

    handleSubmit(event) {
        event.preventDefault(); 
        console.log(movieData);
        createMovie(movieData)
        .then(response => {
            this.props.history.push("/");
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


    validateName = (name) => {
        if(!name) {
            return {
                validateStatus: 'error',
                errorMsg: 'Movie Name may not be empty'                
            }
        }else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateDescription = (description) => {
        if(!description) {
            return {
                validateStatus: 'error',
                errorMsg: 'Movie Description may not be empty'                
            }
        }else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    isFormInvalid() {
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }
    }

    render() {

        return (
            <div className="new-movie-container">
                <div className="new-movie-content">
                <Card title={< div style= {{textAlign: "center"}} > Add Movie </ div >} bordered={false} style={{color: "white", fontSize: "50px"}}>
                    <Form onSubmit={this.handleSubmit} className="movie-form">
                        <FormItem validateStatus={this.state.name.validateStatus} >
                            <Input 
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Enter movie name"
                                value={this.state.name.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>

                        <FormItem label="Movie Category">
                            <select className="movie-form-select" name="category" value={this.state.value} onChange={(event)=>this.handleChange(event)} >            
                                <option className="movie-form-option" value="horror">Horror</option>
                                <option className="movie-form-option" value="romaance">Romance</option>
                                <option className="movie-form-option" value="crime">Crime</option>
                                <option className="movie-form-option" value="fantasy">Fantasy</option>
                                <option className="movie-form-option" value="thriller">Thriller</option>
                                <option className="movie-form-option" value="comedy">Comedy</option>
                                <option className="movie-form-option" value="mystery">Mystery</option>
                                <option className="movie-form-option" value="drama">Drama</option>
                            </select>
                        </FormItem>

                        <FormItem label="Movie Language">
                            <select className="movie-form-select" name="language" value={this.state.value} onChange={(event)=>this.handleLangChange(event)} >            
                                <option className="movie-form-option" value="sinhala">Sinhala</option>
                                <option className="movie-form-option" value="english">English</option>
                                <option className="movie-form-option" value="french">French</option>
                                <option className="movie-form-option" value="german">German</option>
                                <option className="mo[vie-form-option" value="tamil">Tamil</option>
                            </select>
                        </FormItem>

                        <FormItem className="movie-form-row"
                            validateStatus={this.state.description.validateStatus}>
                        <TextArea 
                            placeholder="Enter Movie Description"
                            style = {{ fontSize: '16px' }} 
                            autosize={{ minRows: 3, maxRows: 6 }} 
                            name = "description"
                            value = {this.state.description.value}
                            onChange = {(event) => this.handleDescriptionChange(event, this.validateDescription)} />
                        </FormItem>

                        <FormItem className="movie-form-picker" label="Movie Start Date" name="startDate">
                        <DatePicker onChange={this.handleStartDateChange}/>
                        </FormItem>

                        <FormItem className="movie-form-picker" label="Movie End Date" name="endDate">
                        <DatePicker onChange={this.handleEndDateChange}/>
                        </FormItem>

                        <FormItem className="movie-form-picker" label="Movie Start Time" name="startTime">
                        <TimePicker onChange={this.handleStartTimeChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                        </FormItem>

                        <FormItem className="movie-form-picker" label="Movie End Time" name="endTime">
                        <TimePicker onChange={this.handleEndTimeChange}  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
                        </FormItem>
                     
                        <FormItem>
                            <Button
                            type="primary"
                            htmlType="submit"
                            disabled={this.isFormInvalid()}
                            >
                            Submit
                            </Button>
                        </FormItem>
                </Form>
                </Card>
                </div>    
            </div>
        );
    }
}

export default NewMovie;