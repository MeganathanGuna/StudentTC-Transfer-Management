package com.example.student_transfer_system.service;

import com.example.student_transfer_system.entity.Admin;
import com.example.student_transfer_system.entity.Student;
import com.example.student_transfer_system.repository.AdminRepository;
import com.example.student_transfer_system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AdminRepository adminRepository;

    public Student registerStudent(Student student) {
        // Check uniqueness of regId (simple, no exceptions for now)
        Optional<Student> existing = studentRepository.findByRegId(student.getRegId());
        if (existing.isPresent()) {
            return null; // or throw exception in real app
        }
        return studentRepository.save(student);
    }

    public Admin registerAdmin(Admin admin) {
        Optional<Admin> existing = adminRepository.findByEmpId(admin.getEmpId());
        if (existing.isPresent()) {
            return null;
        }
        return adminRepository.save(admin);
    }

    public Object login(String username, String password, String role) {
        if ("Student".equals(role)) {
            Optional<Student> student = studentRepository.findByRegId(username);
            if (student.isPresent() && password.equals(student.get().getPassword())) {
                return student.get();
            }
        } else if ("Admin".equals(role)) {
            Optional<Admin> admin = adminRepository.findByEmpId(username);
            if (admin.isPresent() && password.equals(admin.get().getPassword())) {
                return admin.get();
            }
        }
        return null; // login failed
    }

    // NEW: Public method to get student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // NEW: Public method to get admin by ID
    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    // Optional: If you want to get by regId or empId instead of numeric ID
    public Optional<Student> getStudentByRegId(String regId) {
        return studentRepository.findByRegId(regId);
    }

    public Optional<Admin> getAdminByEmpId(String empId) {
        return adminRepository.findByEmpId(empId);
    }
}
