package com.quizzypulse.ui.views;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@Route("login")
@PageTitle("Login | QuizzyPulse")
@AnonymousAllowed
public class LoginView extends VerticalLayout implements BeforeEnterObserver {

    private final LoginForm login = new LoginForm();

    public LoginView() {
        addClassName("login-view");
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        login.setAction("login");
        login.setForgotPasswordButtonVisible(false); // Simplify for now

        Div loginContainer = new Div();
        loginContainer.addClassName("glass-panel");
        loginContainer.addClassName("animate-fade-in");
        
        H1 title = new H1("QuizzyPulse");
        Paragraph subtitle = new Paragraph("Level up your knowledge!");
        subtitle.getStyle().set("color", "#666666").set("margin-bottom", "20px");
        
        com.vaadin.flow.router.RouterLink registerLink = new com.vaadin.flow.router.RouterLink("Don't have an account? Register here.", RegisterView.class);
        registerLink.getStyle().set("margin-top", "15px").set("display", "block").set("text-align", "center");
        
        loginContainer.add(title, subtitle, login, registerLink);

        add(loginContainer);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        if (beforeEnterEvent.getLocation()
                .getQueryParameters()
                .getParameters()
                .containsKey("error")) {
            login.setError(true);
        }
    }
}
