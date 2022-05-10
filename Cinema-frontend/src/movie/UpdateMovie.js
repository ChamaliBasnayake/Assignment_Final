import React, { Component } from 'react'
import MovieService from '../util/MovieService'
import { Button,DatePicker, TimePicker, Form, Input, Card } from 'antd'
import moment from 'moment';
              
const FormItem = Form.Item;
const { TextArea } = Input;

class UpdateMovie extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            category: '',
            language: '',
            description: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeLanguageHandler = this.changeLanguageHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
        this.changeStartTimeHandler = this.changeStartTimeHandler.bind(this);
        this.changeEndTimeHandler = this.changeEndTimeHandler.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
    }

    componentDidMount(){
        console.log(this.props.match.params.id)
        MovieService.getMovieById(this.state.id).then( (res) =>{
            let movie = res.data;
            this.setState({
                name: movie.name,
                category: movie.category,
                language: movie.language,
                description: movie.description,
                startDate: movie.startDate,
                endDate: movie.endDate,
                startTime: movie.startTime,
                endTime: movie.endTime
            });
        });
    }

    updateMovie = (e) => {
        e.preventDefault();
        let movie = {
            name: this.state.name,
            category: this.state.category,
            language: this.state.language,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        };
        console.log('movie => ' + JSON.stringify(movie));
        console.log('id => ' + JSON.stringify(this.state.id));
        MovieService.updateMovie(movie, this.state.id).then( res => {
            this.props.history.push('/');
        });
    }
    
     changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeCategoryHandler= (event) => {
        this.setState({category: event.target.value});
    }

    changeLanguageHandler= (event) => {
        this.setState({language: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeStartDateHandler(date, dateString) 
    {
        var event = new Date(date);
        let newStartDate = JSON.stringify(event)
        newStartDate = newStartDate.slice(1,11)
        this.setState({startDate: newStartDate});
    }

    changeEndDateHandler(date, dateString) 
    {   
        var event = new Date(date);
        let newEndDate = JSON.stringify(event)
        newEndDate = newEndDate.slice(1,11)
        this.setState({endDate: newEndDate});  
    }
    
    changeStartTimeHandler(time, timeString) 
    {
        var event = new Date(time);
        let newStartTime = event.toLocaleTimeString('it-IT')
        this.setState({startTime: newStartTime});   
    }

    changeEndTimeHandler(time, timeString) 
    {   
        var event = new Date(time);
        let newEndTime = event.toLocaleTimeString('it-IT')
        this.setState({endTime: newEndTime});   
    }

    cancel(){
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="new-movie-container">
            <div className="new-movie-content">
                        <Card title={< div style= {{textAlign: "center"}} > Update Movie </ div >} bordered={false} style={{color: "white", fontSize: "50px", width: "500px"}}>
                                <Form className="movie-form">
                                <FormItem>
                                    <Input 
                                        size="large"
                                        name="name"
                                        autoComplete="off"
                                        placeholder="Enter movie name"
                                        value={this.state.name} 
                                        onChange={this.changeNameHandler} />    
                                </FormItem>

                                <FormItem label="Movie Category">
                                    <select className="movie-form-select" name="category" value={this.state.value} onChange={this.changeCategoryHandler} >            
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
                                    <select className="movie-form-select" name="language" value={this.state.value} onChange={this.changeLanguageHandler} >            
                                        <option className="movie-form-option" value="sinhala">Sinhala</option>
                                        <option className="movie-form-option" value="english">English</option>
                                        <option className="movie-form-option" value="french">French</option>
                                        <option className="movie-form-option" value="german">German</option>
                                        <option className="mo[vie-form-option" value="tamil">Tamil</option>
                                    </select>
                                </FormItem>

                                <FormItem className="movie-form-row">
                                <TextArea 
                                    placeholder="Enter Movie Description"
                                    style = {{ fontSize: '16px' }} 
                                    autosize={{ minRows: 3, maxRows: 6 }} 
                                    name = "description"
                                    value = {this.state.description}
                                    onChange={this.changeDescriptionHandler} />
                                </FormItem>

                                <FormItem className="movie-form-picker" label="Movie Start Date" name="startDate">
                                <DatePicker onChange={this.changeStartDateHandler}/>
                                </FormItem>

                                <FormItem className="movie-form-picker" label="Movie End Date" name="endDate">
                                <DatePicker onChange={this.changeEndDateHandler}/>
                                </FormItem>

                                <FormItem className="movie-form-picker" label="Movie Start Time" name="startTime">
                                <TimePicker onChange={this.changeStartTimeHandler} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                                </FormItem>

                                <FormItem className="movie-form-picker" label="Movie End Time" name="endTime">
                                <TimePicker onChange={this.changeEndTimeHandler}  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
                                </FormItem>
                            
                                <FormItem>
                                <Button type="primary"  onClick={this.updateMovie}>Save</Button>
                                                &nbsp;
                                <Button type="danger" onClick={this.cancel.bind(this)}>Cancel</Button>
                                </FormItem>
                            </Form>
                        </Card>
                                   
                                </div>
                         </div> 
         ) }
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         id: this.props.match.params.id,
    //         name: "",
    //         category: "",
    //         language: "",
    //         description: "",
    //         startDate: "",
    //         endDate: "",
    //         startTime: "",
    //         endTime: ""
    //     }
        // this.changeNameHandler = this.changeNameHandler.bind(this);
        // this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        // this.changeLanguageHandler = this.changeLanguageHandler.bind(this);
        // this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        // this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        // this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
        // this.changeStartTimeHandler = this.changeStartTimeHandler.bind(this);
        // this.changeEndTimeHandler = this.changeEndTimeHandler.bind(this);
        // this.updateMovie = this.updateMovie.bind(this);
    }

    // componentDidMount(){
    //     MovieService.getMovieById(this.state.id).then( (res) =>{
    //         let movie = res.data;
    //         this.setState({
    //             name: movie.name,
    //             category: movie.category,
    //             language: movie.language,
    //             description: movie.description,
    //             startDate: movie.startDate,
    //             endDate: movie.endDate,
    //             startTime: movie.startTime,
    //             endTime: movie.endTime
    //         });
    //     });
    // }

    // updateMovie = (e) => {
    //     e.preventDefault();
    //     let movie = {name: this.state.name,
    //         category: this.state.category,
    //         language: this.state.language,
    //         description: this.state.description,
    //         startDate: this.state.startDate,
    //         endDate: this.state.endDate,
    //         startTime: this.state.startTime,
    //         endTime: this.state.endTime};
    //     console.log('movie => ' + JSON.stringify(movie));
    //     console.log('id => ' + JSON.stringify(this.state.id));
    //     MovieService.updateMovie(movie, this.state.id).then( res => {
    //         this.props.history.push('/movies');
    //     });
    // }
    
    // changeNameHandler= (event) => {
    //     this.setState({name: event.target.value});
    // }

    // changeCategoryHandler= (event) => {
    //     this.setState({category: event.target.value});
    // }

    // changeLanguageHandler= (event) => {
    //     this.setState({language: event.target.value});
    // }

    // changeDescriptionHandler= (event) => {
    //     this.setState({description: event.target.value});
    // }

    // changeStartDateHandler= (event) => {
    //     this.setState({startDate: event.target.value});
    // }

    // changeEndDateHandler= (event) => {
    //     this.setState({endDate: event.target.value});
    // }
    // changeStartTimeHandler= (event) => {
    //     this.setState({startTime: event.target.value});
    // }

    // changeEndTimeHandler= (event) => {
    //     this.setState({endTime: event.target.value});
    // }

    // cancel(){
    //     this.props.history.push('/movies');
    // }

    // render() {
    //     return (
    //         <div>
    //             <br></br>
    //                <div className = "container">
    //                     <div className = "row">
    //                         <div className = "card col-md-6 offset-md-3 offset-md-3">
    //                             <div className = "card-body">
    //                             <Card title={< div style= {{textAlign: "center"}} > Update Movie </ div >} bordered={false} style={{color: "white", fontSize: "50px"}}>
    //                             <Form onSubmit={this.updateMovie} className="movie-form">
    //                                 <FormItem validateStatus={this.state.name.validateStatus} >
    //                                     <Input 
    //                                         size="large"
    //                                         name="name"
    //                                         autoComplete="off"
    //                                         placeholder="Enter movie name"
    //                                         value={this.state.name} 
    //                                         onChange={(event) => this.changeNameHandler(event, this.validateName)} />    
    //                                 </FormItem>

    //                                 <FormItem label="Movie Category">
    //                                     <select className="movie-form-select" name="category" value={this.state.value} onChange={(event)=>this.changeCategoryHandler(event)} >            
    //                                         <option className="movie-form-option" value="horror">Horror</option>
    //                                         <option className="movie-form-option" value="romaance">Romance</option>
    //                                         <option className="movie-form-option" value="crime">Crime</option>
    //                                         <option className="movie-form-option" value="fantasy">Fantasy</option>
    //                                         <option className="movie-form-option" value="thriller">Thriller</option>
    //                                         <option className="movie-form-option" value="comedy">Comedy</option>
    //                                         <option className="movie-form-option" value="mystery">Mystery</option>
    //                                         <option className="movie-form-option" value="drama">Drama</option>
    //                                     </select>
    //                                 </FormItem>

    //                                 <FormItem label="Movie Language">
    //                                     <select className="movie-form-select" name="language" value={this.state.value} onChange={(event)=>this.changeLanguageHandler(event)} >            
    //                                         <option className="movie-form-option" value="sinhala">Sinhala</option>
    //                                         <option className="movie-form-option" value="english">English</option>
    //                                         <option className="movie-form-option" value="french">French</option>
    //                                         <option className="movie-form-option" value="german">German</option>
    //                                         <option className="mo[vie-form-option" value="tamil">Tamil</option>
    //                                     </select>
    //                                 </FormItem>

    //                                 <FormItem className="movie-form-row"
    //                                     validateStatus={this.state.description.validateStatus}>
    //                                 <TextArea 
    //                                     placeholder="Enter Movie Description"
    //                                     style = {{ fontSize: '16px' }} 
    //                                     autosize={{ minRows: 3, maxRows: 6 }} 
    //                                     name = "description"
    //                                     value = {this.state.description.value}
    //                                     onChange = {(event) => this.changeDescriptionHandler(event, this.validateDescription)} />
    //                                 </FormItem>

    //                                 <FormItem className="movie-form-picker" label="Movie Start Date" name="startDate">
    //                                 <DatePicker onChange={this.changeStartDateHandler}/>
    //                                 </FormItem>

    //                                 <FormItem className="movie-form-picker" label="Movie End Date" name="endDate">
    //                                 <DatePicker onChange={this.changeEndDateHandler}/>
    //                                 </FormItem>

    //                                 <FormItem className="movie-form-picker" label="Movie Start Time" name="startTime">
    //                                 <TimePicker onChange={this.changeStartTimeHandler} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
    //                                 </FormItem>

    //                                 <FormItem className="movie-form-picker" label="Movie End Time" name="endTime">
    //                                 <TimePicker onChange={this.changeEndTimeHandler}  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
    //                                 </FormItem>
                                
    //                                 <FormItem>
    //                                     <Button
    //                                     type="primary"
    //                                     htmlType="submit"
    //                                     >
    //                                     Submit
    //                                     </Button>
    //                                 </FormItem>

    //                                 <FormItem>
    //                                     <Button
    //                                     type="primary"
    //                                     htmlType="submit"
    //                                     >
    //                                     Cancel
    //                                     </Button>
    //                                 </FormItem>
    //                             </Form>
    //                             </Card>
    //                                 <form>
    //                                     <div className = "form-group">
    //                                         <label> First Name: </label>
    //                                         <input placeholder="First Name" name="firstName" className="form-control" 
    //                                             value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
    //                                     </div>
    //                                     <div className = "form-group">
    //                                         <label> Last Name: </label>
    //                                         <input placeholder="Last Name" name="lastName" className="form-control" 
    //                                             value={this.state.lastName} onChange={this.changeLastNameHandler}/>
    //                                     </div>
    //                                     <div className = "form-group">
    //                                         <label> Email Id: </label>
    //                                         <input placeholder="Email Address" name="emailId" className="form-control" 
    //                                             value={this.state.emailId} onChange={this.changeEmailHandler}/>
    //                                     </div>

    //                                     <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
    //                                     <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
    //                                 </form>
    //                             </div>
    //                         </div>
    //                     </div>

    //                </div>
    //         </div>
    //     )
    // }
// }

export default UpdateMovie