package com.quizzypulse.ui;

import com.quizzypulse.ui.views.DashboardView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.theme.lumo.Lumo;

public class MainLayout extends AppLayout {

    public MainLayout() {
        createHeader();
        createDrawer();
    }

    private void createHeader() {
        H1 logo = new H1("QuizzyPulse");
        logo.addClassNames("text-l", "m-m");

        Button toggleThemeButton = new Button(VaadinIcon.MOON_O.create());
        toggleThemeButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        toggleThemeButton.addClickListener(e -> {
            var themeList = UI.getCurrent().getElement().getThemeList();
            if (themeList.contains(Lumo.DARK)) {
                themeList.remove(Lumo.DARK);
                toggleThemeButton.setIcon(VaadinIcon.MOON_O.create());
            } else {
                themeList.add(Lumo.DARK);
                toggleThemeButton.setIcon(VaadinIcon.SUN_O.create());
            }
        });

        HorizontalLayout header = new HorizontalLayout(
                new DrawerToggle(),
                logo,
                toggleThemeButton
        );

        header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        header.expand(logo);
        header.setWidthFull();
        header.addClassNames("py-0", "px-m");
        header.getStyle().set("background", "rgba(20, 20, 30, 0.8)")
              .set("backdrop-filter", "blur(10px)")
              .set("border-bottom", "1px solid rgba(255, 255, 255, 0.1)");

        addToNavbar(header);
    }

    private void createDrawer() {
        RouterLink dashboardLink = new RouterLink("Dashboard", DashboardView.class);
        
        VerticalLayout drawer = new VerticalLayout(
                dashboardLink,
                new RouterLink("Battle Lobby", com.quizzypulse.ui.views.BattleLobbyView.class),
                new RouterLink("Leaderboard", com.quizzypulse.ui.views.LeaderboardView.class),
                new RouterLink("Analytics", com.quizzypulse.ui.views.AnalyticsView.class),
                new RouterLink("Settings", com.quizzypulse.ui.views.SettingsView.class),
                new RouterLink("Offline Mode", com.quizzypulse.ui.views.OfflineView.class)
        );
        
        addToDrawer(drawer);
    }
}
