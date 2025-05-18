package com.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dto.ComplaintDTO;
import com.entity.Complaint;
import com.service.ComplaintService;




@RestController
@RequestMapping("/api")
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
    public ResponseEntity<List<ComplaintDTO>> getAllComplaints(){
        List<ComplaintDTO> list=complaintService.findAllComplaints();
        return new ResponseEntity<List<ComplaintDTO>>(list, HttpStatus.OK);
    }
}
