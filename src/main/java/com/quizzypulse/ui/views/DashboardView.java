package com.quizzypulse.ui.views;

import com.quizzypulse.backend.entity.Question;
import com.quizzypulse.backend.entity.User;
import com.quizzypulse.backend.service.QuizService;
import com.quizzypulse.backend.service.UserService;
import com.quizzypulse.ui.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import jakarta.annotation.security.PermitAll;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

@PageTitle("Dashboard | QuizzyPulse")
@Route(value = "dashboard", layout = MainLayout.class)
@RouteAlias(value = "", layout = MainLayout.class)
@PermitAll
public class DashboardView extends VerticalLayout {

    private final UserService userService;
    private final QuizService quizService;
    
    private User currentUser;
    
    // UI Containers
    private final VerticalLayout dashboardLayout = new VerticalLayout();
    private final VerticalLayout quizLayout = new VerticalLayout();
    
    // Dashboard Components
    private final Span xpBadge = new Span();
    private final Span streakBadge = new Span();
    
    // Quiz Components
    private Question currentQuestion;
    private String selectedCategory = null;
    private final List<Long> askedQuestionIds = new ArrayList<>();
    
    private final H3 categoryBadge = new H3();
    private final H2 questionText = new H2();
    private final Div optionsContainer = new Div();
    private final Span quizStatsBadge = new Span();

    public DashboardView(UserService userService, QuizService quizService) {
        this.userService = userService;
        this.quizService = quizService;
        
        addClassName("dashboard-view");
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
        
        loadCurrentUser();
        
        configureDashboardLayout();
        configureQuizLayout();
        
        add(dashboardLayout, quizLayout);
        quizLayout.setVisible(false); // Start with dashboard visible
    }
    
