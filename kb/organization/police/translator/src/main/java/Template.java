public final class Template {
    public static final String CONCEPT = "${id} <- concept_police;\n" +
            "=>nrel_main_idtf:\n";
    public static final String NAME_EN = "    [${nameEn}]\n" +
            "    (* <- lang_en;; <- name_en;;*);\n";
    public static final String NAME_BEL = "    [${nameBel}]\n" +
            "    (* <- lang_bel;; <- name_en;;*);\n";
    public static final String NAME_RU =  "    [${nameRu}]\n" +
            "    (* <- lang_ru;; <- name_ru;; <- name;;*);\n";
    public static final String AREA = "=>nrel_search_area:\n" +
            "    ${area};;";

    private Template(){}
}
