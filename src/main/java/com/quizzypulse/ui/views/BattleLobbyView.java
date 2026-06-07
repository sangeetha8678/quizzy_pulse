package com.quizzypulse.ui.views;

import com.quizzypulse.backend.security.AuthenticatedUser;
import com.quizzypulse.backend.service.BattleService;
import com.quizzypulse.ui.MainLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;

@PageTitle("Battle Lobby | QuizzyPulse")
@Route(value = "lobby", layout = MainLayout.class)
@PermitAll
public class BattleLobbyView extends VerticalLayout {

    private final Div gameContainer = new Div();
    private final H2 statusLabel = new H2();
    private final Paragraph questionLabel = new Paragraph();
    private final Button option1 = new Button("Option A");
    private final Button option2 = new Button("Option B");
    private final Button option3 = new Button("Option C");
    private final Button option4 = new Button("Option D");
    
    private final Div playersContainer = new Div();
    private final TextField roomCodeField = new TextField("Room Code");
    
    private final BattleService battleService;
    private final AuthenticatedUser authenticatedUser;
    
    private BattleService.BattleRoom currentRoom;
    private com.vaadin.flow.component.UI ui;

    public BattleLobbyView(BattleService battleService, AuthenticatedUser authenticatedUser) {
        this.battleService = battleService;
        this.authenticatedUser = authenticatedUser;

        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
        addClassName("battle-lobby-view");
        
        H2 title = new H2("Multiplayer Battle Lobby");
        // Removed description as requested
        
        // Glass Container
        Div lobbyContainer = new Div();
        lobbyContainer.addClassName("glass-panel");
        lobbyContainer.addClassName("animate-slide-up");
        lobbyContainer.setMaxWidth("500px");
        lobbyContainer.getStyle().set("display", "flex").set("flex-direction", "column").set("gap", "15px");
        
        Button createRoomBtn = new Button("Create Room");
        createRoomBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY, ButtonVariant.LUMO_LARGE);
        createRoomBtn.setWidthFull();
        createRoomBtn.addClickListener(e -> createRoom());
        
        Button joinRoomBtn = new Button("Join Room");
        joinRoomBtn.addThemeVariants(ButtonVariant.LUMO_LARGE);
        joinRoomBtn.setWidthFull();
        joinRoomBtn.addClickListener(e -> joinRoom());
        
        roomCodeField.setPlaceholder("Enter Room Code");
        roomCodeField.setWidthFull();
        
        playersContainer.addClassName("players-list");
        
        // Game Container (Hidden initially)
        gameContainer.setVisible(false);
        gameContainer.add(statusLabel, questionLabel, option1, option2, option3, option4);
        gameContainer.addClassName("glass-panel");
        
        lobbyContainer.add(createRoomBtn, roomCodeField, joinRoomBtn, playersContainer);
        
