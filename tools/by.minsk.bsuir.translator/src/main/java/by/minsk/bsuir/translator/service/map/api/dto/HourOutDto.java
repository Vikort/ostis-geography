package by.minsk.bsuir.translator.service.map.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class HourOutDto {

    private String text = "None";

    private List<AvailabilityOutDto> availabilities;

}
