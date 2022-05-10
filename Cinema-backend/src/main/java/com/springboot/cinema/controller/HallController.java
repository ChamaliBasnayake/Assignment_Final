package com.springboot.cinema.controller;

import com.springboot.cinema.exception.ResourceNotFoundException;
import com.springboot.cinema.model.Hall;
import com.springboot.cinema.repository.HallRepository;
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
@RequestMapping("/api/halls")
public class HallController {

    @Autowired
    private HallRepository hallRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(HallController.class);

    @PostMapping
    public ResponseEntity<Hall> createHall(@RequestBody Hall hall) {
        try {
            Hall _hall = hallRepository
                    .save(new Hall(hall.getName(),hall.getSeatCount(),hall.getPricePerSeat()));
            return new ResponseEntity<>(_hall, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    // get all halls
    @GetMapping
    public List<Hall> getAllHalls(){
        return hallRepository.findAll();
    }

    // get hall by id rest api
    @GetMapping("/{id}")
    public ResponseEntity<Hall> getHallById(@PathVariable Long id) {
        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hall not exist with id :" + id));
        return ResponseEntity.ok(hall);
    }

    // update hall rest api

    @PutMapping("/{id}")
    public ResponseEntity<Hall> updateHall(@PathVariable Long id, @RequestBody Hall hallDetails){
        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hall not exist with id :" + id));

        hall.setName(hallDetails.getName());
        hall.setSeatCount(hallDetails.getSeatCount());
        hall.setPricePerSeat(hallDetails.getPricePerSeat());

        Hall updatedHall = hallRepository.save(hall);
        return ResponseEntity.ok(updatedHall);
    }

    // delete hall rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteHall(@PathVariable Long id){
        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hall not exist with id :" + id));

        hallRepository.delete(hall);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
