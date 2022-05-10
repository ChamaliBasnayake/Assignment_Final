package com.springboot.cinema.controller;

import com.springboot.cinema.model.Reserve;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

@RequestMapping ("/api/orders")
@RestController
public class ReserveController {

    final KafkaTemplate kafkaTemplate;

    Logger logger = LoggerFactory.getLogger(ReserveController.class);

    public ReserveController(KafkaTemplate kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @PostMapping
    public String sentMessage(@RequestBody Reserve reserve) {
        this.kafkaTemplate.send("transaction-1", new Reserve(reserve.getId(),reserve.getCustomerName(), reserve.getPhone(),reserve.getMovieName(),reserve.getDate(),reserve.getOdcSeats(),reserve.getBalconySeats(),reserve.getSuperBalconySeats(),reserve.getPayment()));

        return "Order details sent successfully";
    }

    @GetMapping
    @KafkaListener(topics = "transaction-1")
    public void listener(@Payload Reserve reserve, ConsumerRecord<String, Reserve> cr) {
        logger.info("Topic [transaction-1] Received message from {} with {} PLN ", reserve.getId(),reserve.getCustomerName(), reserve.getPhone(),reserve.getMovieName(),reserve.getDate(),reserve.getOdcSeats(),reserve.getBalconySeats(),reserve.getSuperBalconySeats(),reserve.getPayment());
        logger.info(cr.toString());

//        Map<String,Object> result = new ObjectMapper().readValue(, HashMap.class);
//        return result;

    }


//
//    @GetMapping()
//    public ResponseEntity<Reserve> sendMessage(@RequestBody Reserve reserve) {
//        producer.orderStatusChangeTopic(reserve);
//        dataResponse = new DataResponse("msg sent successfully",true);
//        return new ResponseEntity<>(dataResponse,
//                HttpStatus.OK);
//    }
//
//    public String receiveMessage(@RequestBody Reserve reserve) {
//        this.kafkaTemplate.send("transaction-1", new Reserve(reserve.getId(),reserve.getCustomerName(), reserve.getPhone(),reserve.getMovieName(),reserve.getDate(),reserve.getOdcSeats(),reserve.getBalconySeats(),reserve.getSuperBalconySeats(),reserve.getPayment()));
//
//        return "Sent";
//    }
}