    private void loadCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        currentUser = userService.findByUsername(username);
        if (currentUser == null) {
            currentUser = userService.registerUser(username, "password");
        }
        updateStats();
    }
    
    private void updateStats() {
        xpBadge.setText("XP: " + currentUser.getXp());
        streakBadge.setText("Streak: " + currentUser.getCurrentStreak() + " 🔥");
        quizStatsBadge.setText("XP: " + currentUser.getXp() + " | Streak: " + currentUser.getCurrentStreak() + " 🔥");
    }

    private void configureDashboardLayout() {
        dashboardLayout.setAlignItems(Alignment.CENTER);
        dashboardLayout.setJustifyContentMode(JustifyContentMode.CENTER);
        dashboardLayout.setWidthFull();
        dashboardLayout.addClassName("animate-fade-in");
        
        // Header
        H2 title = new H2("Welcome to QuizzyPulse! 🚀");
        title.getStyle().set("font-size", "3em").set("margin-bottom", "0.5em");
        
        Paragraph subtitle = new Paragraph("Select a category to start your challenge.");
        subtitle.getStyle().set("font-size", "1.2em").set("opacity", "0.8");
        
        // Stats
        HorizontalLayout statsLayout = new HorizontalLayout(xpBadge, streakBadge);
        statsLayout.addClassName("stats-layout");
        statsLayout.addClassName("glass-panel"); // Glass effect for stats
        statsLayout.getStyle().set("margin", "20px 0").set("gap", "20px");
        
        xpBadge.getElement().getThemeList().add("badge success pill");
        streakBadge.getElement().getThemeList().add("badge error pill");
        
        // Categories
        Div categoryGrid = new Div();
        categoryGrid.addClassName("category-grid");
        categoryGrid.addClassName("animate-slide-up"); // Slide up animation
        categoryGrid.setWidth("100%");
        categoryGrid.setMaxWidth("900px");
        categoryGrid.getStyle()
            .set("display", "grid")
            .set("grid-template-columns", "repeat(auto-fit, minmax(150px, 1fr))")
            .set("gap", "20px")
            .set("padding", "20px");
        
        String[] categories = {"HTML", "CSS", "JavaScript", "Python", "Java", "C", "C++"};
        
        for (String category : categories) {
            Button catBtn = new Button(category);
            catBtn.addClassName("category-btn");
            catBtn.addThemeVariants(ButtonVariant.LUMO_LARGE, ButtonVariant.LUMO_PRIMARY);
            catBtn.getStyle()
                .set("height", "100px")
                .set("font-size", "1.5em")
                .set("border-radius", "15px")
                .set("box-shadow", "0 4px 15px rgba(0,0,0,0.3)");
            
            catBtn.addClickListener(e -> startQuiz(category));
            categoryGrid.add(catBtn);
        }
        
        dashboardLayout.add(title, subtitle, statsLayout, categoryGrid);
    }
    
    private void configureQuizLayout() {
        quizLayout.setAlignItems(Alignment.CENTER);
        quizLayout.setJustifyContentMode(JustifyContentMode.CENTER);
        quizLayout.setWidthFull();
        quizLayout.addClassName("animate-fade-in");
        
        // Container for quiz content with glass effect
        VerticalLayout quizContainer = new VerticalLayout();
        quizContainer.addClassName("glass-panel");
        quizContainer.setMaxWidth("800px");
        quizContainer.setAlignItems(Alignment.CENTER);
        quizContainer.setPadding(true);
        quizContainer.setSpacing(true);
        
        categoryBadge.getStyle().set("color", "var(--lumo-primary-color)");
        quizStatsBadge.getElement().getThemeList().add("badge");
        
        questionText.getStyle().set("text-align", "center").set("font-size", "1.8em");
        
        optionsContainer.addClassName("options-grid");
        optionsContainer.setWidth("100%");
        optionsContainer.getStyle()
            .set("display", "grid")
            .set("grid-template-columns", "1fr 1fr")
            .set("gap", "15px")
            .set("margin-top", "20px");
        
        Button backButton = new Button("← Back to Dashboard");
        backButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        backButton.getStyle().set("align-self", "flex-start").set("color", "white");
        backButton.addClickListener(e -> showDashboard());
        
        quizContainer.add(categoryBadge, quizStatsBadge, questionText, optionsContainer);
        quizLayout.add(backButton, quizContainer);
    }
    
    private void startQuiz(String category) {
        selectedCategory = category;
        categoryBadge.setText("📚 " + category);
        askedQuestionIds.clear();
        
        dashboardLayout.setVisible(false);
        quizLayout.setVisible(true);
        
        loadNextQuestion();
    }
    
    private void showDashboard() {
        quizLayout.setVisible(false);
        dashboardLayout.setVisible(true);
        updateStats(); // Refresh stats on return
    }
    
    private void loadNextQuestion() {
        currentQuestion = quizService.getNextQuestion(currentUser, selectedCategory, askedQuestionIds);
        
        if (currentQuestion == null) {
            questionText.setText("🎉 Quiz Complete! No more questions in this category.");
            optionsContainer.removeAll();
            
            Button retryButton = new Button("Retry Quiz");
            retryButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
            retryButton.addClickListener(e -> {
                askedQuestionIds.clear();
                loadNextQuestion();
            });
            
            Button dashboardButton = new Button("Back to Dashboard");
            dashboardButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
            dashboardButton.addClickListener(e -> showDashboard());
            
            optionsContainer.add(retryButton, dashboardButton);
            return;
        }
        
        askedQuestionIds.add(currentQuestion.getId());
        questionText.setText(currentQuestion.getText());
        
        // Voice Integration
        if (currentUser.isVoiceEnabled()) {
            String js = "if ('speechSynthesis' in window) {" +
                        "  window.speechSynthesis.cancel();" + // Stop previous speech
                        "  const utterance = new SpeechSynthesisUtterance($0);" +
                        "  utterance.rate = 0.9;" +
                        "  window.speechSynthesis.speak(utterance);" +
                        "}";
            UI.getCurrent().getPage().executeJs(js, currentQuestion.getText());
        }
        
        optionsContainer.removeAll();
        for (String option : currentQuestion.getOptions()) {
            Button optionBtn = new Button(option);
            optionBtn.addClassName("option-btn");
            optionBtn.addThemeVariants(ButtonVariant.LUMO_LARGE);
            optionBtn.addClickListener(e -> handleAnswer(option));
            optionsContainer.add(optionBtn);
        }
    }
    
    private void handleAnswer(String answer) {
        boolean isCorrect = quizService.submitAnswer(currentUser, currentQuestion, answer);
        
        if (isCorrect) {
            Notification.show("✅ Correct!", 1000, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        } else {
            Notification.show("❌ Wrong! Answer was: " + currentQuestion.getCorrectAnswer(), 2000, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
        
        updateStats();
        
        // Small delay before next question
        UI.getCurrent().getPage().executeJs("setTimeout(() => {}, 500)");
        loadNextQuestion(); 
    }
}
