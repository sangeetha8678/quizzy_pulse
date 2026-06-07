package com.quizzypulse.ui.views;

import com.quizzypulse.backend.entity.Question;
import com.quizzypulse.backend.entity.User;
import com.quizzypulse.backend.service.QuizService;
import com.quizzypulse.backend.service.UserService;
import com.quizzypulse.ui.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Route(value = "quiz", layout = MainLayout.class)
@PageTitle("Quiz | QuizzyPulse")
@PermitAll
@CssImport("./styles/quiz.css")
public class QuizView extends VerticalLayout {

    private final QuizService quizService;
    private final UserService userService;
    private User currentUser;

    private Div cardContainer;
    private Div cardInner;
    private Div cardFront;
    private Div cardBack;

    private H2 questionText;
    private VerticalLayout optionsLayout;
    
    private H3 resultText;
    private Paragraph xpText;
    private Button nextButton;

    private Question currentQuestion;
    private boolean voiceEnabled = true;

    public QuizView(QuizService quizService, UserService userService) {
        this.quizService = quizService;
        this.userService = userService;

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            this.currentUser = userService.findByUsername(username);
        }

        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        setupVoiceToggle();
        setupCard();

        if (currentUser != null) {
            loadNextQuestion();
        } else {
            add(new H2("Please log in to play."));
        }
    }

    private void setupVoiceToggle() {
        Button voiceToggle = new Button(VaadinIcon.VOLUME_UP.create(), e -> {
            voiceEnabled = !voiceEnabled;
            e.getSource().setIcon(voiceEnabled ? VaadinIcon.VOLUME_UP.create() : VaadinIcon.VOLUME_OFF.create());
        });
        voiceToggle.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        add(new HorizontalLayout(new Paragraph("Read Questions Aloud:"), voiceToggle));
    }

    private void setupCard() {
        cardContainer = new Div();
        cardContainer.addClassName("quiz-container");

        cardInner = new Div();
        cardInner.addClassName("card-inner");

        // Front of card (Question)
        cardFront = new Div();
        cardFront.addClassName("card-front");

        questionText = new H2();
        questionText.getStyle().set("text-align", "center");
        optionsLayout = new VerticalLayout();
        optionsLayout.setWidthFull();

        cardFront.add(questionText, optionsLayout);

        // Back of card (Result)
        cardBack = new Div();
        cardBack.addClassName("card-back");

        resultText = new H3();
        xpText = new Paragraph();
        nextButton = new Button("Next Question", e -> loadNextQuestion());
        nextButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        cardBack.add(resultText, xpText, nextButton);

        cardInner.add(cardFront, cardBack);
        cardContainer.add(cardInner);

        add(cardContainer);
    }

    private void loadNextQuestion() {
        // Reset card state
        cardContainer.removeClassName("card-flip");
        cardFront.removeClassName("correct-animation");
        cardFront.removeClassName("wrong-animation");

        // Pass null for category and empty list for session excluded to use defaults
        currentQuestion = quizService.getNextQuestion(currentUser, null, Collections.emptyList());

        if (currentQuestion == null) {
            questionText.setText("You've answered all available questions!");
            optionsLayout.removeAll();
            return;
        }

        questionText.setText(currentQuestion.getText());
        optionsLayout.removeAll();

        List<String> options = currentQuestion.getOptions().stream().collect(Collectors.toList());
        Collections.shuffle(options);

        for (String option : options) {
            Button optionBtn = new Button(option, e -> handleAnswer(option));
            optionBtn.setWidthFull();
            optionsLayout.add(optionBtn);
        }

        if (voiceEnabled) {
            UI.getCurrent().getPage().executeJs(
                "if ('speechSynthesis' in window) { var msg = new SpeechSynthesisUtterance($0); window.speechSynthesis.speak(msg); }",
                currentQuestion.getText()
            );
        }
    }

    private void handleAnswer(String answer) {
        boolean isCorrect = quizService.submitAnswer(currentUser, currentQuestion, answer);
        
        // Fetch updated user to get new XP and streak
        currentUser = userService.findByUsername(currentUser.getUsername());

        if (isCorrect) {
            cardFront.addClassName("correct-animation");
            resultText.setText("Correct!");
            resultText.getStyle().set("color", "var(--lumo-success-color)");
            triggerConfetti();
        } else {
            cardFront.addClassName("wrong-animation");
            resultText.setText("Wrong! The correct answer was: " + currentQuestion.getCorrectAnswer());
            resultText.getStyle().set("color", "var(--lumo-error-color)");
        }

        xpText.setText("Current XP: " + currentUser.getXp() + " | Streak: " + currentUser.getCurrentStreak());

        // Flip to back after a short delay
        UI.getCurrent().getPage().executeJs("setTimeout(() => { $0.classList.add('card-flip'); }, 800);", cardContainer.getElement());
    }

    private void triggerConfetti() {
        UI.getCurrent().getPage().executeJs(
            "import('https://cdn.skypack.dev/canvas-confetti').then((module) => { module.default(); });"
        );
    }
}
