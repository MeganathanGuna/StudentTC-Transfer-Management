package com.example.student_transfer_system.service;

import com.example.student_transfer_system.entity.TransferRequest;
import com.example.student_transfer_system.entity.Student;
import com.example.student_transfer_system.repository.StudentRepository;
import com.example.student_transfer_system.repository.TransferRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransferService {

    @Autowired
    private TransferRequestRepository transferRepository;

    @Autowired
    private StudentRepository studentRepository;

    public TransferRequest applyTransfer(TransferRequest request) {
        return transferRepository.save(request);
    }

    public List<TransferRequest> getTargetNotifications(String school) {
        List<TransferRequest> requests = transferRepository.findByTargetSchool(school);
        return enrichWithStudentInfo(requests);
    }

    public List<TransferRequest> getCurrentNotifications(String school) {
        List<TransferRequest> requests = transferRepository.findByCurrentSchoolAndStatus(school, "INSPECT");
        return enrichWithStudentInfo(requests);
    }

    public List<TransferRequest> getStudentNotifications(Long studentId) {
        List<TransferRequest> requests = transferRepository.findByStudentId(studentId);
        return enrichWithStudentInfo(requests);
    }

    public TransferRequest updateStatus(Long requestId, String newStatus) {
        TransferRequest request = transferRepository.findById(requestId).orElse(null);
        if (request != null) {
            request.setStatus(newStatus);
            return transferRepository.save(request);
        }
        return null;
    }

    public TransferRequest addRemarks(Long requestId, String remarks) {
        TransferRequest request = transferRepository.findById(requestId).orElse(null);
        if (request != null) {
            request.setRemarks(remarks);
            return transferRepository.save(request);
        }
        return null;
    }

    // Helper method: populate studentName and regId in the list
    private List<TransferRequest> enrichWithStudentInfo(List<TransferRequest> requests) {
        return requests.stream().map(req -> {
            Student student = studentRepository.findById(req.getStudentId()).orElse(null);
            if (student != null) {
                req.setStudentName(student.getName());
                req.setRegId(student.getRegId());
            } else {
                req.setStudentName("Unknown Student");
                req.setRegId("Unknown");
            }
            return req;
        }).collect(Collectors.toList());
    }
}