package by.minsk.bsuir.translator.mapper;

import by.minsk.bsuir.translator.model.Hour;
import by.minsk.bsuir.translator.model.Organization;
import by.minsk.bsuir.translator.service.map.api.dto.OrganizationOutDto;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class OrganizationMapper {

    public static Organization toEntity(final OrganizationOutDto dto) {

        String hoursText = "Круглосуточно";
        List<Hour> hours = List.of();

        if (Objects.nonNull(dto.getProperties().getCompanyMetaData().getHours())) {

            hoursText = dto.getProperties().getCompanyMetaData().getHours().getText();

            if (Objects.nonNull(dto.getProperties().getCompanyMetaData().getHours().getAvailabilities())) {
                hours = HourMapper.toEntity(dto.getProperties().getCompanyMetaData().getHours().getAvailabilities());
            }
        }

        return new Organization(
                dto.getProperties().getCompanyMetaData().getId(),
                dto.getProperties().getName(),
                dto.getProperties().getCompanyMetaData().getAddress(),
                dto.getProperties().getCompanyMetaData().getUrl(),
                PhoneMapper.toEntity(dto.getProperties().getCompanyMetaData().getPhones()),
                CategoryMapper.toEntity(dto.getProperties().getCompanyMetaData().getCategories()),
                hoursText,
                hours,
                dto.getGeometry().getCoordinates().get(0),
                dto.getGeometry().getCoordinates().get(1)
        );
    }

    public static List<Organization> toEntity(final List<OrganizationOutDto> dtoList) {
        return dtoList.stream()
                .map(OrganizationMapper::toEntity)
                .collect(Collectors.toList());
    }


}
