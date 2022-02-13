import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) {
        try {
            for (Area area : Area.values()) {
                RequestSender requestSender = new RequestSender();
                ScsGenerator scsGenerator = new ScsGenerator();
                scsGenerator.generate(requestSender.getPolice(area.getLabel()), area.toString());
                TimeUnit.SECONDS.sleep(20);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
