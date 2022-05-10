package com.springboot.cinema;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.kafka.annotation.EnableKafka;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EnableKafka
public class CinemaApplication {

	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	public static void main(String[] args) {
		SpringApplication.run(CinemaApplication.class, args);
	}
}
