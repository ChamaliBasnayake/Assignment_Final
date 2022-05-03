import React, { Component } from 'react';
import { createMovie } from '../util/APIUtils';
import './NewMovie.css';  
import { Form, Input, Button, notification, Card } from 'antd';
// const Option = Select.Option;
const FormItem = Form.Item;
// const { TextArea } = Input

class NewMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            category: {
                value: 'crime'
            }
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
    }

    handleSubmit(event) {
        event.preventDefault();
        const movieData = {
            name: this.state.name.value,
            category: this.state.category.value
        };
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
                errorMsg: 'Email may not be empty'                
            }
        }else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    handleChange(event) 
    {   
         this.setState({value: event.target.value});  
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
                        <FormItem 
                            label="Movie Name"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input 
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Enter movie name"
                                value={this.state.name.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>

                        <FormItem label="Movie Category">
                            <select className="movie-form-select" name="category" value={this.state.value} onChange={this.handleChange} >            
                                <option className="movie-form-option" value="horror">Horror</option>
                                <option className="movie-form-option" value="romaance">Romance</option>
                                <option className="movie-form-option" value="crime">Crime</option>
                                <option className="movie-form-option" value="fantasy">Fantasy</option>
                                <option className="movie-form-option" value="thriller">Thriller</option>
                                <option className="movie-form-option" value="comedy">Comedy</option>
                                <option className="movie-form-option" value="mystery">Mystery</option>
                                <option className="movie-form-option" value="drama">Drama</option>
                            </select>
                            {/* <Input 
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Enter movie name"
                                value={this.state.name.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />     */}
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