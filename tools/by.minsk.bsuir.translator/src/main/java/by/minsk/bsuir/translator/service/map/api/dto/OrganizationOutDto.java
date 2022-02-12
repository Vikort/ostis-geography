package by.minsk.bsuir.translator.service.map.api.dto;

import lombok.Data;

@Data
public class OrganizationOutDto {

    private String type;

    private GeometryOutDto geometry;

    private PropertyOutDto properties;

}
