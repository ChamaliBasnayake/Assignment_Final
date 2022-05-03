package com.springboot.cinema.controller;

import com.springboot.cinema.model.Movie;
import com.springboot.cinema.payload.ApiResponse;
import com.springboot.cinema.payload.MovieRequest;
import com.springboot.cinema.payload.MovieResponse;
import com.springboot.cinema.payload.PagedResponse;
import com.springboot.cinema.repository.MovieRepository;
import com.springboot.cinema.repository.UserRepository;
import com.springboot.cinema.security.CurrentUser;
import com.springboot.cinema.security.UserPrincipal;
import com.springboot.cinema.service.MovieService;
import com.springboot.cinema.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

//    @Autowired
//    private VoteRepository voteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieService movieService;

    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

//    @GetMapping
//    public PagedResponse<MovieResponse> getPolls(@CurrentUser UserPrincipal currentUser,
//                                                 @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
//                                                 @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
//        return movieService.getAllMovies(currentUser, page, size);
//    }

    @PostMapping
    public ResponseEntity<Movie> createTutorial(@RequestBody Movie movie) {
        try {
            Movie _movie = movieRepository
                    .save(new Movie(movie.getName()));
            return new ResponseEntity<>(_movie, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

////    @PostMapping
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<?> createMovie(@Valid @RequestBody MovieRequest movieRequest) {
//        Movie movie = movieService.createMovie(movieRequest);
//
//        URI location = ServletUriComponentsBuilder
//                .fromCurrentRequest().path("/{movieId}")
//                .buildAndExpand(movie.getId()).toUri();
//
//        return ResponseEntity.created(location)
//                .body(new ApiResponse(true, "Movie Added Successfully"));
//    }

//    @GetMapping("/{pollId}")
//    public PollResponse getPollById(@CurrentUser UserPrincipal currentUser,
//                                    @PathVariable Long pollId) {
//        return pollService.getPollById(pollId, currentUser);
//    }
//
//    @PostMapping("/{pollId}/votes")
//    @PreAuthorize("hasRole('USER')")
//    public PollResponse castVote(@CurrentUser UserPrincipal currentUser,
//                         @PathVariable Long pollId,
//                         @Valid @RequestBody VoteRequest voteRequest) {
//        return pollService.castVoteAndGetUpdatedPoll(pollId, voteRequest, currentUser);
//    }

}
