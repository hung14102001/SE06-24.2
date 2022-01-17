from ursina import *

class Chacracter(Button):
    def __init__(self, char_txt,x,y,icon,submit):
        super().__init__(
            text=char_txt,
            pressed_color=color.yellow,
            origin=(x,y), 
            scale=0.15, 
            text_origin=(0,-1),
            icon=icon,
            color=rgb(255,255,255, 0), 
            on_click=submit,
            enabled=False
        )

                
