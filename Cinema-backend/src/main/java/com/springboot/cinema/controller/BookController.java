package com.springboot.cinema.controller;

import com.springboot.cinema.exception.ResourceNotFoundException;
import com.springboot.cinema.model.Book;
import com.springboot.cinema.repository.BookRepository;
import com.springboot.cinema.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookController {

    public int newODC;
    public int newBalcony;
    public int newSuperBalcony;

    public int oldODC;
    public int oldBalcony;
    public int oldSuperBalcony;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(BookController.class);

    // get all orders
    @GetMapping
    public List<Book> getSeatDetails(){
        return bookRepository.findAll();
    }

    // update order rest api

    @PutMapping("/{name}/{date}")
    public ResponseEntity<Book> updateSeatCount(@PathVariable String name,@PathVariable String date, @RequestBody Book seatDetails){
        System.out.println(name + " "+date);
        System.out.println(seatDetails);
        Book book = bookRepository.findByNameAndDate(name, date)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not exist with id :" + name));

        oldODC = Integer.parseInt(book.getOdcSeats());
        oldBalcony = Integer.parseInt(book.getBalconySeats());
        oldSuperBalcony = Integer.parseInt(book.getSuperbalconySeats());

        newODC  = oldODC - Integer.parseInt(seatDetails.getOdcSeats());
        newBalcony  = oldBalcony - Integer.parseInt(seatDetails.getBalconySeats());
        newSuperBalcony  = oldSuperBalcony - Integer.parseInt(seatDetails.getSuperbalconySeats());

        book.setOdcSeats(String.valueOf(newODC));
        book.setBalconySeats(String.valueOf(newBalcony));
        book.setSuperbalconySeats(String.valueOf(newSuperBalcony));

        Book updatedBooking = bookRepository.save(book);
        System.out.println(updatedBooking);
        return ResponseEntity.ok(updatedBooking);
    }
}
