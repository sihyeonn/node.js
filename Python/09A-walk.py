import turtle as t
import random

t.shape("turtle")
t.speed(0)

for x in range(500):
    direction = random.randint(1, 360)
    t.setheading(direction)

    move = random.randint(1, 20)
    t.forward(move)
