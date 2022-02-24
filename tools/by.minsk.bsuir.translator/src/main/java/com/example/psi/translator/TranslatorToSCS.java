package com.example.psi.translator;

import com.example.psi.entity.Company;

import java.io.IOException;
import java.util.Locale;
import java.util.Objects;

public class TranslatorToSCS {
    private StringBuilder file;

    public void translate(Company company) throws IOException {
        file = new StringBuilder();
        setFields(company);
    }

    private void setFields(Company company) {
        setCompany(company);
        setBelarusianCompany();
        setMainIdtf();
        setName(company);
        setPhoneNumber(company);
        setEmail(company);
        setWebsite(company);
        setUCN(company);
        setAddress(company);
        setCountry();
        setRegion(company);
        setYearRegistration(company);
        setScope();
    }

    private void setCompany(Company company) {
        if ("".equals(company.getName()) || Objects.isNull(company.getName())) {
            return;
        }
        file.append("company_").append(company.getNameEnglish().replaceAll(" ", "_").replaceAll("-", "_")).append(" <- concept_company;\n");
    }

    private void setBelarusianCompany() {
        file.append("<- concept_belarusian_company;\n");
    }

    private void setMainIdtf() {
        file.append("=>nrel_main_idtf:\n");
    }

    private void setName(Company company) {
        if ("".equals(company.getName()) || Objects.isNull(company.getName())) {
            return;
        }
        file.append("\t")
                .append("[")
                .append(company.getName())
                .append("]\n")
                .append("\t(* <- lang_ru;; <- name_ru;; <- name;;*);\n");
    }

    private void setPhoneNumber(Company company) {
        if ("".equals(company.getPhoneNumber()) || Objects.isNull(company.getPhoneNumber())) {
            return;
        }
        String phoneNumber = company.getPhoneNumber();
        if (phoneNumber.contains(",") || phoneNumber.contains(".") || phoneNumber.contains("+")) {
            int firstLength = phoneNumber.indexOf(",");
            int secondLength = phoneNumber.indexOf(".");
            int newLength;
            if (secondLength != -1 && firstLength != -1) {
                newLength = Math.min(firstLength, secondLength);
            } else {
                newLength = Math.max(firstLength, secondLength);
            }
            int plusLength = phoneNumber.indexOf("+", 5);
            if (plusLength != 1) {
                newLength = newLength == -1 ? plusLength : Math.min(plusLength, newLength);
            }
            if (newLength != -1) {
                phoneNumber = phoneNumber.substring(0, newLength - 1);
            }
        }
        file.append("\t")
                .append("[")
                .append(phoneNumber.trim())
                .append("]\n")
                .append("\t(* <- concept_phone_number;;*);\n");
    }

    private void setEmail(Company company) {
        if ("".equals(company.getEmail()) || Objects.isNull(company.getEmail())) {
            return;
        }
        file.append("\t")
                .append("[")
                .append(company.getEmail().trim().replaceAll("-", "_"))
                .append("]\n")
                .append("\t(* <- concept_email;;*);\n");
    }

    private void setWebsite(Company company) {
        if ("".equals(company.getWebsite()) || Objects.isNull(company.getWebsite())) {
            return;
        }
        file.append("\t")
                .append("[")
                .append(company.getWebsite().trim().replaceAll("-", "_"))
                .append("]\n")
                .append("\t(* <- concept_website;;*);\n");
    }

    private void setUCN(Company company) {
        if ("".equals(company.getUcn()) || Objects.isNull(company.getUcn())) {
            return;
        }
        file.append("\t")
                .append("[")
                .append(company.getUcn().trim().replaceAll("-", "_"))
                .append("]\n")
                .append("\t(* <- concept_ucn;;*);\n");
    }

    private void setAddress(Company company) {
        if ("".equals(company.getAddress()) || Objects.isNull(company.getAddress())) {
            return;
        }
        file.append("\t")
                .append("[")
                .append(company.getAddress().trim().replaceAll("-", "_"))
                .append("]\n")
                .append("\t(* <- lang_ru;; <- name_ru;; <- concept_address;;*);\n");
    }

    private void setCountry() {
        file.append("=>nrel_country:\n\tbelarus;\n");
    }

    private void setRegion(Company company) {
        if ("".equals(company.getRegion()) || Objects.isNull(company.getRegion())) {
            return;
        }
        try {
            file.append("=>nrel_region:\n")
                    .append("\t")
                    .append(Translate.translate(company.getRegion()).toLowerCase(Locale.ROOT))
                    .append(";\n");
        } catch (IOException ignored) {

        }
    }

    private void setYearRegistration(Company company) {
        if ("".equals(company.getYearRegistration()) || Objects.isNull(company.getYearRegistration())) {
            return;
        }
        file.append("=>nrel_year_registration:\n\t")
                .append(company.getYearRegistration().trim().replaceAll("-", "_"))
                .append(";\n");
    }

    private void setScope() {
        file.append("=>nrel_scope:\n\tit;;\n\n");
    }

    public String getFile() {
        return file.toString();
    }

}
