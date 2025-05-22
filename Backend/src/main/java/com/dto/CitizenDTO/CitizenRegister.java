package com.dto.CitizenDTO;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

public class CitizenRegister {
    private String name;
    private String email;
    private Long phoneNumber;
    @CreationTimestamp
    private LocalDateTime createdAt;
    private String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public CitizenRegister(String name, String email, Long phoneNumber, LocalDateTime createdAt, String password) {
        super();
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.createdAt = createdAt;
        this.password = password;

    }

    public CitizenRegister() {
    }

}
