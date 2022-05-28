public class Car {
  public String color;
  public String type;
  public int price;

  public Car() {
    System.out.println("Car constructor");
  }

  public void run() {
    System.out.println("run ---------->");
  }

  public void stop() {
    System.out.println("stop <---------");
  }

  public void info() {
    System.out.println("color: " + color);
    System.out.println("type: " + type);
    System.out.println("price: " + price);
  }
}
