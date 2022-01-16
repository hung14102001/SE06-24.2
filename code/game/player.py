import os
from ursina import *
import time
import random
from sea import Restrictor, CoinPart


class Player(Entity):
    __instance = None
    @staticmethod 
    def getInstance():
      """ Static access method. """
      if Player.__instance == None:
         Player(random.randint(10, 19), random.randint(10, 19))
      return Player.__instance

    def __init__(self, position_x, position_y):
        """ Virtually private constructor. """
        if Player.__instance != None:
            self.x = position_x
            self.y = position_y
            return self
        else:
            Player.__instance = self

        super().__init__(
            model='cube',
            collider = 'box',
            texture=os.path.join("Ships", "ship_4.png"),
            x=position_x,
            y=position_y,
            score = 0,
            rotation_z = 0,
            z=0,
            scale_x=1,
            scale_y=2,
        )
        self.speed = 0.15
        self.reload = time.time()
        self.level = 1
        self.team = 1
        self.healthbar_pos = Vec2(0, -0.1)
        self.healthbar_size = Vec2(0.2, 0.02)
        self.healthbar_bg = Entity(
            parent=camera.ui,
            model="quad",
            color= color.rgb(255, 0, 0),
            position=self.healthbar_pos,
            scale=self.healthbar_size
        )
        self.healthbar = Entity(
            parent=camera.ui,
            model="quad",
            color=color.rgb(0, 255, 0),
            position=self.healthbar_pos,
            scale=self.healthbar_size
        )
        
        self.health = 100
        self.text = Text(
            text="Score: " + str(self.score), 
            color=color.rgb(0,0,0), 
            scale = 2.5, 
            position=(-0.8,0.5,0)
        )

        fire = Animation(
            'kenney_piratePack/PNG/Default size/Effects/fire',
            fps=4,
            loop=True,
            autoplay=True,
            visible=False,
            z=-1
        )
        fire2 = Animation(
            'kenney_piratePack/PNG/Default size/Effects/fire',
            scale=(.2,.4),
            # rotation_y=180,
            fps=4,
            loop=True,
            autoplay=True,
            visible=False,
            z=-1
        )
        fire3 = Animation(
            'kenney_piratePack/PNG/Default size/Effects/fire',
            scale=(.4,.6),
            fps=4,
            loop=True,
            autoplay=True,
            visible=False,
            z=-1
        )
        self.anim = [fire, fire2, fire3]
        self.animPos = [[.5, 0], [-.1, .2], [.2, 0]]
        
    def update(self):
        angle = self.rotation_z
        increaseX = 0
        increaseY = 0
        decreaseX = 0
        decreaseY = 0
        if held_keys['up arrow'] or held_keys['w']:
            increaseY = self.speed
            angle = 180
    
        if held_keys['down arrow'] or held_keys['s']:
            decreaseY = self.speed
            angle = 0
        if held_keys['left arrow'] or held_keys['a'] :
            decreaseX = self.speed
            angle = 90
            if held_keys['up arrow'] or held_keys['w']:
                angle = 135
                decreaseX = self.speed /1.414
                increaseY = self.speed /1.414
            elif held_keys['down arrow'] or held_keys['s']:
                angle = 45
                decreaseX = self.speed /1.414
                decreaseY = self.speed /1.414

        if held_keys['right arrow'] or held_keys['d'] :
            increaseX = self.speed
            angle = -90
            if held_keys['up arrow'] or held_keys['w']:
                angle = -135
                increaseX = self.speed /1.414
                increaseY = self.speed /1.414

            elif held_keys['down arrow'] or held_keys['s']:
                angle = -45
                increaseX = self.speed /1.414
                decreaseY = self.speed /1.414
        if held_keys['g']:
            camera.x = self.x
            camera.y = self.y
            camera.z = -50
        self.rotation_z = angle
        
        camera.x = self.x
        camera.y = self.y
        camera.z = -30

        hitinfo = self.intersects()
        if hitinfo:
            if isinstance(hitinfo.entity, CoinPart):
                destroy(hitinfo.entity)
                self.score += 1

            x = hitinfo.point.x
            y = hitinfo.point.y
            if x == .5:
                decreaseX = 0
            if x == -.5:
                increaseX = 0
            if y == .5:
                decreaseY = 0
            if y == -.5:
                increaseY = 0

        try:
            restrictor = Restrictor.getInstance()
            if restrictor:
                self.restrictorRadius = restrictor.scale_x/2
        except:
            pass

        if self.x**2 + self.y**2 > self.restrictorRadius**2:
                self.health -= time.dt*5

        if self.health > 0:
            self.healthbar.scale_x = self.healthbar_size.x*self.health/100 
            if self.health < 90:
                for e, p in zip(self.anim, self.animPos):
                    e.visible=True
                    e.x = self.x + p[0]
                    e.y = self.y + p[1]
            else:
                self.anim[0].visible=False

        self.text.text="Score: " + str(self.score)
        self.x = self.x + increaseX - decreaseX
        self.y = self.y + increaseY - decreaseY
            
