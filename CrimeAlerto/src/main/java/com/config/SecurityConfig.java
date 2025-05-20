package com.config;

import com.authenticator.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .authorizeHttpRequests(auth -> auth
                // Permit public endpoints for both citizens and law enforcement
                .requestMatchers("/api/citizen/register", "/api/citizen/login").permitAll()
                .requestMatchers("/api/lawEnforcement/register", "/api/lawEnforcement/login").permitAll()
                
                // Role-based access control
                .requestMatchers("/api/home","/api/complaints").hasAuthority("CITIZEN") // Only citizens can access /api/home
                .requestMatchers("/api/test","/api/complaints/all").hasAuthority("LAW_ENFORCEMENT") // Only law enforcement can access /api/home/test
                .requestMatchers("/api/citizen/*").hasAuthority("CITIZEN") // Only law enforcement can access /api/home/test
                
                // All other endpoints require authentication
                .anyRequest().authenticated()
                
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}




// @Configuration
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http.csrf().disable()
//             .authorizeHttpRequests(auth -> auth
//                 // Permit public access to /api/complaints
//                 .requestMatchers("/api/complaints").permitAll()
                
//                 // Other endpoints
//                 .requestMatchers("/api/citizen/register", "/api/citizen/login").permitAll()
//                 .requestMatchers("/api/lawEnforcement/register", "/api/lawEnforcement/login").permitAll()
//                 .anyRequest().authenticated()
//             )
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }
// }