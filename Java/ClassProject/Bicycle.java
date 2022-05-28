public class Bicycle {
  public String color;
  public int price;

  public Bicycle(String color, int price) {
    System.out.println("Bicycle constructor");
    this.color = color;
    this.price = price;
  }

  public void info() {
    System.out.println("color : " + color);
    System.out.println("price : " + price);
  }
}
