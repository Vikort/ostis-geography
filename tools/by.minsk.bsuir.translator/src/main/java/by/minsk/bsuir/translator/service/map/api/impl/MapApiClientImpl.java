package by.minsk.bsuir.translator.service.map.api.impl;

import by.minsk.bsuir.translator.service.map.api.MapApiClient;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class MapApiClientImpl implements MapApiClient {

    private static final String MAP_API_URI_TEMPLATE = "https://search-maps.yandex.ru/v1/?text=%s&type=%s&lang=%s&results=%d&apikey=%s";

    private static final String OBJECT_TYPE = "biz";

    private static final String LANGUAGE_RU = "ru_RU";

    private static final String API_KEY = "97c0f823-ee33-4f25-86aa-70313d92305e";

    private static final WebClient CLIENT = WebClient.create();

    public Mono<String> requestOrganizationInformation(final String organizationName, final int limit) {
        return CLIENT.get()
                .uri(String.format(MAP_API_URI_TEMPLATE, organizationName, OBJECT_TYPE, LANGUAGE_RU, limit, API_KEY))
                .retrieve()
                .bodyToMono(String.class);
    }

}
