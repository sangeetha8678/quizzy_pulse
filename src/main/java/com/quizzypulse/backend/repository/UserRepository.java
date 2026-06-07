package com.quizzypulse.backend.repository;

import com.quizzypulse.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    java.util.List<User> findTop10ByOrderByXpDesc();
}
