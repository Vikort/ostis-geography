package by.minsk.bsuir.translator.service.map;

import by.minsk.bsuir.translator.model.Organization;

import java.util.List;

public interface OrganizationService {

    List<Organization> getOrganizationsWithName(final String name, final int limit);

}
