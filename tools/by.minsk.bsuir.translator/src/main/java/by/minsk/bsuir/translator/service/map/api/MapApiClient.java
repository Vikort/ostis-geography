package by.minsk.bsuir.translator.service.map.api;

import reactor.core.publisher.Mono;

public interface MapApiClient {

    Mono<String> requestOrganizationInformation(final String organizationName, final int resultCount);

}
