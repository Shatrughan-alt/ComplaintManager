package com.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "Complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UUID")
    private Integer uuid;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "supporting_Document")
    private String supportingDocument;

    @Column(name = "incident_location_lat", nullable = false)
    private Double incidentLocationLat;

    @Column(name = "incident_location_long", nullable = false)
    private Double incidentLocationLong;

    @Column(name = "status", nullable = false)
    private String status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "witness_id", nullable = false)
    private Citizen witness;

    @ManyToOne
    @JoinColumn(name = "assignedTo")
    private LawEnforcement assignedTo;

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

    public String getSupportingDocument() {
        return supportingDocument;
    }

    public void setSupportingDocument(String supportingDocument) {
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

    public Citizen getWitness() {
        return witness;
    }

    public void setWitness(Citizen witness) {
        this.witness = witness;
    }

    public LawEnforcement getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(LawEnforcement assignedTo) {
        this.assignedTo = assignedTo;
    }
}