public enum Area {
    minsk("Минск"),
    gomel("Гомель"),
    vitebsk("Витебск"),
    grodno("Гродно"),
    mogilev("Могилёв"),
    brest("Брест");


    private final String label;

    Area(String label) {
        this.label = label;
    }

    public static Area fromString(String text) {
        for (Area a : Area.values()) {
            if (a.label.equalsIgnoreCase(text)) {
                return a;
            }
        }
        return null;
    }

    public String getLabel() {
        return this.label;
    }
}
