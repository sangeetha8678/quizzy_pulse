package com.quizzypulse.backend.websocket;

public class BattleMessage {
    
    public enum MessageType {
        JOIN, LEAVE, QUESTION, ANSWER, SCORE_UPDATE, GAME_END
    }
    
    private MessageType type;
    private String username;
    private String content;
    private Object data;
    
    public BattleMessage() {}
    
    public BattleMessage(MessageType type, String username, String content) {
        this.type = type;
        this.username = username;
        this.content = content;
    }

    // Getters and Setters
    public MessageType getType() { return type; }
    public void setType(MessageType type) { this.type = type; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }
}
