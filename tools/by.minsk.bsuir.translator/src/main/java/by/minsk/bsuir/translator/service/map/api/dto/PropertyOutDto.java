package by.minsk.bsuir.translator.service.map.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class PropertyOutDto {

    private String name;

    private String description;

    private List<List<Float>> boundedBy;

    private CompanyMetaDataOutDto companyMetaData;

}
