package com.example.psi.parser;

import com.example.psi.entity.Company;
import com.example.psi.translator.Translator;
import com.example.psi.translator.TranslatorToSCS;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Parser {

    private Document document;
    private final String PHONE_NUMBER = "Контактный телефон";
    private final String NUMBER_OF_EMPLOYEES = "Количество сотрудников";
    private final String EMAIL = "Адрес электронной почты";
    private final String WEBSITE = "Веб-сайт";
    private final String UCN = "УНП";
    private final String ADDRESS = "Юридический адрес";
    private final String REGION = "Город";
    private final String COUNTRY = "Беларусь";
    private final String YEAR_REGISTRATION = "Год основания";


    public String parse() throws Exception {
//        Verse verse = new Verse(title, author);
        return setInfoFromFirstResource();
//        try {
//            setInfoFromSecondResource(verse);
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        return verse;
    }

    private String setInfoFromFirstResource() throws Exception {
        List<Company> companies = new ArrayList<>();
        int counter = 0;
        Translator translator = new Translator();
        TranslatorToSCS translatorToSCS = new TranslatorToSCS();
        StringBuilder result = new StringBuilder();
        for (int i = 1; i <= 1; i++) {
            String source = "https://www.park.by/residents/?q=&UNP=&save=%D0%9D%D0%B0%D0%B9%D1%82%D0%B8&search=Y&STAFF=&EXPER=&CITY%5B0%5D=608&CITY%5B1%5D=609&CITY%5B2%5D=610&CITY%5B3%5D=611&CITY%5B4%5D=612&CITY%5B5%5D=613&PAGEN_1=" + i;            document = Jsoup.connect(source).userAgent("Chrome/4.0.249.0 Safari/532.5").referrer("http://www.google.com").get();
            Elements listCompany = document.select("div.news-item");
            for (Element element : listCompany) {
                String redirect = element.select("a[href]").first().attr("href");
                counter++;
                Company company = new Company();
                String nameCompany = element.select("a[href]").first().child(0).toString();
                company.setName(nameCompany.substring(3, nameCompany.length() - 4));
                company.setNameEnglish(redirect.substring(11, redirect.length() -1));
                company.setCountry(COUNTRY);
                setFullInfo(company, redirect);
                companies.add(company);
                translator.translate(company);
                translatorToSCS.translate(company);
                String scsFile = translatorToSCS.getFile();

                System.out.println("Company #" + counter);
                System.out.println(company);
                System.out.println();
                System.out.println();
                System.out.println(scsFile);
                System.out.println();
                result.append(translator.getTranslate());
            }
        }
        return result.toString();
//        throw new Exception("entity.Verse not found!");

    }

    private void setFullInfo(Company company, String redirectPath) throws IOException {
        String source = "https://www.park.by" + redirectPath;
        document = Jsoup.connect(source).userAgent("Chrome/4.0.249.0 Safari/532.5").referrer("http://www.google.com").get();
        Elements elements = document.select("div.block-unde").select("div");
        boolean isSkip = true;
        for (Element element : elements) {
            if (isSkip) {
                isSkip = false;
                continue;
            }
            setField(company, element);
        }
    }

    private void setField(Company company, Element field) {
        String fullString = field.childNode(0).toString().substring(1);
        String nameField = fullString.substring(0, fullString.indexOf(":"));

        String value = getValue(nameField, field);
        switch (nameField) {
            case PHONE_NUMBER: {
                company.setPhoneNumber(value);
                break;
            }
            case NUMBER_OF_EMPLOYEES: {
                company.setNumberOfEmployees(value);
                break;
            }
            case EMAIL: {
                company.setEmail(value);
                break;
            }
            case WEBSITE: {
                company.setWebsite(value);
                break;
            }
            case UCN: {
                company.setUcn(value);
                break;
            }
            case ADDRESS: {
                company.setAddress(value);
                break;
            }
            case REGION: {
                company.setRegion(value);
                break;
            }
            case YEAR_REGISTRATION: {
                company.setYearRegistration(value);
                break;
            }
        }

    }

    private String getValue(String nameField, Element element) {
        String fullValue = element.childNode(0).toString();
        if (REGION.equals(nameField)) {
            return element.select("span").first().childNode(0).toString();
        }
        if (WEBSITE.equals(nameField)) {
            return element.select("a[href]").first().childNode(0).toString();
        }
        String substring = fullValue.substring(nameField.length() + 2);
        if (NUMBER_OF_EMPLOYEES.equals(nameField)) {
            String value = substring;
            value = value.replaceAll("&lt;", "<");
            value = value.replaceAll("&gt;", ">");
            return value;
        }
        return substring;
    }

//    private String searchVerseInFirstSource(Verse verse) throws Exception {
//        String source = "https://www.culture.ru/literature/poems?query=" + verse.getTitle().replace(' ', '+').toLowerCase(Locale.ROOT);
//        document = Jsoup.connect(source).userAgent("Chrome/4.0.249.0 Safari/532.5").referrer("http://www.google.com").get();
//        Elements listVerses = document.select("div.card-heading_head");
//        for (Element element : listVerses.select("div.card-heading_head")) {
//            if (element.select("a.card-heading_subtitle").text().toLowerCase(Locale.ROOT).contains(verse.getAuthor().toLowerCase(Locale.ROOT))
//                    && element.select("a.card-heading_title-link").text().toLowerCase(Locale.ROOT).contains(verse.getTitle().toLowerCase(Locale.ROOT))) {
//                return element.select("a.card-heading_title-link").attr("href");
//            }
//        }
//        throw new Exception("entity.Verse not found!");
//    }
//
//    private void setVerse(String source, Verse verse) throws IOException {
//        document = Jsoup.connect(source).userAgent("Chrome/4.0.249.0 Safari/532.5").referrer("http://www.google.com").get();
//        Elements listVerses = document.select("div.content-columns_block");
//        StringBuilder builder = new StringBuilder();
//        for (Element element : listVerses.select("p")) {
//            builder.append(element);
//        }
//        verse.setVerse(builder.toString());
//    }
//
//    private void setDate(String source, Verse verse) throws IOException {
//        document = Jsoup.connect(source).userAgent("Chrome/4.0.249.0 Safari/532.5").referrer("http://www.google.com").get();
//        Elements listVerses = document.select("div.content-columns_footer");
//        String date = listVerses.text();
//        if (!"".equals(date)) {
//            verse.setDate(Integer.parseInt(date.substring(0, date.length() - 3)));
//        }
//    }
//
//    private void setCentury(String source, Verse verse) throws IOException {
//        document = Jsoup.connect(source).userAgent("Chrome/4.0.249.0 Safari/532.5").referrer("http://www.google.com").get();
//        Elements listVerses = document.select("aside.js-tags.tags.tags__entity.tags__offset-bottom");
//        for (Element element : listVerses.select("span.button_text")) {
//            if (element.text().equals("Золотой век")) {
//                verse.setCentury(element.text());
//                return;
//            }
//            if (element.text().equals("Серебряный век")) {
//                verse.setCentury(element.text());
//                return;
//            }
//        }
//    }
//
//
//    private void setInfoFromSecondResource(Verse verse) throws Exception {
//        String source = "https://obrazovaka.ru/analiz-stihotvoreniya";
//        document = Jsoup.connect(source).userAgent("Chrome/4.0.249.0 Safari/532.5").referrer("http://www.google.com").get();
//        String linkVerse = searchVerseInSecondSource(verse);
//        document = Jsoup.connect(linkVerse).userAgent("Chrome/4.0.249.0 Safari/532.5").referrer("http://www.google.com").get();
//        elements = document.select("div.kratkiy-analiz");
//        setFoot(verse);
//        setTropes(verse);
//    }

}
