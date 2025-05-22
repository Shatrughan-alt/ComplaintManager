package com.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.dto.CitizenDTO.CitizenRegister;
import com.entity.Citizen;

@Component
public class CitizenMapper {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CitizenMapper(@Lazy PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public Citizen RegisterToEntity(CitizenRegister citizenRegister) {
        Citizen citizen = new Citizen();
        citizen.setName(citizenRegister.getName());
        citizen.setEmail(citizenRegister.getEmail());
        citizen.setPhoneNumber(citizenRegister.getPhoneNumber());
        citizen.setCreatedAt(citizenRegister.getCreatedAt());
        citizen.setPassword(passwordEncoder.encode(citizenRegister.getPassword()));
        return citizen;
    }
}