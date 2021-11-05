import random
import time

wordList = ["cat", "dog", "fox", "monkey",
            "mouse", "panda", "frog", "snake", "wolf"]

print("[Typing Game] Press the enter key if you are ready.")
input()
start = time.time()

for n in range(1, 5+1):
    question = random.choice(wordList)

    print("\n*Question", n)
    print(question)

    while True:
        answer = input()
        if question == answer:
            print("ALL RIGHT! Here we go!")
            break
        else:
            print("Try again!")

end = time.time()
diff = end - start
diff = format(diff, ".2f")
print("Total time :", diff, "s")
