package com.quizzypulse.backend.service;

import com.quizzypulse.backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class BattleService {

    private final Map<String, BattleRoom> rooms = new ConcurrentHashMap<>();

    public BattleRoom createRoom(User host) {
        String roomCode = generateRoomCode();
        BattleRoom room = new BattleRoom(roomCode, host);
        rooms.put(roomCode, room);
        return room;
    }

    public BattleRoom joinRoom(String roomCode, User player) {
        BattleRoom room = rooms.get(roomCode);
        if (room == null) {
            throw new IllegalArgumentException("Room not found");
        }
        if (room.isFull()) {
            throw new IllegalStateException("Room is full");
        }
        room.addPlayer(player);
        return room;
    }

    public BattleRoom getRoom(String roomCode) {
        return rooms.get(roomCode);
    }

    private String generateRoomCode() {
        return "ROOM-" + (int)(Math.random() * 10000);
    }

    public static class BattleRoom {
        private final String code;
        private final User host;
        private User opponent;
        private boolean active = false;
        private int hostScore = 0;
        private int opponentScore = 0;
        private int currentQuestionIndex = 0;
        private final int totalQuestions = 5;
        private final List<BattleQuestion> questions = new ArrayList<>();
        
        public BattleRoom(String code, User host) {
            this.code = code;
            this.host = host;
            generateQuestions();
        }

        private void generateQuestions() {
            questions.add(new BattleQuestion("Which language is known as the backbone of the web?", "HTML", "Java", "Python", "C++", "HTML"));
            questions.add(new BattleQuestion("Which of these is NOT a Java keyword?", "static", "Boolean", "void", "private", "Boolean"));
            questions.add(new BattleQuestion("In Python, what data type is mutable?", "Tuple", "String", "List", "Integer", "List"));
            questions.add(new BattleQuestion("Which symbol is used for pointers in C?", "*", "&", "#", "@", "*"));
            questions.add(new BattleQuestion("Which CSS property changes text color?", "text-color", "color", "font-color", "background", "color"));
        }

        public void addPlayer(User player) {
            if (opponent != null) {
                throw new IllegalStateException("Room is full");
            }
            this.opponent = player;
            this.active = true;
        }

        public void incrementScore(User user) {
            if (user.equals(host)) {
                hostScore++;
            } else if (user.equals(opponent)) {
                opponentScore++;
            }
        }
        
        public void nextQuestion() {
            currentQuestionIndex++;
        }
        
        public boolean isGameOver() {
            return currentQuestionIndex >= totalQuestions;
        }

        public BattleQuestion getCurrentQuestion() {
            if (currentQuestionIndex < questions.size()) {
                return questions.get(currentQuestionIndex);
            }
            return null;
        }

        public boolean isFull() { return opponent != null; }
        public String getCode() { return code; }
        public User getHost() { return host; }
        public User getOpponent() { return opponent; }
        public boolean isActive() { return active; }
        public int getHostScore() { return hostScore; }
        public int getOpponentScore() { return opponentScore; }
        public int getCurrentQuestionIndex() { return currentQuestionIndex; }
        public int getTotalQuestions() { return totalQuestions; }
    }

    public static class BattleQuestion {
        private final String text;
        private final String optionA;
        private final String optionB;
        private final String optionC;
        private final String optionD;
        private final String correctAnswer;

        public BattleQuestion(String text, String optionA, String optionB, String optionC, String optionD, String correctAnswer) {
            this.text = text;
            this.optionA = optionA;
            this.optionB = optionB;
            this.optionC = optionC;
            this.optionD = optionD;
            this.correctAnswer = correctAnswer;
        }

        public String getText() { return text; }
        public String getOptionA() { return optionA; }
        public String getOptionB() { return optionB; }
        public String getOptionC() { return optionC; }
        public String getOptionD() { return optionD; }
        public String getCorrectAnswer() { return correctAnswer; }
    }
}
