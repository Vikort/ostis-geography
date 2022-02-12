package by.minsk.bsuir.translator.service.map.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class GeometryOutDto {

    private String type;

    private List<Float> coordinates;


}
