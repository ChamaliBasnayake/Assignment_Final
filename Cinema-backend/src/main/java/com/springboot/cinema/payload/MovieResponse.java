package com.springboot.cinema.payload;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;

public class MovieResponse {
    private Long id;
    private String name;
    private UserSummary createdBy;
    private Instant creationDateTime;
    private Instant expirationDateTime;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long selectedChoice;
    private Long totalVotes;

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

//
//    public UserSummary getCreatedBy() {
//        return createdBy;
//    }
//
//    public void setCreatedBy(UserSummary createdBy) {
//        this.createdBy = createdBy;
//    }
//
//
//    public Instant getCreationDateTime() {
//        return creationDateTime;
//    }
//
//    public void setCreationDateTime(Instant creationDateTime) {
//        this.creationDateTime = creationDateTime;
//    }
//
//    public Instant getExpirationDateTime() {
//        return expirationDateTime;
//    }
//
//    public void setExpirationDateTime(Instant expirationDateTime) {
//        this.expirationDateTime = expirationDateTime;
//    }
//
//    public Boolean getExpired() {
//        return isExpired;
//    }
//
//    public void setExpired(Boolean expired) {
//        isExpired = expired;
//    }
//
//    public Long getSelectedChoice() {
//        return selectedChoice;
//    }
//
//    public void setSelectedChoice(Long selectedChoice) {
//        this.selectedChoice = selectedChoice;
//    }
//
//    public Long getTotalVotes() {
//        return totalVotes;
//    }
//
//    public void setTotalVotes(Long totalVotes) {
//        this.totalVotes = totalVotes;
//    }
}
