# input
import time
name = input("What's your name? : ")
print("HELLO!!!!", name)

# multi
x = input("a ? : ")
a = int(x)
x = input("b ? : ")
b = int(x)
print("a * b =", a * b)

# timer
input("\nCount 20s after pressing enter key")
start = time.time()
input("Press enter key again after counting 20s")
end = time.time()
diff = end - start
print("실제 시간 :", diff, "초")
print("차이는요? :", abs(diff - 20), "초 입니다.")
