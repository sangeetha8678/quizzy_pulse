package com.quizzypulse.ui.views;

import com.quizzypulse.backend.entity.QuizResult;
import com.quizzypulse.backend.entity.User;
import com.quizzypulse.backend.repository.AttemptRepository;
import com.quizzypulse.backend.repository.QuizResultRepository;
import com.quizzypulse.backend.service.UserService;
import com.quizzypulse.ui.MainLayout;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

@PageTitle("Analytics | QuizzyPulse")
@Route(value = "analytics", layout = MainLayout.class)
@PermitAll
public class AnalyticsView extends VerticalLayout {

    private final UserService userService;
    private final QuizResultRepository quizResultRepository;
    private final AttemptRepository attemptRepository;
    private User currentUser;

    public AnalyticsView(UserService userService, QuizResultRepository quizResultRepository, AttemptRepository attemptRepository) {
        this.userService = userService;
        this.quizResultRepository = quizResultRepository;
        this.attemptRepository = attemptRepository;
        
        addClassName("analytics-view");
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
        
        loadCurrentUser();
        createUI();
    }
    
    private void loadCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        currentUser = userService.findByUsername(username);
        if (currentUser == null) {
            currentUser = userService.registerUser(username, "password");
        }
    }
    
    private void createUI() {
        H2 title = new H2("Performance Analytics");
        
        // Stats Cards
        HorizontalLayout statsLayout = new HorizontalLayout();
        statsLayout.setWidthFull();
        statsLayout.setJustifyContentMode(JustifyContentMode.CENTER);
        statsLayout.add(
            createStatCard("Total XP", String.valueOf(currentUser.getXp()), "🏆"),
            createStatCard("Current Streak", currentUser.getCurrentStreak() + " days", "🔥"),
            createStatCard("Best Streak", currentUser.getMaxStreak() + " days", "⭐"),
            createStatCard("Games Played", String.valueOf(currentUser.getTotalGamesPlayed()), "🎮")
        );
        
        add(title, statsLayout);
    }
    
    private Div createStatCard(String label, String value, String icon) {
        Div card = new Div();
        card.addClassName("stat-card");
        card.getStyle()
            .set("padding", "var(--lumo-space-l)")
            .set("background", "var(--lumo-contrast-5pct)")
            .set("border-radius", "var(--lumo-border-radius-l)")
            .set("text-align", "center")
            .set("min-width", "150px");
        
        Span iconSpan = new Span(icon);
        iconSpan.getStyle().set("font-size", "2em");
        
        H3 valueText = new H3(value);
        valueText.getStyle().set("margin", "0.5em 0");
        
        Span labelText = new Span(label);
        labelText.getStyle().set("color", "var(--lumo-secondary-text-color)");
        
        card.add(iconSpan, valueText, labelText);
        return card;
    }
    
    // Charts removed due to Vaadin Pro license requirement.
}
