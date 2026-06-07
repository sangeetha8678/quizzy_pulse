package com.quizzypulse.backend.repository;



import com.quizzypulse.backend.entity.Attempt;
import com.quizzypulse.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    List<Attempt> findByUser(User user);

    @Query("SELECT a.question.id FROM Attempt a WHERE a.user.id = :userId")
    List<Long> findQuestionIdsByUserId(@Param("userId") Long userId);

    @Query("SELECT q.category, COUNT(a), SUM(CASE WHEN a.isCorrect = true THEN 1 ELSE 0 END) FROM Attempt a JOIN a.question q WHERE a.user.id = :userId GROUP BY q.category")
    List<Object[]> findCategoryStats(@Param("userId") Long userId);
}
