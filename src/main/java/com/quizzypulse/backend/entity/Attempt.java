package com.quizzypulse.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Attempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Question question;

    private boolean isCorrect;
    private LocalDateTime timestamp;

    public Attempt() {}

    public Attempt(User user, Question question, boolean isCorrect) {
        this.user = user;
        this.question = question;
        this.isCorrect = isCorrect;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public boolean isCorrect() { return isCorrect; }
    public void setCorrect(boolean correct) { isCorrect = correct; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
