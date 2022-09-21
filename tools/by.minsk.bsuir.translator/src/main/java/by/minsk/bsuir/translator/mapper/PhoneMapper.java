package by.minsk.bsuir.translator.mapper;

import by.minsk.bsuir.translator.model.Phone;
import by.minsk.bsuir.translator.service.map.api.dto.PhoneOutDto;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class PhoneMapper {

    public static Phone toEntity(final PhoneOutDto dto) {
        return new Phone(dto.getType(), dto.getFormatted());
    }

    public static List<Phone> toEntity(final List<PhoneOutDto> dtoList) {

        return Objects.isNull(dtoList) ? List.of() : dtoList.stream()
                                                        .map(PhoneMapper::toEntity)
                                                        .collect(Collectors.toList());

    }

}
