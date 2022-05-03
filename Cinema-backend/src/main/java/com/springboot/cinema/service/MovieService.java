package com.springboot.cinema.service;

import com.springboot.cinema.exception.BadRequestException;
import com.springboot.cinema.exception.ResourceNotFoundException;
import com.springboot.cinema.model.Movie;
import com.springboot.cinema.model.User;
import com.springboot.cinema.payload.MovieRequest;
import com.springboot.cinema.payload.MovieResponse;
import com.springboot.cinema.payload.PagedResponse;
import com.springboot.cinema.repository.MovieRepository;
import com.springboot.cinema.repository.UserRepository;
import com.springboot.cinema.security.UserPrincipal;
import com.springboot.cinema.util.AppConstants;
import org.apache.tomcat.jni.Poll;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

//    @Autowired
//    private VoteRepository voteRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(MovieService.class);

//    public PagedResponse<MovieResponse> getAllMovies(UserPrincipal currentUser, int page, int size) {
//        validatePageNumberAndSize(page, size);
//
//        // Retrieve Movies
//        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
//        Page<Movie> movies = movieRepository.findAll(pageable);
//
//        if(movies.getNumberOfElements() == 0) {
//            return new PagedResponse<>(Collections.emptyList(), movies.getNumber(),
//                    movies.getSize(), movies.getTotalElements(), movies.getTotalPages(), movies.isLast());
//        }
//
//        return new PagedResponse<>(movieResponses, movies.getNumber(),
//                movies.getSize(), movies.getTotalElements(), movies.getTotalPages(), movies.isLast());
//    }
//
//    public PagedResponse<MovieResponse> getPollsCreatedBy(String username, UserPrincipal currentUser, int page, int size) {
//        validatePageNumberAndSize(page, size);
//
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
//
//        // Retrieve all polls created by the given username
//        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
//        Page<Movie> polls = pollRepository.findByCreatedBy(user.getId(), pageable);
//
//        if (polls.getNumberOfElements() == 0) {
//            return new PagedResponse<>(Collections.emptyList(), polls.getNumber(),
//                    polls.getSize(), polls.getTotalElements(), polls.getTotalPages(), polls.isLast());
//        }
//
//        // Map Polls to PollResponses containing vote counts and poll creator details
//        List<Long> pollIds = polls.map(Poll::getId).getContent();
//        Map<Long, Long> choiceVoteCountMap = getChoiceVoteCountMap(pollIds);
//        Map<Long, Long> pollUserVoteMap = getPollUserVoteMap(currentUser, pollIds);
//
//        List<PollResponse> pollResponses = polls.map(poll -> {
//            return ModelMapper.mapPollToPollResponse(poll,
//                    choiceVoteCountMap,
//                    user,
//                    pollUserVoteMap == null ? null : pollUserVoteMap.getOrDefault(poll.getId(), null));
//        }).getContent();
//
//        return new PagedResponse<>(pollResponses, polls.getNumber(),
//                polls.getSize(), polls.getTotalElements(), polls.getTotalPages(), polls.isLast());
//    }
//
//    public PagedResponse<PollResponse> getPollsVotedBy(String username, UserPrincipal currentUser, int page, int size) {
//        validatePageNumberAndSize(page, size);
//
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
//
//        // Retrieve all pollIds in which the given username has voted
//        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
//        Page<Long> userVotedPollIds = voteRepository.findVotedPollIdsByUserId(user.getId(), pageable);
//
//        if (userVotedPollIds.getNumberOfElements() == 0) {
//            return new PagedResponse<>(Collections.emptyList(), userVotedPollIds.getNumber(),
//                    userVotedPollIds.getSize(), userVotedPollIds.getTotalElements(),
//                    userVotedPollIds.getTotalPages(), userVotedPollIds.isLast());
//        }
//
//        // Retrieve all poll details from the voted pollIds.
//        List<Long> pollIds = userVotedPollIds.getContent();
//
//        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
//        List<Poll> polls = pollRepository.findByIdIn(pollIds, sort);
//
//        // Map Polls to PollResponses containing vote counts and poll creator details
//        Map<Long, Long> choiceVoteCountMap = getChoiceVoteCountMap(pollIds);
//        Map<Long, Long> pollUserVoteMap = getPollUserVoteMap(currentUser, pollIds);
//        Map<Long, User> creatorMap = getPollCreatorMap(polls);
//
//        List<PollResponse> pollResponses = polls.stream().map(poll -> {
//            return ModelMapper.mapPollToPollResponse(poll,
//                    choiceVoteCountMap,
//                    creatorMap.get(poll.getCreatedBy()),
//                    pollUserVoteMap == null ? null : pollUserVoteMap.getOrDefault(poll.getId(), null));
//        }).collect(Collectors.toList());
//
//        return new PagedResponse<>(movieResponses, userVotedPollIds.getNumber(), userVotedPollIds.getSize(), userVotedPollIds.getTotalElements(), userVotedPollIds.getTotalPages(), userVotedPollIds.isLast());
//    }


    public Movie createMovie(MovieRequest cinemaRequest) {
        Movie movie = new Movie();
        movie.setName(cinemaRequest.getName());

        return movieRepository.save(movie);
    }




    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }


//    Map<Long, User> getMovieCreatorMap(List<Movie> movies) {
//        // Get Movie Creator details of the given list of movies
//        List<Long> creatorIds = movies.stream()
//                .map(Movie::getCreatedBy)
//                .distinct()
//                .collect(Collectors.toList());
//
//        List<User> creators = userRepository.findByIdIn(creatorIds);
//        Map<Long, User> creatorMap = creators.stream()
//                .collect(Collectors.toMap(User::getId, Function.identity()));
//
//        return creatorMap;
//    }
}
