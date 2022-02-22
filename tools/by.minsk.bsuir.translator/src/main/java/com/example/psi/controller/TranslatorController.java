package com.example.psi.controller;

import com.example.psi.entity.Company;
import com.example.psi.parser.Parser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslatorController {

    @GetMapping("/")
    public String getTranslate() throws Exception {
        Parser parser = new Parser();
        return parser.parse();
    }
}
