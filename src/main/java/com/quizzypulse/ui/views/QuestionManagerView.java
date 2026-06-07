package com.quizzypulse.ui.views;

import com.quizzypulse.ui.MainLayout;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;

@PageTitle("Question Manager | QuizzyPulse")
@Route(value = "admin/questions", layout = MainLayout.class)
@RolesAllowed("ADMIN")
public class QuestionManagerView extends VerticalLayout {

    public QuestionManagerView() {
        add(new H2("Question Manager"));
        add("Admin panel coming soon...");
    }
}
