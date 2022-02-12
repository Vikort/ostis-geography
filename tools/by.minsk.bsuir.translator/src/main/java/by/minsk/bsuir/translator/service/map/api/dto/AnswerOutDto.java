package by.minsk.bsuir.translator.service.map.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class AnswerOutDto {

    private String type;

    private Object properties;

    private List<OrganizationOutDto> features;
}
