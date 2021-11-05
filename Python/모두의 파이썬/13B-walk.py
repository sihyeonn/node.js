import turtle as t
import random

MOVE = 10


def turn_right():
    t.setheading(0)
    t.forward(MOVE)


def turn_up():
    t.setheading(90)
    t.forward(MOVE)


def turn_left():
    t.setheading(180)
    t.forward(MOVE)


def turn_down():
    t.setheading(270)
    t.forward(MOVE)


def blank():
    t.clear()


def change_color():
    x = random.randint(0, 10)
    mod = x % 3

    if mod == 0:
        t.color("red")
    elif mod == 1:
        t.color("yellow")
    else:
        t.color("blue")


t.shape("turtle")
t.speed(0)
t.onkeypress(turn_right, "Right")
t.onkeypress(turn_up, "Up")
t.onkeypress(turn_left, "Left")
t.onkeypress(turn_down, "Down")
t.onkeypress(blank, "Escape")
t.onkeypress(change_color, "space")
t.listen()
