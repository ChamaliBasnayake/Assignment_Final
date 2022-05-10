package com.springboot.cinema.controller;

import com.springboot.cinema.exception.ResourceNotFoundException;
import com.springboot.cinema.model.Movie;
import com.springboot.cinema.repository.MovieRepository;
import com.springboot.cinema.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @PostMapping
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        try {
            Movie _movie = movieRepository
                    .save(new Movie(movie.getName(),movie.getCategory(), movie.getLanguage(), movie.getDescription(),movie.getStartDate(),movie.getEndDate(), movie.getStartTime(), movie.getEndTime()));
            return new ResponseEntity<>(_movie, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    // get all movies
    @GetMapping
    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }

    // get movie by id rest api
    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not exist with id :" + id));
        return ResponseEntity.ok(movie);
    }

    // update movie rest api

    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movieDetails){
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not exist with id :" + id));

        movie.setName(movieDetails.getName());
        movie.setCategory(movieDetails.getCategory());
        movie.setLanguage(movieDetails.getLanguage());
        movie.setDescription(movieDetails.getDescription());
        movie.setStartDate(movieDetails.getStartDate());
        movie.setEndDate(movieDetails.getEndDate());
        movie.setStartTime(movieDetails.getStartTime());
        movie.setEndTime(movieDetails.getEndTime());

        Movie updatedMovie = movieRepository.save(movie);
        return ResponseEntity.ok(updatedMovie);
    }

    // delete movie rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteMovie(@PathVariable Long id){
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not exist with id :" + id));

        movieRepository.delete(movie);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
