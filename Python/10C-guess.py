import random

target = random.randint(1, 30)

while True:
    i = input("Guess the number(1~30): ")
    guess = int(i)
    if guess == target:
        print("ALL RIGHT!")
        break
    elif guess < target:
        print("Bigger than that.")
    else:
        print("Smaller than that.")
