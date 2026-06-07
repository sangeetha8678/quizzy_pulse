package com.quizzypulse.backend.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "application_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    private int xp = 0;
    private int currentStreak = 0;
    private int maxStreak = 0;
    private int totalGamesPlayed = 0;
    private boolean voiceEnabled = false;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles;

    public User() {}

    public User(String username, String passwordHash, Set<String> roles) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.roles = roles;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public int getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(int currentStreak) { this.currentStreak = currentStreak; }

    public int getMaxStreak() { return maxStreak; }
    public void setMaxStreak(int maxStreak) { this.maxStreak = maxStreak; }

    public int getTotalGamesPlayed() { return totalGamesPlayed; }
    public void setTotalGamesPlayed(int totalGamesPlayed) { this.totalGamesPlayed = totalGamesPlayed; }

    public boolean isVoiceEnabled() { return voiceEnabled; }
    public void setVoiceEnabled(boolean voiceEnabled) { this.voiceEnabled = voiceEnabled; }

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }
}
