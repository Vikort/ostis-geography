package by.minsk.bsuir.translator.service.map.impl;

import by.minsk.bsuir.translator.mapper.OrganizationMapper;
import by.minsk.bsuir.translator.model.Organization;
import by.minsk.bsuir.translator.service.map.OrganizationService;
import by.minsk.bsuir.translator.service.map.api.MapApiClient;
import by.minsk.bsuir.translator.service.map.api.dto.AnswerOutDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OrganizationServiceImpl implements OrganizationService {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final MapApiClient mapApiClient;

    private static final Map<String, String> WORDS_FOR_REPLACING = Map.of(
            "CompanyMetaData", "companyMetaData",
            "Categories", "categories",
            "class", "clazz",
            "Phones", "phones",
            "Everyday", "everyday",
            "TwentyFourhours", "twentyFourhours",
            "Hours", "hours",
            "Availabilities", "availabilities",
            "Intervals", "intervals"
    );

    private static final Map<String, String> DAYS = Map.of(
            "Monday", "monday",
            "Tuesday", "tuesday",
            "Wednesday", "wednesday",
            "Thursday", "thursday",
            "Friday", "friday",
            "Saturday", "saturday",
            "Sunday", "sunday"
    );

    @SneakyThrows
    public List<Organization> getOrganizationsWithName(final String name, final int limit) {
        final Optional<String> optionalJson = this.mapApiClient
                                                    .requestOrganizationInformation(name, limit)
                                                    .blockOptional();

        if (optionalJson.isPresent()) {

            String json = this.replaceAll(optionalJson.get(), WORDS_FOR_REPLACING);
            json = this.replaceAll(json, DAYS);

            final AnswerOutDto answer = OBJECT_MAPPER.readValue(json, AnswerOutDto.class);

            return OrganizationMapper.toEntity(answer.getFeatures());
        }

        return List.of();
    }


    private String replaceAll(String line, Map<String, String> forReplacing) {
        for (String key : forReplacing.keySet()) {
            line = this.replaceAll(line, key, forReplacing.get(key));
        }

        return line;
    }

    private String replaceAll(String line, final String a, final String b) {

        int p = line.indexOf(a);
        while (p >= 0) {
            line = line.replace(a, b);
            p = line.indexOf(a);
        }

        return line;
    }

}
