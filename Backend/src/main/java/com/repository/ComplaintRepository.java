package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Citizen;
import com.entity.Complaint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {


    @Query("SELECT c FROM Complaint c WHERE c.witness = :citizenId")
    List<Complaint> fetchComplaintWhereCitizenId(@Param("citizenId") Citizen citizenId);

    
    // @Query("SELECT c FROM Complaint c WHERE c.uuid = :complaintId")
    // Optional<Complaint> getByComplaintId(Integer complaintId);

    @Query("SELECT c.supportingDocument FROM Complaint c WHERE c.uuid = :complaintId")
    Optional<String> getUploadedDocument(@Param("complaintId") Integer complaintId);
}