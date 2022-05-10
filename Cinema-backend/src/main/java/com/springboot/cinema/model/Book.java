package com.springboot.cinema.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "bookings")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String name;

    @NotBlank
    private String date;

    @NotBlank
    private String odcSeats;
    @NotBlank
    private String balconySeats;
    @NotBlank
    private String superbalconySeats;


    public Book() {
    }

    public Book(String name, String date, String odcSeats, String balconySeats, String superbalconySeats) {

        this.name = name;
        this.date = date;
        this.odcSeats = odcSeats;
        this.balconySeats = balconySeats;
        this.superbalconySeats = superbalconySeats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getOdcSeats() {
        return odcSeats;
    }

    public void setOdcSeats(String odcSeats) {
        this.odcSeats = odcSeats;
    }

    public String getBalconySeats() {
        return balconySeats;
    }

    public void setBalconySeats(String balconySeats) {
        this.balconySeats = balconySeats;
    }

    public String getSuperbalconySeats() {
        return superbalconySeats;
    }

    public void setSuperbalconySeats(String superbalconySeats) {
        this.superbalconySeats = superbalconySeats;
    }
}
