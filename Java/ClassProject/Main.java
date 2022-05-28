public class Main {

  public static void main(String[] args) {
    Car myCar = new Car();
    myCar.color = "red";
    myCar.type = "auto";
    myCar.price = 200;

    myCar.run();
    myCar.stop();
    myCar.info();

    Bicycle myBicycle = new Bicycle("blue", 100);
    myBicycle.info();
  }
  
}
