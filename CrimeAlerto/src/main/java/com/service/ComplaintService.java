package com.service;

import java.util.List;

import com.dto.ComplaintDTO;


public interface ComplaintService{

    void addComplaint(ComplaintDTO complaintDTO);
    List<ComplaintDTO> findAllComplaints();

    List<ComplaintDTO> findAllComplaintsCitizenId(Long citizenId);
}
