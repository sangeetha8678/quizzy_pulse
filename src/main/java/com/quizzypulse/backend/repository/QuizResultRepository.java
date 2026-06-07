package com.quizzypulse.backend.repository;

import com.quizzypulse.backend.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByUserIdOrderByPlayedAtDesc(Long userId);
}
