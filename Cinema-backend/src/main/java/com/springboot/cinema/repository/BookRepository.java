package com.springboot.cinema.repository;

import com.springboot.cinema.model.Book;
import com.springboot.cinema.model.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findByNameAndDate(String name, String date);
}
