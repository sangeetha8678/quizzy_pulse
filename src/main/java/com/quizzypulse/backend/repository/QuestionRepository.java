package com.quizzypulse.backend.repository;

import com.quizzypulse.backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    @Query("SELECT q FROM Question q WHERE q.category = :category AND q.difficulty = :difficulty")
    List<Question> findByCategoryAndDifficulty(@Param("category") String category, @Param("difficulty") int difficulty);

    List<Question> findByDifficulty(int difficulty);
    
    List<Question> findByCategory(String category);
}
