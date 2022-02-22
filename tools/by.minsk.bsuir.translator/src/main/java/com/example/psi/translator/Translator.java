package com.example.psi.translator;

import com.example.psi.entity.Company;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class Translator {
    private final TranslatorToSCS translatorToSCS;
    private final String GOLDEN_AGE = "Золотой век";
    private final String SILVER_AGE = "Серебряный век";

    public Translator() {
        translatorToSCS = new TranslatorToSCS();
    }

    public void translate(Company company) {
        try {
            translatorToSCS.translate(company);
            writeCSCInFile(company);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    private void writeCSCInFile(Company company) throws IOException {
        String path = "C:\\Users\\KliautsevichA\\IdeaProjects\\translator\\hui\\";
        new File(path).mkdir();
        File file = new File(String.format("%s/%s.scs", path, company.getNameEnglish().replaceAll("-", "_")));
        try (FileWriter writer = new FileWriter(file)) {
            writer.write(translatorToSCS.getFile());
        }
    }

    public String getTranslate() {
        return translatorToSCS.getFile();
    }

}
