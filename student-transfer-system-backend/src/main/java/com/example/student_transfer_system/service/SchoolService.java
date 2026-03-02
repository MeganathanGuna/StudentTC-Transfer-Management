package com.example.student_transfer_system.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SchoolService {

    public List<String> getSchools() {
        return Arrays.asList(
                "Government Higher Secondary School, Mylapore",
                "Government Higher Secondary School, Velachery",
                "Government Higher Secondary School, Nandanam",
                "Jaigopal Garodia Government Girls Higher Secondary School, Saidapet",
                "Government Girls Higher Secondary School, Ashok Nagar",
                "Government Boys Higher Secondary School, Purasawalkam",
                "Government Model Higher Secondary School, Thousand Lights",
                "Government Higher Secondary School, Triplicane",
                "Government Higher Secondary School, Egmore",
                "Government Adi Dravidar Welfare Higher Secondary School (multiple locations)",
                "Government Kallar Reclamation Higher Secondary School (various branches)",
                "Dr. Ambedkar Government Higher Secondary School, Egmore",
                "Government Higher Secondary School, Arumbakkam",
                "Government Higher Secondary School, Ashok Nagar",
                "Government Higher Secondary School, K.K. Nagar",
                "Madras Christian College Higher Secondary School (MCC), Tambaram / Chetpet",
                "Chintadripet Boys Higher Secondary School, Chintadripet",
                "Guru Nanak Matriculation Higher Secondary School, Velachery",
                "St. Bede's Anglo Indian Higher Secondary School, Santhome",
                "Sacred Heart Matriculation Higher Secondary School, Church Park",
                "Rani Meyyammai Girls Higher Secondary School, Adyar",
                "The Hindu Higher Secondary School, Triplicane",
                "K.C. Sankaralinga Nadar Higher Secondary School, Old Washermanpet",
                "Santhome Higher Secondary School, Mylapore",
                "St. Joseph's Girls Higher Secondary School (various branches)",
                "CSI Monahan Girls Higher Secondary School, Royapettah",
                "Besant Theosophical Higher Secondary School, Besant Nagar",
                "Ganapathy Iyer Girls Higher Secondary School, Gopalapuram",
                "Advent Christian Higher Secondary School, Velachery",
                "Sri Goutamchand Kothari Jain Higher Secondary School, Royapuram"
        );
    }
}
