import React, { Component } from 'react';
import { Button, Card } from 'antd';
import './Profile.css';
import ProfileService from '../../util/ProfileService';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            username: this.props.match.params.username,
            email:'',
            address: '',
            phone: '',
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount(){
        ProfileService.getProfileByUsername(this.state.username).then( (res) =>{
            let profile = res.data;
            this.setState({
                name: profile.name,
                username: profile.username,
                email: profile.email,
                address: profile.address,
                phone: profile.phone
            });
        });
    }

    updateProfile = (e) => {
        e.preventDefault();
        let profile = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone
        };
        console.log('profile => ' + JSON.stringify(profile));
        console.log('id => ' + JSON.stringify(this.state.username));
        ProfileService.updateProfile(profile, this.state.username).then( res => {
            this.props.history.push('/');
        });
    }
    
     changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    changeAddressHandler = (event) => {
        this.setState({address: event.target.value});
    }

    changePhoneHandler = (event) => {
        this.setState({phone: event.target.value});
    }

    cancel(){
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="new-movie-container">
            <div className="new-movie-content">
                        <Card title={< div style= {{textAlign: "center"}} > Update Profile </ div >} bordered={false} style={{color: "black", fontSize: "20px", width: "500px"}}>
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Username: </label>
                                            <input placeholder="Username" name="username" className="form-control" 
                                                value={this.state.username} onChange={this.changeUsernameHandler} disabled/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email" name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler} disabled/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Address: </label>
                                            <input placeholder="Address" name="address" className="form-control" 
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Phone Number: </label>
                                            <input placeholder="Phone" name="phone" className="form-control" 
                                                value={this.state.phone} onChange={this.changePhoneHandler}/>
                                        </div>

                                        <br/>
                                        <Button type="primary"  onClick={this.updateProfile}>Save</Button>
                                                &nbsp;
                                        <Button type="danger" onClick={this.cancel.bind(this)}>Cancel</Button>
                                    </form>
                                </Card>
                            </div>
                        </div>
        )
    }
}

export default Profile;