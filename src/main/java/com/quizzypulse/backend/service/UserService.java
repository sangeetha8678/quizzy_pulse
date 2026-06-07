package com.quizzypulse.backend.service;

import com.quizzypulse.backend.entity.User;
import com.quizzypulse.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String username, String password) {
        if (userRepository.findByUsername(username) != null) {
            throw new IllegalArgumentException("Username already exists");
        }
        
        Set<String> roles = username.equalsIgnoreCase("superadmin") 
            ? Collections.singleton("ROLE_ADMIN") 
            : Collections.singleton("ROLE_USER");
            
        User user = new User(username, passwordEncoder.encode(password), roles);
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    public void updateStats(User user, boolean isCorrect) {
        if (isCorrect) {
            user.setXp(user.getXp() + 10 + (user.getCurrentStreak() * 2)); // Bonus for streak
            user.setCurrentStreak(user.getCurrentStreak() + 1);
            if (user.getCurrentStreak() > user.getMaxStreak()) {
                user.setMaxStreak(user.getCurrentStreak());
            }
        } else {
            user.setCurrentStreak(0);
        }
        userRepository.save(user);
    }
    public void save(User user) {
        userRepository.save(user);
    }

    public java.util.List<User> getLeaderboard() {
        return userRepository.findTop10ByOrderByXpDesc();
    }
}
