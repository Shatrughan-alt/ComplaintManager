package com.service.impl;


import com.tokens.CommonJwtUtil;
import com.dto.LawEnforcementDTO.LawEnforcementLogin;
import com.dto.LawEnforcementDTO.LawEnforcementRegister;
import com.entity.LawEnforcement;
import com.exceptions.NoSuchUserFoundException;
import com.mapper.LawEnforcementMapper;
import com.repository.LawEnforcementRepository;
import com.service.LawEnforcementService;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@Validated
public class LawEnforcementServiceImpl implements LawEnforcementService {

    private final LawEnforcementMapper lawEnforcementMapper;
    private final LawEnforcementRepository lawEnforcementRepository;
    private final PasswordEncoder passwordEncoder;
    private final CommonJwtUtil jwtUtil;

    public LawEnforcementServiceImpl(LawEnforcementMapper lawEnforcementMapper, LawEnforcementRepository lawEnforcementRepository, @Lazy PasswordEncoder passwordEncoder, CommonJwtUtil jwtUtil) {
        this.lawEnforcementMapper = lawEnforcementMapper;
        this.lawEnforcementRepository = lawEnforcementRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil=jwtUtil;
    }

    @Override
    public LawEnforcement register(LawEnforcementRegister lawEnforcementRegister){
        Optional<LawEnforcement> lawEnforcementOptional = lawEnforcementRepository.findByEmail(lawEnforcementRegister.getPoliceStationEmail());
        if(lawEnforcementOptional.isPresent()){
            throw new RuntimeException("LawEnforcement already exists with this email");
        }
        LawEnforcement lawEnforcement = lawEnforcementMapper.RegisterToEntity(lawEnforcementRegister);
        return lawEnforcementRepository.save(lawEnforcement);
    }

    @Override
    public String login(LawEnforcementLogin login) {
        System.out.println(login.getEmail());
        LawEnforcement law=lawEnforcementRepository.findByEmail(login.getEmail()).orElseThrow(() -> new NoSuchUserFoundException("No User found"));
        if(!passwordEncoder.matches(login.getPassword(), law.getPassword())){
            throw new RuntimeException("Invalid email or password");
        }
        return jwtUtil.generateToken(law.getPoliceStationEmail());
    }




}
