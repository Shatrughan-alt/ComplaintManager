package com.service;


import com.dto.LawEnforcementDTO.LawEnforcementLogin;
import com.dto.LawEnforcementDTO.LawEnforcementRegister;
import com.entity.LawEnforcement;

public interface LawEnforcementService {

    String login(LawEnforcementLogin lawEnforcementLogin);

    LawEnforcement register(LawEnforcementRegister lawEnforcementRegister);
}
