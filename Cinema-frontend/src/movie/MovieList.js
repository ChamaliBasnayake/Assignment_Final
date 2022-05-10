import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import MovieService from '../util/MovieService'
import { Card, Button } from 'antd'

class MovieList extends Component {  
    constructor(props) {
        super(props)

        this.state = {
                movies: []
        }
        this.editMovie = this.editMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
    }

    

    deleteMovie(id){
        MovieService.deleteMovie(id).then( res => {
            this.setState({movies: this.state.movies.filter(movie => movie.id !== id)});
        });
        window.location.reload(false);
    }

    editMovie(id){
        this.props.history.push(`/movie/update/${id}`);
    }

    componentDidMount(){
        MovieService.getAllMovies().then((res) => {
            this.setState({ movies: res.data});
        });
    }


    render() {
    console.log(this.state.movies);

        return (
            <div>
                 <br></br>
                 <div className = "row" >
                 <Card title={< div style= {{textAlign: "center"}} > Movie Details </ div >} bordered={false} style={{color: "black"}}> 
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Movie Name</th>
                                    <th> Movie Category</th>
                                    <th> Movie Language</th>
                                    <th> Movie Description</th>
                                    <th> Movie Start Date</th>
                                    <th> Movie End Date</th>
                                    <th> Movie Start Time</th>
                                    <th> Movie End Time</th>
                                    <th style={{width: "200px"}}> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.movies.map(
                                        movie => 
                                        <tr key = {movie.id}>
                                             <td> {movie.name} </td>   
                                             <td> {movie.category}</td>
                                             <td> {movie.language}</td>
                                             <td> {movie.description} </td>   
                                             <td> {movie.startDate}</td>
                                             <td> {movie.endDate}</td>
                                             <td> {movie.startTime}</td>
                                             <td> {movie.endTime}</td>
                                             <td>
                                                <Button type="primary" onClick={ () => this.editMovie(movie.id)}>Update</Button>
                                                &nbsp;
                                                <Button type="danger" onClick={ () => this.deleteMovie(movie.id)}>Delete</Button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        </Card>
                 </div>

            </div>
        )
    }
}

export default MovieList