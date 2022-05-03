import React, { Component } from 'react';
import { getUserProfile } from '../../util/APIUtils';
import LoadingIndicator  from '../../common/LoadingIndicator';
import { Card, Form, Input } from 'antd';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';

const FormItem = Form.Item;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            this.setState({
                user: response,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }
      
    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                            <Card title={< div style= {{textAlign: "center"}} > User Profile </ div >} bordered={false} style={{color: "black", fontSize: "50px"}}> 
                            <FormItem>
                            <Input 
                                size="large"
                                name="username" 
                                autoComplete="off"
                                value={this.state.user.name}
                                onChange={(event) => this.handleInputChange(event, this.validatePhone)} />    
                        </FormItem>
                                    
                                    
                                    
                                    <div className="full-name">{this.state.user.name}</div>
                                    <div className="full-name">@{this.state.user.username}</div>
                                    <div className="full-name">{this.state.user.address}</div>
                                    <div className="full-name">{this.state.user.phone}</div>
                            </Card>
                            </div>
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default Profile;