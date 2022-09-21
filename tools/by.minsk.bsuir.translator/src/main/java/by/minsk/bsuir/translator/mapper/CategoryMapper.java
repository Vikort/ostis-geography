package by.minsk.bsuir.translator.mapper;

import by.minsk.bsuir.translator.model.Category;
import by.minsk.bsuir.translator.service.map.api.dto.CategoryOutDto;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryMapper {

    public static Category toEntity(final CategoryOutDto dto) {
        return new Category(dto.getClazz(), dto.getName());
    }

    public static List<Category> toEntity(final List<CategoryOutDto> dtoList) {
        return dtoList.stream()
                .map(CategoryMapper::toEntity)
                .collect(Collectors.toList());
    }

}
