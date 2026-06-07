package com.quizzypulse.backend.security;

import com.quizzypulse.ui.views.LoginView;
import com.vaadin.flow.spring.security.VaadinWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends VaadinWebSecurity {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
            .requestMatchers(new org.springframework.security.web.util.matcher.AntPathRequestMatcher("/register")).permitAll()
        );
        super.configure(http);
        setLoginView(http, LoginView.class);
        http.formLogin(form -> form.defaultSuccessUrl("/dashboard", true));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public org.springframework.security.core.userdetails.UserDetailsService userDetailsService(com.quizzypulse.backend.repository.UserRepository userRepository) {
        return username -> {
            com.quizzypulse.backend.entity.User user = userRepository.findByUsername(username);
            if (user == null) {
                throw new org.springframework.security.core.userdetails.UsernameNotFoundException("No user present with username: " + username);
            } else {
                return new org.springframework.security.core.userdetails.User(
                        user.getUsername(),
                        user.getPasswordHash(),
                        user.getRoles().stream()
                                .map(org.springframework.security.core.authority.SimpleGrantedAuthority::new)
                                .collect(java.util.stream.Collectors.toList())
                );
            }
        };
    }
}
