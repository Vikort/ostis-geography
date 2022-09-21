package by.minsk.bsuir.translator.service.map.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class CompanyMetaDataOutDto {

    private String id;

    private String name;

    private String address;

    private String url;

    private List<PhoneOutDto> phones;

    private List<CategoryOutDto> categories;

    private HourOutDto hours;

}
