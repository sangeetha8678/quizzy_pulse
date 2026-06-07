package com.quizzypulse.ui.views;

import com.quizzypulse.backend.service.UserService;
import com.quizzypulse.ui.MainLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;

@PageTitle("Leaderboard | QuizzyPulse")
@Route(value = "leaderboard", layout = MainLayout.class)
@PermitAll
public class LeaderboardView extends VerticalLayout {

    private final UserService userService;

    public LeaderboardView(UserService userService) {
        this.userService = userService;
        
        addClassName("leaderboard-view");
        addClassName("animate-fade-in");
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
        
        createLeaderboard();
    }
    
    private void createLeaderboard() {
        H2 title = new H2("🏆 Global Leaderboard");
        title.getStyle().set("margin-bottom", "20px");
        
        // Glass Panel Container
        Div container = new Div();
        container.addClassName("glass-panel");
        container.addClassName("animate-slide-up");
        container.setWidth("100%");
        container.setMaxWidth("800px");
        container.getStyle().set("padding", "0"); // Reset padding for grid
        
        // Grid
        Grid<com.quizzypulse.backend.entity.User> grid = new Grid<>(com.quizzypulse.backend.entity.User.class, false);
        grid.addClassName("leaderboard-grid");
        grid.setAllRowsVisible(true);
        grid.addThemeVariants(GridVariant.LUMO_NO_BORDER, GridVariant.LUMO_ROW_STRIPES);
        
        grid.addColumn(com.quizzypulse.backend.entity.User::getUsername).setHeader("Player").setAutoWidth(true);
        grid.addColumn(com.quizzypulse.backend.entity.User::getXp).setHeader("XP ⚡").setSortable(true);
        grid.addColumn(com.quizzypulse.backend.entity.User::getCurrentStreak).setHeader("Streak 🔥").setSortable(true);
        grid.addColumn(com.quizzypulse.backend.entity.User::getMaxStreak).setHeader("Best Streak 🌟");
        
        grid.setItems(userService.getLeaderboard());
        
        // Custom styling for grid to blend with glass
        grid.getStyle().set("background", "transparent").set("border-radius", "20px");
        
        container.add(grid);
        
        add(title, container);
    }
}
