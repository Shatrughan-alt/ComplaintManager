package com.service;

import com.dto.CitizenDTO.CitizenLogin;
import com.dto.CitizenDTO.CitizenRegister;
import com.entity.Citizen;

public interface CitizenService {

    Citizen register(CitizenRegister citizenRegister);

    String login(CitizenLogin citizenLogin);


}
