package com.springboot.cinema.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Reserve {

            private String id;
            private String customerName;
            private String phone;
            private String movieName;
            private String date;

            private String odcSeats;

            private String balconySeats;
            private String superBalconySeats;
            private String payment;

            public Reserve(
                    @JsonProperty String id,
                    @JsonProperty String customerName,
                    @JsonProperty String phone,
                    @JsonProperty String movieName,
                    @JsonProperty String date,
                    @JsonProperty String odcSeats,
                    @JsonProperty String balconySeats,
                    @JsonProperty String superBalconySeats,
                    @JsonProperty String payment)
            {
                this.id = id;
                this.customerName = customerName;
                this.phone = phone;
                this.movieName = movieName;
                this.date = date;
                this.odcSeats = odcSeats;
                this.balconySeats = balconySeats;
                this.superBalconySeats = superBalconySeats;
                this.payment = payment;
            }

            public Reserve() {
            }

            public String getId() {
                return id;
            }

            public void setId(String id) {
                this.id = id;
            }

            public String getCustomerName() {
                return customerName;
            }

            public void setCustomerName(String customerName) {
                this.customerName = customerName;
            }

            public String getPhone() {
                return phone;
            }

            public void setPhone(String phone) {
                this.phone = phone;
            }

            public String getMovieName() {
                return movieName;
            }

            public void setMovieName(String movieName) {
                this.movieName = movieName;
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

            public String getSuperBalconySeats() {
                return superBalconySeats;
            }

            public void setSuperBalconySeats(String superBalconySeats) {
                this.superBalconySeats = superBalconySeats;
            }

            public String getPayment() {
                return payment;
            }

            public void setPayment(String payment) {
                this.payment = payment;
            }
}
