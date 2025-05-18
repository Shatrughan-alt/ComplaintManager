package com.repository;

import com.entity.Citizen;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitizenRepository extends JpaRepository<Citizen, Integer> {

    Optional<Citizen> findByEmail(String email);

}
