package com.mapper;

import com.dto.LawEnforcementDTO.LawEnforcementRegister;
import com.entity.LawEnforcement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class LawEnforcementMapper {

     private final PasswordEncoder passwordEncoder;

    @Autowired
    public LawEnforcementMapper(@Lazy PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    public LawEnforcement RegisterToEntity(LawEnforcementRegister lawEnforcementRegister) {
        LawEnforcement lawEnforcement = new LawEnforcement();
                lawEnforcement.setPoliceStationName(lawEnforcementRegister.getPoliceStationName());
                lawEnforcement.setPoliceStationEmail(lawEnforcementRegister.getPoliceStationEmail());
                lawEnforcement.setPoliceStationContactNo(lawEnforcementRegister.getPoliceStationContactNo());
                lawEnforcement.setSho(lawEnforcementRegister.getSho());
                lawEnforcement.setAddress(lawEnforcementRegister.getAddress());
                lawEnforcement.setPassword(passwordEncoder.encode(lawEnforcementRegister.getPassword()));
               return lawEnforcement;
    }
}
