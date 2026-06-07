package com.quizzypulse.backend.service;

import com.quizzypulse.backend.entity.Attempt;
import com.quizzypulse.backend.entity.Question;
import com.quizzypulse.backend.entity.User;
import com.quizzypulse.backend.repository.AttemptRepository;
import com.quizzypulse.backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Service
public class QuizService {

    private final QuestionRepository questionRepository;
    private final AttemptRepository attemptRepository;
    private final UserService userService;
    private final Random random = new Random();

    public QuizService(QuestionRepository questionRepository, AttemptRepository attemptRepository, UserService userService) {
        this.questionRepository = questionRepository;
        this.attemptRepository = attemptRepository;
        this.userService = userService;
    }

    public Question getNextQuestion(User user) {
        return getNextQuestion(user, null, new java.util.ArrayList<>());
    }
    
    public Question getNextQuestion(User user, String category, java.util.List<Long> sessionExcludeIds) {
        // 1. Get IDs of questions the user has ALREADY attempted in the DB
        java.util.List<Long> dbAttemptedIds = attemptRepository.findQuestionIdsByUserId(user.getId());
        
        // 2. Combine with session-based exclusions (if any)
        java.util.Set<Long> allExcludedIds = new java.util.HashSet<>(dbAttemptedIds);
        allExcludedIds.addAll(sessionExcludeIds);

        // Adaptive Logic:
        // If streak > 3, increase difficulty.
        int difficulty = 1;
        if (user.getCurrentStreak() > 3) {
            difficulty = Math.min(10, (user.getCurrentStreak() / 3) + 1);
        }

        java.util.List<Question> questions;
        
        if (category != null && !category.isEmpty()) {
            // Filter by category
            questions = questionRepository.findByCategoryAndDifficulty(category, difficulty);
            if (questions.isEmpty()) {
                // Fallback to any difficulty in this category
                questions = questionRepository.findByCategory(category);
            }
        } else {
            questions = questionRepository.findByDifficulty(difficulty);
        }
        
        if (questions.isEmpty()) {
            // Fallback to any question if no specific difficulty found
            questions = questionRepository.findAll();
        }
        
        // 3. Filter out ALL excluded questions
        questions = questions.stream()
            .filter(q -> !allExcludedIds.contains(q.getId()))
            .collect(java.util.stream.Collectors.toList());
        
        if (questions.isEmpty()) {
            // If we ran out of questions for the specific difficulty, try finding ANY question in that category not yet answered
            if (category != null && !category.isEmpty()) {
                 java.util.List<Question> allCategoryQuestions = questionRepository.findByCategory(category);
                 questions = allCategoryQuestions.stream()
                    .filter(q -> !allExcludedIds.contains(q.getId()))
                    .collect(java.util.stream.Collectors.toList());
            } else {
                 java.util.List<Question> allQuestions = questionRepository.findAll();
                 questions = allQuestions.stream()
                    .filter(q -> !allExcludedIds.contains(q.getId()))
                    .collect(java.util.stream.Collectors.toList());
            }
        }
        
        if (questions.isEmpty()) return null;

        return questions.get(random.nextInt(questions.size()));
    }

    @Transactional
    public boolean submitAnswer(User user, Question question, String answer) {
        boolean isCorrect = question.getCorrectAnswer().equalsIgnoreCase(answer);
        
        Attempt attempt = new Attempt(user, question, isCorrect);
        attemptRepository.save(attempt);
        
        userService.updateStats(user, isCorrect);
        
        return isCorrect;
    }
    
    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }
}