        add(title, lobbyContainer, gameContainer);
    }
    
    @Override
    protected void onAttach(com.vaadin.flow.component.AttachEvent attachEvent) {
        this.ui = attachEvent.getUI();
    }
    
    private void createRoom() {
        authenticatedUser.get().ifPresent(user -> {
            currentRoom = battleService.createRoom(user);
            roomCodeField.setValue(currentRoom.getCode());
            Notification.show("Room created: " + currentRoom.getCode(), 3000, Notification.Position.TOP_CENTER);
            playersContainer.removeAll();
            playersContainer.add(new Paragraph("Host: " + user.getUsername()));
            playersContainer.add(new Paragraph("Waiting for opponent..."));
            
            // Start polling for opponent
            startPolling();
        });
    }

    private void joinRoom() {
        String code = roomCodeField.getValue();
        if (code.isEmpty()) {
            Notification.show("Please enter a room code", 3000, Notification.Position.MIDDLE);
            return;
        }
        
        authenticatedUser.get().ifPresent(user -> {
            try {
                currentRoom = battleService.joinRoom(code, user);
                Notification.show("Joined room: " + currentRoom.getCode(), 3000, Notification.Position.TOP_CENTER);
                startGame();
            } catch (Exception e) {
                Notification.show("Error: " + e.getMessage(), 3000, Notification.Position.MIDDLE);
            }
        });
    }
    
    private void startPolling() {
        // Simple polling to check if opponent joined (in a real app, use Broadcaster)
        new Thread(() -> {
            while (currentRoom != null && !currentRoom.isFull()) {
                try {
                    Thread.sleep(1000);
                    if (currentRoom.isFull()) {
                        ui.access(() -> startGame());
                        break;
                    }
                } catch (InterruptedException e) {
                    break;
                }
            }
        }).start();
    }
    
    private void startGame() {
        playersContainer.removeAll();
        playersContainer.add(new Paragraph("Host: " + currentRoom.getHost().getUsername()));
        playersContainer.add(new Paragraph("Opponent: " + currentRoom.getOpponent().getUsername()));
        playersContainer.add(new Paragraph("Battle Starting!"));
        
        // Initialize buttons
        option1.addClickListener(e -> handleAnswer(option1.getText()));
        option2.addClickListener(e -> handleAnswer(option2.getText()));
        option3.addClickListener(e -> handleAnswer(option3.getText()));
        option4.addClickListener(e -> handleAnswer(option4.getText()));
        
        loadNextQuestion();
    }
    
    private void loadNextQuestion() {
        if (currentRoom.isGameOver()) {
            showResults();
            return;
        }
        
        BattleService.BattleQuestion q = currentRoom.getCurrentQuestion();
        if (q != null) {
            ui.access(() -> {
                statusLabel.setText("Question " + (currentRoom.getCurrentQuestionIndex() + 1) + "/" + currentRoom.getTotalQuestions());
                questionLabel.setText(q.getText());
                option1.setText(q.getOptionA());
                option2.setText(q.getOptionB());
                option3.setText(q.getOptionC());
                option4.setText(q.getOptionD());
                
                playersContainer.setVisible(false);
                gameContainer.setVisible(true);
            });
        }
    }
    
    private void handleAnswer(String selectedAnswer) {
        authenticatedUser.get().ifPresent(user -> {
            BattleService.BattleQuestion q = currentRoom.getCurrentQuestion();
            if (q != null && q.getCorrectAnswer().equals(selectedAnswer)) {
                currentRoom.incrementScore(user);
                Notification.show("Correct!", 1000, Notification.Position.BOTTOM_CENTER);
            } else {
                Notification.show("Wrong!", 1000, Notification.Position.BOTTOM_CENTER);
            }
            
            // Move to next question (simple sync for now, ideally should wait for both)
            currentRoom.nextQuestion();
            loadNextQuestion();
        });
    }
    
    private void showResults() {
        gameContainer.setVisible(false);
        playersContainer.setVisible(true);
        playersContainer.removeAll();
        
        H2 gameOver = new H2("Game Over!");
        gameOver.getStyle().set("color", "white");
        
        int hostScore = currentRoom.getHostScore();
        int oppScore = currentRoom.getOpponentScore();
        
        Paragraph scores = new Paragraph("Host: " + hostScore + " - Opponent: " + oppScore);
        scores.getStyle().set("font-size", "1.2em").set("font-weight", "bold");
        
        H2 winnerAnnouncement = new H2();
        if (hostScore > oppScore) {
            winnerAnnouncement.setText("Winner: " + currentRoom.getHost().getUsername() + " 🏆");
            winnerAnnouncement.getStyle().set("color", "#4caf50"); // Green
        } else if (oppScore > hostScore) {
            winnerAnnouncement.setText("Winner: " + currentRoom.getOpponent().getUsername() + " 🏆");
            winnerAnnouncement.getStyle().set("color", "#4caf50");
        } else {
            winnerAnnouncement.setText("It's a Tie! 🤝");
            winnerAnnouncement.getStyle().set("color", "#ffeb3b"); // Yellow
        }
        
        playersContainer.add(gameOver, scores, winnerAnnouncement);
    }
}
