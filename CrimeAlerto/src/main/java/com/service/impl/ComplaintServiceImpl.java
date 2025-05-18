package com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dto.ComplaintDTO;
import com.entity.Complaint;
import com.mapper.ComplaintMapper;
import com.repository.ComplaintRepository;
import com.service.ComplaintService;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private ComplaintRepository complaintRepository;
    private ComplaintMapper complaintMapper;

    public ComplaintServiceImpl(ComplaintRepository complaintRepository, ComplaintMapper complaintMapper) {
        this.complaintRepository = complaintRepository;
        this.complaintMapper = complaintMapper;
    }

    @Override
    public void addComplaint(ComplaintDTO complaintDTO) {
        Complaint complaint = complaintMapper.toEntity(complaintDTO);
        complaintRepository.save(complaint);
    }

    @Override
    public List<ComplaintDTO> findAllComplaints() {
        return complaintRepository.findAll()
                .stream()
                .map(complaintMapper::toDTO)
                .collect(Collectors.toList());
    }
}
