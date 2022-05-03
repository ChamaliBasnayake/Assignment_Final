import React, { Component } from 'react'; 
import { getAllMovies, getUserVotedMovies, getUserCreatedMovies } from '../util/APIUtils';
 import Movie from './Movie';
// import { castVote } from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, Card } from 'antd';
import { MOVIE_LIST_SIZE } from '../constants';
import { withRouter } from 'react-router-dom'; 
import './MovieList.css';

class MovieList extends Component {     
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            currentVotes: [],
            isLoading: false
        };
        this.loadMovieList = this.loadMovieList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadMovieList(page = 0, size = MOVIE_LIST_SIZE) {
        let promise;
        if(this.props.username) {
            if(this.props.type === 'USER_CREATED_movieS') {
                promise = getUserCreatedMovies(this.props.username, page, size);
            } else if (this.props.type === 'USER_VOTED_movieS') {
                promise = getUserVotedMovies(this.props.username, page, size);                               
            }
        } else {
            promise = getAllMovies(page, size);
        }

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise            
        .then(response => {
            const movies = this.state.movies.slice();
            const currentVotes = this.state.currentVotes.slice();

            this.setState({
                movies: movies.concat(response.content),
                page: response.page,
                size: response.size,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last,
                currentVotes: currentVotes.concat(Array(response.content.length).fill(null)),
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
        
    }

    // componentDidMount() {
    //     this.loadmovieList();
    // }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                movies: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                currentVotes: [],
                isLoading: false
            });    
            // this.loadmovieList();
        }
    }

    handleLoadMore() {
        this.loadmovieList(this.state.page + 1);
    }

    handleVoteChange(event, movieIndex) {
        const currentVotes = this.state.currentVotes.slice();
        currentVotes[movieIndex] = event.target.value;

        this.setState({
            currentVotes: currentVotes
        });
    }


    // handleVoteSubmit(event, movieIndex) {
    //     event.preventDefault();
    //     if(!this.props.isAuthenticated) {
    //         this.props.history.push("/login");
    //         notification.info({
    //             message: 'movieing App',
    //             description: "Please login to vote.",          
    //         });
    //         return;
    //     }

    //     const movie = this.state.movies[movieIndex];
    //     const selectedChoice = this.state.currentVotes[movieIndex];

    //     const voteData = {
    //         movieId: movie.id,
    //         choiceId: selectedChoice
    //     };

    //     castVote(voteData)
    //     .then(response => {
    //         const movies = this.state.movies.slice();
    //         movies[movieIndex] = response;
    //         this.setState({
    //             movies: movies
    //         });        
    //     }).catch(error => {
    //         if(error.status === 401) {
    //             this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to vote');    
    //         } else {
    //             notification.error({
    //                 message: 'movieing App',
    //                 description: error.message || 'Sorry! Something went wrong. Please try again!'
    //             });                
    //         }
    //     });
    // }

    render() {
        const movieViews = [];
        this.state.movies.forEach((movie, movieIndex) => {
            movieViews.push(<Movie 
                key={movie.id} 
                movie={movie}
                currentVote={this.state.currentVotes[movieIndex]} 
                handleVoteChange={(event) => this.handleVoteChange(event, movieIndex)}
                handleVoteSubmit={(event) => this.handleVoteSubmit(event, movieIndex )} />)            
        });

        return (
            <div className="movies-container">
            
                {movieViews}
                {
                    !this.state.isLoading && this.state.movies.length === 0 ? (
                        <div className="no-movies-found">
                            <Card title={< div style= {{textAlign: "center"}} ></ div >} bordered={false} style={{color: "black", fontSize: "20px"}}>
                            <span>No movies Found</span>
                            </Card>  
                        </div>    
                    ): null
                }  
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-movies"> 
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }              
                {
                    this.state.isLoading ? 
                    <LoadingIndicator />: null                     
                }
            </div>
        );
    }
}

export default withRouter(MovieList);