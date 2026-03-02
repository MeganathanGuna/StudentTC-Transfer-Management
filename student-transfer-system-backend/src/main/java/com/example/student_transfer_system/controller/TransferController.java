package com.example.student_transfer_system.controller;

import com.example.student_transfer_system.entity.TransferRequest;
import com.example.student_transfer_system.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {

    @Autowired
    private TransferService transferService;

    @PostMapping("/apply")
    public ResponseEntity<TransferRequest> apply(@RequestBody TransferRequest request) {
        return ResponseEntity.ok(transferService.applyTransfer(request));
    }

    // Target admin notifications
    @GetMapping("/target/{school}")
    public List<TransferRequest> getTargetNotifications(@PathVariable String school) {
        return transferService.getTargetNotifications(school);
    }

    // Current admin notifications (inspections)
    @GetMapping("/current/{school}")
    public List<TransferRequest> getCurrentNotifications(@PathVariable String school) {
        return transferService.getCurrentNotifications(school);
    }

    // Student notifications
    @GetMapping("/student/{studentId}")
    public List<TransferRequest> getStudentNotifications(@PathVariable Long studentId) {
        return transferService.getStudentNotifications(studentId);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<TransferRequest> updateStatus(@PathVariable Long id, @RequestParam String status) {
        TransferRequest updated = transferService.updateStatus(id, status);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/remarks/{id}")
    public ResponseEntity<TransferRequest> addRemarks(@PathVariable Long id, @RequestParam String remarks) {
        TransferRequest updated = transferService.addRemarks(id, remarks);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }
}
