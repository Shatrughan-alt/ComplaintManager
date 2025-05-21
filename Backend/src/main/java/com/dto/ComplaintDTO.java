package com.dto;

import java.sql.Blob;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.validation.constraints.NotEmpty;

public class ComplaintDTO {

    private Integer uuid;
    private String title;
    @NotEmpty(message = "Description cannot be empty")
    private String description;
    private Blob supportingDocument;
    private Double incidentLocationLat;
    private Double incidentLocationLong;
    private String status;
    @CreationTimestamp
    private LocalDateTime createdAt;
    private Integer witnessId;
    private Integer assignedToId;

    // Getters and Setters
    public Integer getUuid() {
        return uuid;
    }

    public void setUuid(Integer uuid) {
        this.uuid = uuid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Blob getSupportingDocument() {
        return supportingDocument;
    }
    public void setSupportingDocument(Blob supportingDocument) {
        this.supportingDocument = supportingDocument;
    }
    public Double getIncidentLocationLat() {
        return incidentLocationLat;
    }

    public void setIncidentLocationLat(Double incidentLocationLat) {
        this.incidentLocationLat = incidentLocationLat;
    }

    public Double getIncidentLocationLong() {
        return incidentLocationLong;
    }

    public void setIncidentLocationLong(Double incidentLocationLong) {
        this.incidentLocationLong = incidentLocationLong;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getWitnessId() {
        return witnessId;
    }

    public void setWitnessId(Integer witnessId) {
        this.witnessId = witnessId;
    }

    public Integer getAssignedToId() {
        return assignedToId;
    }

    public void setAssignedToId(Integer assignedToId) {
        this.assignedToId = assignedToId;
    }

    public ComplaintDTO(Integer uuid, String title, String description, Blob supportingDocument,
            Double incidentLocationLat, Double incidentLocationLong, String status, LocalDateTime createdAt,
            Integer witnessId, Integer assignedToId) {
        this.title = title;
        this.description = description;
        this.supportingDocument = supportingDocument;
        this.incidentLocationLat = incidentLocationLat;
        this.incidentLocationLong = incidentLocationLong;
        this.status = status;
        this.createdAt = createdAt;
        this.witnessId = witnessId;
        this.assignedToId = assignedToId;
    }

    public ComplaintDTO(){}

    @Override
    public String toString() {
        return "ComplaintDTO [uuid=" + uuid + ", title=" + title + ", description=" + description
                + ", supportingDocument=" + supportingDocument + ", incidentLocationLat=" + incidentLocationLat
                + ", incidentLocationLong=" + incidentLocationLong + ", status=" + status + ", createdAt=" + createdAt
                + ", witnessId=" + witnessId + ", assignedToId=" + assignedToId + "]";
    }

    

}