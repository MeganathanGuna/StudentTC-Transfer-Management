package com.example.student_transfer_system.repository;

import com.example.student_transfer_system.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRegId(String regId);
}