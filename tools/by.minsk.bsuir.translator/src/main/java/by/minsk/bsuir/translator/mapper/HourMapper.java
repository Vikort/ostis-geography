package by.minsk.bsuir.translator.mapper;

import by.minsk.bsuir.translator.model.Hour;
import by.minsk.bsuir.translator.service.map.api.dto.AvailabilityOutDto;

import java.util.List;
import java.util.stream.Collectors;

public class HourMapper {

    public static Hour toEntity(final AvailabilityOutDto dto) {
        return new Hour(IntervalMapper.toEntity(dto.getIntervals()), dto.isEveryday());
    }

    public static List<Hour> toEntity(final List<AvailabilityOutDto> dtoList) {
        return dtoList.stream()
                .map(HourMapper::toEntity)
                .collect(Collectors.toList());
    }

}
