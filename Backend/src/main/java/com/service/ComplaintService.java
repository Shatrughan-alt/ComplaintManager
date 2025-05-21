package com.service;

import java.util.List;

import com.dto.ComplaintDTO;
import org.springframework.web.multipart.MultipartFile;

public interface ComplaintService {

    void addComplaint(ComplaintDTO complaintDTO, MultipartFile supportingDocument);

    List<ComplaintDTO> findAllComplaints();

    List<ComplaintDTO> findAllComplaintsCitizenId(Long citizenId);
}
