package com.quizzypulse.ui.views;

import com.quizzypulse.backend.entity.Attempt;
import com.quizzypulse.backend.entity.Question;
import com.quizzypulse.backend.entity.User;
import com.quizzypulse.backend.repository.AttemptRepository;
import com.quizzypulse.backend.service.UserService;
import com.quizzypulse.ui.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@PageTitle("Offline Practice | QuizzyPulse")
@Route(value = "offline", layout = MainLayout.class)
@PermitAll
public class OfflineView extends VerticalLayout {

    private final AttemptRepository attemptRepository;
    private final UserService userService;
    
    private User currentUser;
    private List<Question> practiceQuestions;
    private int currentIndex = 0;
    
    private final H2 questionText = new H2();
    private final Div optionsContainer = new Div();
    private final Paragraph progressText = new Paragraph();

    public OfflineView(AttemptRepository attemptRepository, UserService userService) {
        this.attemptRepository = attemptRepository;
        this.userService = userService;
        
        addClassName("offline-view");
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
        
        loadCurrentUser();
        loadPracticeQuestions();
        createUI();
        showQuestion();
    }
    
    private void loadCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        currentUser = userService.findByUsername(username);
        if (currentUser == null) {
            currentUser = userService.registerUser(username, "password");
        }
    }
    
    private void loadPracticeQuestions() {
        // Fetch all attempts and extract unique questions
        List<Attempt> attempts = attemptRepository.findByUser(currentUser);
        practiceQuestions = attempts.stream()
            .map(Attempt::getQuestion)
            .distinct()
            .collect(Collectors.toList());
        
        Collections.shuffle(practiceQuestions);
    }
    
    private void createUI() {
        H2 header = new H2("🧠 Offline Practice Mode");
        Paragraph subHeader = new Paragraph("Review questions you've already attempted to boost your IQ!");
        
        optionsContainer.addClassName("options-grid");
        optionsContainer.setWidth("100%");
        optionsContainer.setMaxWidth("600px");
        
        Button backButton = new Button("← Back to Dashboard");
        backButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        backButton.addClickListener(e -> UI.getCurrent().navigate("dashboard"));
        
        add(backButton, header, subHeader, progressText, questionText, optionsContainer);
    }
    
    private void showQuestion() {
        if (practiceQuestions.isEmpty()) {
            questionText.setText("No practice questions yet!");
            progressText.setText("Play some online quizzes first to build your practice bank.");
            optionsContainer.removeAll();
            return;
        }
        
        if (currentIndex >= practiceQuestions.size()) {
            currentIndex = 0; // Loop back or finish
            Collections.shuffle(practiceQuestions); // Shuffle for variety
            Notification.show("Practice round complete! Shuffling...", 3000, Notification.Position.BOTTOM_CENTER);
        }
        
        Question q = practiceQuestions.get(currentIndex);
        
        progressText.setText("Question " + (currentIndex + 1) + " of " + practiceQuestions.size());
        questionText.setText(q.getText());
        
        optionsContainer.removeAll();
        for (String option : q.getOptions()) {
            Button optionBtn = new Button(option);
            optionBtn.addClassName("option-btn");
            optionBtn.addThemeVariants(ButtonVariant.LUMO_LARGE);
            optionBtn.addClickListener(e -> handleAnswer(q, option));
            optionsContainer.add(optionBtn);
        }
    }
    
    private void handleAnswer(Question q, String answer) {
        if (q.getCorrectAnswer().equals(answer)) {
            Notification.show("Correct!", 1000, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        } else {
            Notification.show("Wrong! It was: " + q.getCorrectAnswer(), 2000, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
        
        currentIndex++;
        // Small delay
        UI.getCurrent().getPage().executeJs("setTimeout(() => {}, 500)");
        showQuestion();
    }
}
