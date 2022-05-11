package com.springboot.cinema.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.cinema.model.Reserve;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

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
        this.kafkaTemplate.send("transaction-1", new Reserve(reserve.getId(),reserve.getCustomerName(), reserve.getPhone(),reserve.getMovieName(),reserve.getDate(),reserve.getOdcSeats(),reserve.getBalconySeats(),reserve.getSuperbalconySeats(),reserve.getPayment()));

        return "Order details sent successfully";
    }

    @KafkaListener(topics = "transaction-1")
    public void listener(@Payload Reserve reserve, ConsumerRecord<String, Reserve> cr) {

        logger.info("Topic [transaction-1] Received message from {} with {} PLN ", reserve.getId(), reserve.getCustomerName(), reserve.getPhone(), reserve.getMovieName(), reserve.getDate(), reserve.getOdcSeats(), reserve.getBalconySeats(), reserve.getSuperbalconySeats(), reserve.getPayment());
        logger.info(cr.toString());

        try {
            Reserve order = new Reserve(reserve.getId(), reserve.getCustomerName(), reserve.getPhone(), reserve.getMovieName(), reserve.getDate(), reserve.getOdcSeats(), reserve.getBalconySeats(), reserve.getSuperbalconySeats(), reserve.getPayment());

            ObjectMapper mapper = new ObjectMapper();

            mapper.writeValue(Paths.get("/home/chamali/Desktop/Assignment/Assignment_Final/Cinema-backend/src/main/java/com/springboot/cinema/controller/data.json").toFile(), order);
            System.out.println(order);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @GetMapping()
    public Reserve restoreFromFile() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Reserve restoredObj = objectMapper.readValue(new File("/home/chamali/Desktop/Assignment/Assignment_Final/Cinema-backend/src/main/java/com/springboot/cinema/controller/data.json"), Reserve.class);
        return restoredObj;

    }
}