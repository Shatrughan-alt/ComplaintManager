package com.authenticator;

import com.tokens.CommonJwtUtil;
import com.entity.Citizen;
import com.entity.LawEnforcement;
import com.repository.CitizenRepository;
import com.repository.LawEnforcementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private CommonJwtUtil jwtUtil;

    @Autowired
    private CitizenRepository citizenRepository;

    @Autowired
    private LawEnforcementRepository lawEnforcementRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
                
        String token = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("auth_token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
    
        if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            String email = jwtUtil.extractEmail(token);
    
            if (email != null) {
                Citizen citizen = citizenRepository.findByEmail(email).orElse(null);
                if (citizen != null && jwtUtil.validateToken(token, citizen.getEmail())) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            citizen, null, List.of(() -> "CITIZEN"));
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }

                LawEnforcement law = lawEnforcementRepository.findByEmail(email).orElse(null);
                if (law != null && jwtUtil.validateToken(token, law.getPoliceStationEmail())) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        law, null, List.of(() -> "LAW_ENFORCEMENT"));
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }

            }
        }
    
        chain.doFilter(request, response);
    }
}