package com.repository;

import com.entity.Citizen;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CitizenRepository extends JpaRepository<Citizen, Integer> {

    Optional<Citizen> findByEmail(String email);

    Optional<Citizen> findByUuid(Long citizenId);

    @Query("SELECT id FROM Citizen c WHERE c.email = :email")
    String getUUIDByEmail(@Param("email") String email);

}
