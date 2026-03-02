package com.example.student_transfer_system.controller;

import com.example.student_transfer_system.entity.Admin;
import com.example.student_transfer_system.entity.Student;
import com.example.student_transfer_system.service.UserService;
import com.example.student_transfer_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register/student")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        Student saved = userService.registerStudent(student);
        if (saved == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/register/admin")
    public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
        Admin saved = userService.registerAdmin(admin);
        if (saved == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestParam String username, @RequestParam String password, @RequestParam String role) {
        Object user = userService.login(username, password, role);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(user);
    }

    // Fixed: Get student profile
    @GetMapping("/student/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {
        Optional<Student> student = userService.getStudentById(id);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Fixed: Get admin profile
    @GetMapping("/admin/{id}")
    public ResponseEntity<Admin> getAdmin(@PathVariable Long id) {
        Optional<Admin> admin = userService.getAdminById(id);
        if (admin.isPresent()) {
            return ResponseEntity.ok(admin.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Bonus: If you prefer to fetch by regId / empId (more natural for login)
    @GetMapping("/student/reg/{regId}")
    public ResponseEntity<Student> getStudentByRegId(@PathVariable String regId) {
        Optional<Student> student = userService.getStudentByRegId(regId);
        return student.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/admin/emp/{empId}")
    public ResponseEntity<Admin> getAdminByEmpId(@PathVariable String empId) {
        Optional<Admin> admin = userService.getAdminByEmpId(empId);
        return admin.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
