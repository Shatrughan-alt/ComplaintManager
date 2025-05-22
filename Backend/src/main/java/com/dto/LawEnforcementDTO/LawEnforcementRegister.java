
package com.dto.LawEnforcementDTO;

public class LawEnforcementRegister {
    private String policeStationName;
    private String policeStationEmail;
    private Long policeStationContactNo;
    private String sho;
    private String address;
    private String password;

    // Getters and Setters

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPoliceStationName() {
        return policeStationName;
    }

    public void setPoliceStationName(String policeStationName) {
        this.policeStationName = policeStationName;
    }

    public String getPoliceStationEmail() {
        return policeStationEmail;
    }

    public void setPoliceStationEmail(String policeStationEmail) {
        this.policeStationEmail = policeStationEmail;
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

}
