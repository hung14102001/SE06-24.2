from ursina import Entity
import math

class CannonBall(Entity):
    def __init__(self, player_x, player_y, mouse_x, mouse_y):

        super().__init__(
            model='quad',
            texture="Cannon/cannonBall.png",
            x=player_x,
            y=player_y + 0.8,
            scale_x=0.18,
            scale_y=0.18,

        )
        self.speed = 0.1
        self.quater = 0
        self.mouse_x = mouse_x
        self.mouse_y = mouse_y

        self.rediffX = self.mouse_x - self.x
        self.rediffY = self.mouse_y - self.y

        self.podiffX = math.fabs(self.mouse_x - self.x)
        self.podiffY = math.fabs(self.mouse_y- self.y)

        self.rad = math.atan2(self.podiffY, self.podiffX)

    def update(self):
        cannonBallchangeX = math.cos(self.rad) * self.speed
        cannonBallchangeY = math.sin(self.rad) * self.speed
        if self.rediffX < 0 and self.rediffY < 0:
            self.quater = 1

        elif self.rediffX > 0 and self.rediffY < 0:
            self.quater = 2
            cannonBallchangeX = -cannonBallchangeX
        elif self.rediffX > 0 and self.rediffY > 0:
            self.quater = 3
            cannonBallchangeX = -cannonBallchangeX
            cannonBallchangeY = -cannonBallchangeY
        elif self.rediffX < 0 and self.rediffY > 0:
            self.quater = 4
            cannonBallchangeY = -cannonBallchangeY
        self.x -= cannonBallchangeX
        self.y -= cannonBallchangeY