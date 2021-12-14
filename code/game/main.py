from re import A, escape
from ursina import *
from random import randint

from ursina.camera import Camera
from player import Player
from cannonball import CannonBall
# from ursina import texture

# input
def input(key):
    if key == 'esc':
        app.running = False

    if mouse.left:
        CannonBall(player.x, player.y, mouse.x, mouse.y)

app = Ursina()
player = Player(0,0)
background = Entity(model='quad', scale_x=15, scale_y=10, texture='Sample.png', z = 0.01)



app.run()