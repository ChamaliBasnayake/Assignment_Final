package com.springboot.cinema.repository;

import com.springboot.cinema.model.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<Movie> findById(Long movieId);

//    Page<Movie> findByCreatedBy(Long userId, Pageable pageable);
//
//    long countByCreatedBy(Long userId);
//
//    List<Movie> findByIdIn(List<Long> pollIds);
//
//    List<Movie> findByIdIn(List<Long> pollIds, Sort sort);
}
