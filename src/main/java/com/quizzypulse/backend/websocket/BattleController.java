package com.quizzypulse.backend.websocket;

import com.quizzypulse.backend.entity.Question;
import com.quizzypulse.backend.service.QuizService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Controller
public class BattleController {

    private final QuizService quizService;
    private final Map<String, Integer> battleScores = new HashMap<>();

    public BattleController(QuizService quizService) {
        this.quizService = quizService;
    }

    @MessageMapping("/battle.join")
    @SendTo("/topic/battle")
    public BattleMessage join(BattleMessage message) {
        battleScores.put(message.getUsername(), 0);
        message.setContent(message.getUsername() + " joined the battle!");
        message.setType(BattleMessage.MessageType.JOIN);
        return message;
    }

    @MessageMapping("/battle.leave")
    @SendTo("/topic/battle")
    public BattleMessage leave(BattleMessage message) {
        battleScores.remove(message.getUsername());
        message.setContent(message.getUsername() + " left the battle.");
        message.setType(BattleMessage.MessageType.LEAVE);
        return message;
    }

    @MessageMapping("/battle.answer")
    @SendTo("/topic/battle")
    public BattleMessage submitAnswer(BattleMessage message) {
        // In a real implementation, validate the answer and update scores
        Integer currentScore = battleScores.getOrDefault(message.getUsername(), 0);
        battleScores.put(message.getUsername(), currentScore + 10);
        
        message.setType(BattleMessage.MessageType.SCORE_UPDATE);
        message.setData(battleScores);
        return message;
    }
}
