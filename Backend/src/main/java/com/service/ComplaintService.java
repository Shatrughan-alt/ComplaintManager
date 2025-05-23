package com.service;

import java.util.List;

import com.dto.ComplaintDTO;

public interface ComplaintService {

    void addComplaint(ComplaintDTO complaintDTO);

    List<ComplaintDTO> findAllComplaints();

    ComplaintDTO getComplaintById(Integer complaintId);
    
    String getUploadedDocument(Integer complaintId);
    
    List<ComplaintDTO> findAllComplaintsCitizenId(Long citizenId);
}
