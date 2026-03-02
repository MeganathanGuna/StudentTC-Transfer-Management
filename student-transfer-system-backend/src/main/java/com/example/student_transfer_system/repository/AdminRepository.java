package com.example.student_transfer_system.repository;

import com.example.student_transfer_system.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmpId(String empId);
}
