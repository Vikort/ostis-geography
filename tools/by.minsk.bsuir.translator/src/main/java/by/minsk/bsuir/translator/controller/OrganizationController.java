package by.minsk.bsuir.translator.controller;

import by.minsk.bsuir.translator.model.Organization;
import by.minsk.bsuir.translator.service.map.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("organizations")
public class OrganizationController {

    private static final String ORGANIZATION_NAME_RU = "Евроопт";

    private static final int LIMIT = 10;

    private static final String  PATH = "E:\\evroopts\\";

    private static final String ORGANIZATION_NAME_EN = "evroopt";

    private static final String PATTERN = "%s <- concept_chain_store;\n" +
                                           "=> nrel_main_idtf:\n" +
                                           "[%s]\n" +
                                           "(* <- lang_ru;; <- name_ru;; <- name;;*);\n" +
                                           "[%f]\n" +
                                           "(* <- lang_ru;; <- latitude;;*);\n" +
                                           "[%f]\n" +
                                           "(* <- lang_ru;; <- longitude;;*);\n" +
                                           "=>nrel_search_area: \n" +
                                           "minsk;;\n";

    private final OrganizationService organizationService;

    @GetMapping
    public List<Organization> getOrganizations() {

        final List<Organization> organizations = this.organizationService.getOrganizationsWithName(ORGANIZATION_NAME_RU, LIMIT);

        organizations.forEach(
                organization -> {
                    try (final FileWriter writer = new FileWriter(String.format("%s%s_%s.scs", PATH, ORGANIZATION_NAME_EN, organization.getId()), false))
                    {

                        writer.write(
                                String.format(
                                        PATTERN,
                                        String.format("%s_%s", ORGANIZATION_NAME_EN, organization.getId()),
                                        organization.getName(),
                                        organization.getCoordinateX(),
                                        organization.getCoordinateY()
                                )
                        );

                        writer.flush();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
        );

        return organizations;
    }

}
