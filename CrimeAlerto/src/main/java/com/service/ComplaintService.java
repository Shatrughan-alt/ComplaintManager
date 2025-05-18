package com.service;

import java.util.List;

import com.dto.ComplaintDTO;
import com.entity.Complaint;

public interface ComplaintService{

    void addComplaint(ComplaintDTO complaintDTO);
    List<ComplaintDTO> findAllComplaints();
}
