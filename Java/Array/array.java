import java.util.Arrays;

public class array {
  public static void main(String[] args) {
    int[] arr = new int[5];
    for (int i = 0; i < arr.length; i++) {
      arr[i] = i;
    }

    int[] arr2 = null;
    arr2 = Arrays.copyOf(arr, 0, arr.length);
    System.out.println(Arrays.toString(arr2));

    String[] names = { "Jane", "John", "James" };
    for (int i = 0; i < names.length; i++) {
      System.out.println(names[i]);
    }

    int[][] nestedArr = new int[3][2];
  }

}
