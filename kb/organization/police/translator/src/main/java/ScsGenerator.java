import com.ibm.icu.text.Transliterator;
import org.apache.commons.text.StrSubstitutor;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class ScsGenerator {
    private static final String CYRILLIC_TO_LATIN = "Russian-Latin/BGN";
    final String[] replaceCharacters = {"\\", " ", "/", "^", "$", "{", "}", "[", "]", "(", ")", "*", "+", "?", "|", "<", ">", "-", "&", "%", "\""};
    final String[] deleteCharacters = {"'", "(", ")", ".", "ʹ", "·", " ", "#"};

    public void generate(List<Map<String, Object>> police, String area) {
        try {
            for (Map m : police) {
                Map<String, String> data = new HashMap<String, String>();
                Object name = ((Map) m.get("tags")).get("name");
                if (name != null) {
                    String id = translate(name.toString().toLowerCase());
                    String result = Template.CONCEPT;
                    data.put("nameRu", name.toString());

                    if (((Map) m.get("tags")).get("name:en") != null) {
                        result += Template.NAME_EN;
                        id = ((Map) m.get("tags")).get("name:en").toString();
                        data.put("nameEn", id);
                    }
                    if (((Map) m.get("tags")).get("name:be") != null) {
                        result += Template.NAME_BEL;
                        data.put("nameBel", ((Map) m.get("tags")).get("name:be").toString());
                    }

                    id = id.trim();
                    for (String i : replaceCharacters) {
                        id = id.replace(i, "_");
                    }
                    for (String i : deleteCharacters) {
                        id = id.replace(i, "");
                    }

                    id = id.replace("№", "n");
                    data.put("id", id.toLowerCase());
                    data.put("area", area);
                    Path path = Paths.get("C:/work/PoliceTranslator/data/" + area + "/" + id.toLowerCase() + ".scs");
                    result = StrSubstitutor.replace(result + Template.NAME_RU + Template.AREA, data);
                    byte[] bs = result.getBytes();
                    Path writtenFilePath = Files.write(path, bs);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String translate(String text) {
        Transliterator toLatinTrans = Transliterator.getInstance(CYRILLIC_TO_LATIN);
        return toLatinTrans.transliterate(text);
    }

}
