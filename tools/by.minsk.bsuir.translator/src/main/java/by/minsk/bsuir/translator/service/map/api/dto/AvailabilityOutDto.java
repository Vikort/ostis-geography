package by.minsk.bsuir.translator.service.map.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class AvailabilityOutDto {

    private List<IntervalOutDto> intervals;

    private boolean everyday;

    private boolean twentyFourhours;

    private boolean monday;

    private boolean tuesday;

    private boolean wednesday;

    private boolean thursday;

    private boolean friday;

    private boolean saturday;

    private boolean sunday;

}
