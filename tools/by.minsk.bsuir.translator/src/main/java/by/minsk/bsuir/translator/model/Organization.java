package by.minsk.bsuir.translator.model;

import lombok.Data;

import java.util.List;

@Data
public class Organization {

    private final String id;

    private final String name;

    private final String address;

    private final String url;

    private final List<Phone> phones;

    private final List<Category> categories;

    private final String hoursText;

    private final List<Hour> hours;

    private final Float coordinateX;

    private final Float coordinateY;

}
