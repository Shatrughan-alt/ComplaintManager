package com.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.dto.ComplaintDTO;
import com.service.ComplaintService;




@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")

@Validated
public class HomeController {

    private ComplaintService complaintService;

    public HomeController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @GetMapping("/home")
    public String home() {
        return "Welcome to the Home Page!";
    }

    @GetMapping("/test")
    public String law() {
        return "law enforcement";
    }

    @PostMapping("/complaints")
    public ResponseEntity<String> createComplaint(@RequestBody ComplaintDTO complaintDTO) {
        System.out.println(complaintDTO);
        complaintService.addComplaint(complaintDTO);
        return ResponseEntity.ok("Complaint added successfully");
    }

    @GetMapping("/complaints/all")
    public ResponseEntity<List<ComplaintDTO>> getAllComplaints() {
        List<ComplaintDTO> list = complaintService.findAllComplaints();
        return new ResponseEntity<List<ComplaintDTO>>(list, HttpStatus.OK);
    }

    @GetMapping("/citizen/{citizenId}/allComplaints")
    public ResponseEntity<List<ComplaintDTO>> getAllComplaintsByCitizenId(@PathVariable Long citizenId) {
        List<ComplaintDTO> list = complaintService.findAllComplaintsCitizenId(citizenId);
        return new ResponseEntity<List<ComplaintDTO>>(list, HttpStatus.OK);
    }
}
