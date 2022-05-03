import React, { Component } from 'react';
import './ServerError.css';
import { Link } from 'react-router-dom';
import { Button, Card } from 'antd';

class ServerError extends Component {
    render() {
        return (
            <div className="server-error-page">
                <Card title={<div style= {{textAlign: "center", fontSize: "80px"}}> 500 </div>} bordered={false} style={{color: "white", fontSize: "50px"}}>

                <div className="server-error-desc">
                    Oops! Something went wrong at our Server. Why don't you go back?
                </div>
                <Link to="/"><Button className="server-error-go-back-btn" type="primary" size="large">Go Back</Button></Link>
                </Card> 
            </div>
        );
    }
}

export default ServerError;