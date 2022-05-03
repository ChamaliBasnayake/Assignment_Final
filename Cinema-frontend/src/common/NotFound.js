import React, { Component } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import { Button, Card } from 'antd';

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                 <Card title={< div style= {{textAlign: "center", fontSize: "80px"}} > 404 </ div >} bordered={false} style={{color: "white", fontSize: "50px"}}>

                <div className="desc">
                    The Page you're looking for was not found.
                </div>
                <Link to="/"><Button className="go-back-btn" type="primary" size="large">Go Back</Button></Link>
                </Card>    
            </div>
        );
    }
}

export default NotFound;