package com.example.psi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Company {
    private String name;
    private String phoneNumber;
    private String numberOfEmployees;
    private String email;
    private String website;
    private String ucn;
    private String address;
    private String country;
    private String region;
    private String yearRegistration;
    private String nameEnglish;
}
