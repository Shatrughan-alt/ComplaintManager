package com.service.impl;

import com.exceptions.NoSuchUserFoundException;
import com.repository.CitizenRepository;
import com.service.CitizenService;

import java.util.Optional;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tokens.CommonJwtUtil;
import com.dto.CitizenDTO.CitizenLogin;
import com.dto.CitizenDTO.CitizenRegister;
import com.entity.Citizen;
import com.mapper.CitizenMapper;

@Service
public class CitizenServiceImpl implements CitizenService {


    private CitizenMapper citizenMapper;
    private CitizenRepository citizenRepository;
    private final PasswordEncoder passwordEncoder;
    private CommonJwtUtil jwtUtil;
    public CitizenServiceImpl(CitizenMapper citizenMapper, CitizenRepository citizenRepository, @Lazy PasswordEncoder passwordEncoder, CommonJwtUtil jwtUtil) {
        this.citizenMapper = citizenMapper;
        this.citizenRepository = citizenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil=jwtUtil;
    }
    
    @Override
    public Citizen register(CitizenRegister citizenRegister){
       Optional<Citizen> citizenOptional = citizenRepository.findByEmail(citizenRegister.getEmail());
       if(citizenOptional.isPresent()){
           throw new RuntimeException("Citizen already exists with this email");
       }    
         Citizen citizen = citizenMapper.RegisterToEntity(citizenRegister);
         return citizenRepository.save(citizen);
    }

    @Override
    public String login(CitizenLogin citizenLogin) {
        Citizen citizen=citizenRepository.findByEmail(citizenLogin.getEmail()).orElseThrow(() -> new NoSuchUserFoundException("No User found"));
        if(!passwordEncoder.matches(citizenLogin.getPassword(), citizen.getPassword())){
            throw new RuntimeException("Invalid email or password");
        }
        return jwtUtil.generateToken(citizen.getEmail());
    }

    

    
}
