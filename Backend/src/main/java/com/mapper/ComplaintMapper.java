package com.mapper;

import org.springframework.stereotype.Component;

import com.dto.ComplaintDTO;
import com.entity.Citizen;
import com.entity.Complaint;
import com.entity.LawEnforcement;

@Component
public class ComplaintMapper {

    // Convert ComplaintDTO to Complaint entity
    public Complaint toEntity(ComplaintDTO complaintDTO) {
        Complaint complaint = new Complaint();
        complaint.setUuid(complaintDTO.getUuid());
        complaint.setTitle(complaintDTO.getTitle());
        complaint.setDescription(complaintDTO.getDescription());
        complaint.setSupportingDocument(complaintDTO.getSupportingDocument());
        complaint.setIncidentLocationLat(complaintDTO.getIncidentLocationLat());
        complaint.setIncidentLocationLong(complaintDTO.getIncidentLocationLong());
        complaint.setStatus(complaintDTO.getStatus());
        complaint.setCreatedAt(complaintDTO.getCreatedAt());

        // Set witness (Citizen) if witnessId is provided
        if (complaintDTO.getWitnessId() != null) {
            Citizen witness = new Citizen();
            witness.setUuid(complaintDTO.getWitnessId());
            complaint.setWitness(witness);
        }

        // Set assignedTo (LawEnforcement) if assignedToId is provided
        if (complaintDTO.getAssignedToId() != null) {
            LawEnforcement assignedTo = new LawEnforcement();
            assignedTo.setUuid(complaintDTO.getAssignedToId());
            complaint.setAssignedTo(assignedTo);
        }

        return complaint;
    }

    // Convert Complaint entity to ComplaintDTO
    public ComplaintDTO toDTO(Complaint complaint) {
        ComplaintDTO complaintDTO = new ComplaintDTO();
        complaintDTO.setUuid(complaint.getUuid());
        complaintDTO.setTitle(complaint.getTitle());
        complaintDTO.setDescription(complaint.getDescription());
       complaintDTO.setSupportingDocument(complaint.getSupportingDocument());
        complaintDTO.setIncidentLocationLat(complaint.getIncidentLocationLat());
        complaintDTO.setIncidentLocationLong(complaint.getIncidentLocationLong());
        complaintDTO.setStatus(complaint.getStatus());
        complaintDTO.setCreatedAt(complaint.getCreatedAt());

        // Set witnessId if witness is not null
        if (complaint.getWitness() != null) {
            complaintDTO.setWitnessId(complaint.getWitness().getUuid());
        }

        // Set assignedToId if assignedTo is not null
        if (complaint.getAssignedTo() != null) {
            complaintDTO.setAssignedToId(complaint.getAssignedTo().getUuid());
        }

        return complaintDTO;
    }
}