package com.quizzypulse.ui.views;

import com.quizzypulse.backend.entity.QuizResult;
import com.quizzypulse.backend.entity.User;
import com.quizzypulse.backend.repository.AttemptRepository;
import com.quizzypulse.backend.repository.QuizResultRepository;
import com.quizzypulse.backend.service.UserService;
import com.quizzypulse.ui.MainLayout;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.*;
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
        
        // Performance Chart
        Chart performanceChart = createPerformanceChart();
        
        // Category Chart
        Chart categoryChart = createCategoryChart();
        
        add(title, statsLayout, new H3("Performance Over Time"), performanceChart, new H3("Strength by Topic"), categoryChart);
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
    
    private Chart createCategoryChart() {
        Chart chart = new Chart(ChartType.COLUMN);
        Configuration conf = chart.getConfiguration();
        conf.setTitle("Accuracy by Category");
        
        XAxis xAxis = conf.getxAxis();
        YAxis yAxis = conf.getyAxis();
        yAxis.setTitle("Accuracy (%)");
        yAxis.setMax(100);
        
        List<Object[]> stats = attemptRepository.findCategoryStats(currentUser.getId());
        
        ListSeries accuracySeries = new ListSeries("Accuracy");
        List<String> categories = new ArrayList<>();
        
        for (Object[] row : stats) {
            String category = (String) row[0];
            Long total = (Long) row[1];
            Long correct = (Long) row[2];
            
            double accuracy = (total > 0) ? (correct.doubleValue() / total.doubleValue()) * 100.0 : 0.0;
            
            categories.add(category);
            accuracySeries.addData(Math.round(accuracy * 100.0) / 100.0);
        }
        
        xAxis.setCategories(categories.toArray(new String[0]));
        conf.addSeries(accuracySeries);
        
        return chart;
    }

    private Chart createPerformanceChart() {
        Chart chart = new Chart(ChartType.LINE);
        
        Configuration conf = chart.getConfiguration();
        conf.setTitle("Quiz Performance");
        conf.getLegend().setEnabled(false);
        
        XAxis xAxis = conf.getxAxis();
        xAxis.setTitle("Quiz Number");
        
        YAxis yAxis = conf.getyAxis();
        yAxis.setTitle("Score");
        
        // Get user's quiz results
        List<QuizResult> results = quizResultRepository.findByUserIdOrderByPlayedAtDesc(currentUser.getId());
        
        ListSeries series = new ListSeries("Performance");
        if (results.isEmpty()) {
            // Sample data if no results
            series.setData(0, 0, 0);
        } else {
            Number[] scores = results.stream()
                .limit(10)
                .map(QuizResult::getScore)
                .toArray(Number[]::new);
            series.setData(scores);
        }
        
        conf.addSeries(series);
        
        return chart;
    }
}
