package by.minsk.bsuir.translator.mapper;

import by.minsk.bsuir.translator.model.Interval;
import by.minsk.bsuir.translator.service.map.api.dto.IntervalOutDto;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class IntervalMapper {

    public static Interval toEntity(final IntervalOutDto dto) {
        return new Interval(dto.getFrom(), dto.getTo());
    }

    public static List<Interval> toEntity(final List<IntervalOutDto> dtoList) {
        return Objects.isNull(dtoList) ? List.of() : dtoList.stream()
                                                        .map(IntervalMapper::toEntity)
                                                        .collect(Collectors.toList());

    }

}
