import React, { Component } from 'react';
import './Movie.css';
import { Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';

import { Radio, Button } from 'antd';
const RadioGroup = Radio.Group;

class Movie extends Component {
    calculatePercentage = (choice) => {
        if(this.props.movie.totalVotes === 0) {
            return 0;
        }
        return (choice.voteCount*100)/(this.props.movie.totalVotes);
    };

    isSelected = (choice) => {
        return this.props.movie.selectedChoice === choice.id;
    }

    getWinningChoice = () => {
        return this.props.movie.choices.reduce((prevChoice, currentChoice) => 
            currentChoice.voteCount > prevChoice.voteCount ? currentChoice : prevChoice, 
            {voteCount: -Infinity}
        );
    }

    getTimeRemaining = (movie) => {
        const expirationTime = new Date(movie.expirationDateTime).getTime();
        const currentTime = new Date().getTime();
    
        var difference_ms = expirationTime - currentTime;
        var seconds = Math.floor( (difference_ms/1000) % 60 );
        var minutes = Math.floor( (difference_ms/1000/60) % 60 );
        var hours = Math.floor( (difference_ms/(1000*60*60)) % 24 );
        var days = Math.floor( difference_ms/(1000*60*60*24) );
    
        let timeRemaining;
    
        if(days > 0) {
            timeRemaining = days + " days left";
        } else if (hours > 0) {
            timeRemaining = hours + " hours left";
        } else if (minutes > 0) {
            timeRemaining = minutes + " minutes left";
        } else if(seconds > 0) {
            timeRemaining = seconds + " seconds left";
        } else {
            timeRemaining = "less than a second left";
        }
        
        return timeRemaining;
    }

    render() {
        const movieChoices = [];
        if(this.props.movie.selectedChoice || this.props.movie.expired) {
            const winningChoice = this.props.movie.expired ? this.getWinningChoice() : null;

            this.props.movie.choices.forEach(choice => {
                movieChoices.push(<CompletedOrVotedMovieChoice 
                    key={choice.id} 
                    choice={choice}
                    isWinner={winningChoice && choice.id === winningChoice.id}
                    isSelected={this.isSelected(choice)}
                    percentVote={this.calculatePercentage(choice)} 
                />);
            });                
        } else {
            this.props.movie.choices.forEach(choice => {
                movieChoices.push(<Radio className="movie-choice-radio" key={choice.id} value={choice.id}>{choice.text}</Radio>)
            })    
        }        
        return (
            <div className="movie-content">
                <div className="movie-header">
                    <div className="movie-creator-info">
                        <Link className="creator-link" to={`/users/${this.props.movie.createdBy.username}`}>
                            <Avatar className="movie-creator-avatar" 
                                style={{ backgroundColor: getAvatarColor(this.props.movie.createdBy.name)}} >
                                {this.props.movie.createdBy.name[0].toUpperCase()}
                            </Avatar>
                            <span className="movie-creator-name">
                                {this.props.movie.createdBy.name}
                            </span>
                            <span className="movie-creator-username">
                                @{this.props.movie.createdBy.username}
                            </span>
                            <span className="movie-creation-date">
                                {formatDateTime(this.props.movie.creationDateTime)}
                            </span>
                        </Link>
                    </div>
                    <div className="movie-question">
                        {this.props.movie.question}
                    </div>
                </div>
                <div className="movie-choices">
                    <RadioGroup 
                        className="movie-choice-radio-group" 
                        onChange={this.props.handleVoteChange} 
                        value={this.props.currentVote}>
                        { movieChoices }
                    </RadioGroup>
                </div>
                <div className="movie-footer">
                    { 
                        !(this.props.movie.selectedChoice || this.props.movie.expired) ?
                        (<Button className="vote-button" disabled={!this.props.currentVote} onClick={this.props.handleVoteSubmit}>Vote</Button>) : null 
                    }
                    <span className="total-votes">{this.props.movie.totalVotes} votes</span>
                    <span className="separator">•</span>
                    <span className="time-left">
                        {
                            this.props.movie.expired ? "Final results" :
                            this.getTimeRemaining(this.props.movie)
                        }
                    </span>
                </div>
            </div>
        );
    }
}

function CompletedOrVotedMovieChoice(props) {
    return (
        <div className="cv-movie-choice">
            <span className="cv-movie-choice-details">
                <span className="cv-choice-percentage">
                    {Math.round(props.percentVote * 100) / 100}%
                </span>            
                <span className="cv-choice-text">
                    {props.choice.text}
                </span>
                {
                    props.isSelected ? (
                    <Icon
                        className="selected-choice-icon"
                        type="check-circle-o"
                    /> ): null
                }    
            </span>
            <span className={props.isWinner ? 'cv-choice-percent-chart winner': 'cv-choice-percent-chart'} 
                style={{width: props.percentVote + '%' }}>
            </span>
        </div>
    );
}


export default Movie;