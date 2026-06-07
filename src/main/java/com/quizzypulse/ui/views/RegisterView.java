package com.quizzypulse.ui.views;

import com.quizzypulse.backend.service.UserService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@Route("register")
@PageTitle("Register | QuizzyPulse")
@AnonymousAllowed
public class RegisterView extends VerticalLayout {

    private final UserService userService;

    public RegisterView(UserService userService) {
        this.userService = userService;
        
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        Div container = new Div();
        container.addClassNames("glass-panel", "animate-fade-in");
        container.getStyle().set("padding", "2rem").set("display", "flex").set("flex-direction", "column").set("align-items", "center");

        H2 title = new H2("Create an Account");

        TextField usernameField = new TextField("Username");
        usernameField.setWidthFull();

        PasswordField passwordField = new PasswordField("Password");
        passwordField.setWidthFull();

        Button registerButton = new Button("Register", event -> {
            String username = usernameField.getValue();
            String password = passwordField.getValue();

            if (username.trim().isEmpty() || password.trim().isEmpty()) {
                Notification.show("Please fill in all fields.", 3000, Notification.Position.MIDDLE)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }

            try {
                this.userService.registerUser(username, password);
                Notification.show("Registration successful! Please login.", 3000, Notification.Position.MIDDLE)
                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                getUI().ifPresent(ui -> ui.navigate(LoginView.class));
            } catch (Exception e) {
                Notification.show("Username already taken.", 3000, Notification.Position.MIDDLE)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
            }
        });
        registerButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        registerButton.setWidthFull();
        registerButton.getStyle().set("margin-top", "1rem");

        RouterLink loginLink = new RouterLink("Already have an account? Login here.", LoginView.class);
        loginLink.getStyle().set("margin-top", "10px");

        container.add(title, usernameField, passwordField, registerButton, loginLink);
        add(container);
    }
}
