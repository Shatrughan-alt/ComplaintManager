package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    // Additional custom methods if needed
}