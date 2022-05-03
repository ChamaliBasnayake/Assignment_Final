package com.springboot.cinema.model;

import com.springboot.cinema.model.audit.UserDateAudit;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 140)
    private String name;

    public Movie() {

    }

    public Movie(String name) {
        this.name = name;
    }

//    @OneToMany(
//            mappedBy = "polls",
//            cascade = CascadeType.ALL,
//            fetch = FetchType.EAGER,
//            orphanRemoval = true
//    )
//    @Size(min = 2, max = 6)
//    @Fetch(FetchMode.SELECT)
//    @BatchSize(size = 30)
//    private List<Choice> choices = new ArrayList<>();

//

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

//    public List<Choice> getChoices() {
//        return choices;
//    }
//
//    public void setChoices(List<Choice> choices) {
//        this.choices = choices;
//    }

//    public Instant getExpirationDateTime() {
//        return expirationDateTime;
//    }
//
//    public void setExpirationDateTime(Instant expirationDateTime) {
//        this.expirationDateTime = expirationDateTime;
//    }

//    public void addChoice(Choice choice) {
//        choices.add(choice);
//        choice.setPoll(this);
//    }
//
//    public void removeChoice(Choice choice) {
//        choices.remove(choice);
//        choice.setPoll(null);
//    }
}
