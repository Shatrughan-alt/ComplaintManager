package com.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dto.CitizenDTO.CitizenLogin;
import com.dto.CitizenDTO.CitizenRegister;
import com.service.CitizenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/citizen")
@CrossOrigin("http://localhost:5173")
public class CitizenAuthController {
    private final CitizenService citizenService;

    public CitizenAuthController(CitizenService citizenService) {
        this.citizenService = citizenService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody CitizenRegister citizenRegister) {
        citizenService.register(citizenRegister);
        return ResponseEntity.ok("User registered successfully. Please log in.");    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody CitizenLogin CitizenLogin, HttpServletResponse response) {
        String token = citizenService.login(CitizenLogin);
        String UUID = citizenService.fetchUUID(CitizenLogin.getEmail());
        Cookie cookie = new Cookie("auth_token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(10*60*60);
        response.addCookie(cookie);

        Map<String,String> res = new HashMap<>();
    res.put("message", "Login successful");
    res.put("token", token); 
    res.put("UUID", UUID);
        return ResponseEntity.ok(res);
    }

}
