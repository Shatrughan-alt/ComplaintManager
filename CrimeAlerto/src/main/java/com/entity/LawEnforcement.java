package com.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Law_Enforcement")
public class LawEnforcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UUID")
    private Integer uuid;

    @Column(name = "police_station_name", nullable = false)
    private String policeStationName;

    @Column(name = "police_station_email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "police_station_contactNo", nullable = false)
    private Long policeStationContactNo;

    @Column(name = "SHO", nullable = false)
    private String sho;

    @Column(name = "Address", nullable = false)
    private String address;

    @Column(name ="Role")
    private String role = "LAW_ENFORCEMENT"; // Default role for law enforcement

    // Other fields, getters, and setters
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    @OneToMany(mappedBy = "assignedTo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Complaint> assignedComplaints;

    // Getters and Setters
    public Integer getUuid() {
        return uuid;
    }

    public void setUuid(Integer uuid) {
        this.uuid = uuid;
    }

    public String getPoliceStationName() {
        return policeStationName;
    }

    public void setPoliceStationName(String policeStationName) {
        this.policeStationName = policeStationName;
    }

    public String getPoliceStationEmail() {
        return email;
    }

    public void setPoliceStationEmail(String email) {
        this.email = email;
    }

    public Long getPoliceStationContactNo() {
        return policeStationContactNo;
    }

    public void setPoliceStationContactNo(Long policeStationContactNo) {
        this.policeStationContactNo = policeStationContactNo;
    }

    public String getSho() {
        return sho;
    }

    public void setSho(String sho) {
        this.sho = sho;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Complaint> getAssignedComplaints() {
        return assignedComplaints;
    }

    public void setAssignedComplaints(List<Complaint> assignedComplaints) {
        this.assignedComplaints = assignedComplaints;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}