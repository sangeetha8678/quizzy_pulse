package com.quizzypulse.ui.views;

import com.quizzypulse.backend.service.UserService;
import com.quizzypulse.ui.MainLayout;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;

@PageTitle("Settings | QuizzyPulse")
@Route(value = "settings", layout = MainLayout.class)
@PermitAll
public class SettingsView extends VerticalLayout {

    private final UserService userService;
    private final Checkbox voiceEnabledCheckbox;

    public SettingsView(UserService userService) {
        this.userService = userService;
        
        addClassName("settings-view");
        setSizeFull();
        setPadding(true);

        H2 title = new H2("Settings");
        
        // Voice Settings
        H2 voiceSection = new H2("Voice & Accessibility");
        voiceSection.getStyle().set("font-size", "var(--lumo-font-size-xl)");
        
        Paragraph voiceDescription = new Paragraph(
            "Enable text-to-speech to read questions aloud using your browser's speech synthesis."
        );
        
        voiceEnabledCheckbox = new Checkbox("Enable Voice Questions");
        
        // Load current setting
        String username = com.vaadin.flow.server.VaadinSession.getCurrent().getAttribute("username") != null ? 
                          (String) com.vaadin.flow.server.VaadinSession.getCurrent().getAttribute("username") : 
                          org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getName();
                          
        com.quizzypulse.backend.entity.User user = userService.findByUsername(username);
        if (user != null) {
            voiceEnabledCheckbox.setValue(user.isVoiceEnabled());
        }
        
        voiceEnabledCheckbox.addValueChangeListener(e -> {
            if (user != null) {
                user.setVoiceEnabled(e.getValue());
                userService.save(user); // Ensure UserService has a save method or use repo
                
                if (e.getValue()) {
                    Notification.show("Voice enabled! Questions will be read aloud.", 3000, Notification.Position.MIDDLE);
                    testVoice();
                } else {
                    Notification.show("Voice disabled.", 2000, Notification.Position.MIDDLE);
                }
            }
        });

        add(title, voiceSection, voiceDescription, voiceEnabledCheckbox);
    }
    
    private void testVoice() {
        // Test using Web Speech API via JavaScript
        getElement().executeJs(
            "if ('speechSynthesis' in window) {" +
            "  const utterance = new SpeechSynthesisUtterance('Voice enabled. Questions will now be read aloud.');" +
            "  utterance.rate = 0.9;" +
            "  window.speechSynthesis.speak(utterance);" +
            "} else {" +
            "  console.log('Speech synthesis not supported');" +
            "}"
        );
    }
}
