package com.controller;

import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.dto.ComplaintDTO;
import com.entity.Complaint;
import com.repository.ComplaintRepository;
import com.service.ComplaintService;

import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
@Validated
public class HomeController {

    private ComplaintService complaintService;
    private ComplaintRepository complaintRepository;
    public HomeController(ComplaintService complaintService,ComplaintRepository complaintRepository) {
        this.complaintService = complaintService;
        this.complaintRepository=complaintRepository;
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
    public ResponseEntity<String> createComplaint(@RequestBody ComplaintDTO complaintDTO){
       
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

    @GetMapping("/complaints/{complaintId}")
    public ResponseEntity<ComplaintDTO> getComplaintById(@PathVariable Integer complaintId) {
        return ResponseEntity.ok(complaintService.getComplaintById(complaintId));
    }

    @GetMapping("/complaints/{complaintId}/uploadedDocument")
    public ResponseEntity<String> getUploadedDocument(@PathVariable Integer complaintId) {
        return ResponseEntity.ok(complaintService.getUploadedDocument(complaintId));
    }

    @GetMapping("/complaints/{complaintId}/download")
    public ResponseEntity<Resource> downloadUploadedDocument(@PathVariable Integer complaintId) {
        // Get the file path from your service (e.g., "/media/filename.pdf")
        String filePath = complaintService.getUploadedDocument(complaintId);
        try {
            // Adjust the base directory as per your storage location
            Path file = Paths.get("src/media").resolve(Paths.get(filePath).getFileName().toString());
            Resource resource = new UrlResource(file.toUri());
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


@PutMapping("/api/complaints/{complaintId}/status")
public ResponseEntity<?> updateStatus(@PathVariable Integer complaintId, @RequestBody Map<String, String> body) {
    try {
        String newStatus = body.get("status");
        Complaint complaint = complaintRepository.findById(complaintId)
            .orElseThrow(() -> new RuntimeException("No Complaint found with ID: " + complaintId));
        complaint.setStatus(newStatus);
        complaintRepository.save(complaint);
        return ResponseEntity.ok("Status updated successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating status");
    }
}




    
}