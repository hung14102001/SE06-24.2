import os
from ursina import *
from re import A, escape
from random import randint
from player import Player
from cannonball import CannonBall
from sea import Sea
from minimap import MiniMap
from scene import Scene
from chacracter import Chacracter
from loading import LoadingWheel
from direct.stdpy import thread
from ursina.prefabs.health_bar import HealthBar

class Title(Text):
    def __init__(self):
        super().__init__(
            text='WELCOME TO OUR WORLD !',
            origin=(0, -4),
            color=color.black,
            size=Text.size,
            font='Font/aAbstractGroovy.ttf',
        )
        self.appear(speed=.05, delay=0)
        
class MainMenu(Entity):
    def __init__(self, **kwargs):
        super().__init__(
            parent=camera.ui, 
            ignore_paused=True)

        # Create empty entities that will be parents of our menus content
        #self.title = Title()
        self.bg = Sprite('Image/bg.png')
        self.main_menu = Entity(parent=self, enabled=True)
        self.options_menu= Entity(parent=self,enabled=False)
        #self.a = Audio('start_game', loop=False, autoPlay=True)

        self.player = Player(-15, -15)
        self.background = Sea()
        self.minimap = MiniMap(self.player, self.background)
        self.loading_screen = LoadingWheel(enabled=False)

        # [MAIN MENU] WINDOWN START
        def display(item, state):               # Show/hide item on screen
            if state:
                item.enabled = True
            else:
                item.enabled = False

        def show(*argv):
            for arg in argv:
                display(arg, True)

        def hide(*argv):
            for arg in argv:
                display(arg, False)
                
        def choose1():
            hide(self.chac1, self.chac2, self.chac3,self.chac4,self.chac5)
            show(self.loading_screen)
            self.player.texture= os.path.join("Ships", list[0])
            t = time.time()
        
            try:
                thread.start_new_thread(function=loadTextures, args='')
            except Exception as e:
                print('error starting thread', e)

            print('---', time.time()-t)

        def choose2():
            hide(self.chac1, self.chac2, self.chac3,self.chac4,self.chac5)
            show(self.loading_screen)
            self.player.texture= os.path.join("Ships", list[1])
            t = time.time()
            
            try:
                thread.start_new_thread(function=loadTextures, args='')
            except Exception as e:
                print('error starting thread', e)

            print('---', time.time()-t)

        def choose3():
            hide(self.chac1, self.chac2, self.chac3,self.chac4,self.chac5)
            show(self.loading_screen)
            self.player.texture= os.path.join("Ships", list[2])
            t = time.time()
        
            try:
                thread.start_new_thread(function=loadTextures, args='')
            except Exception as e:
                print('error starting thread', e)

            print('---', time.time()-t)

        def choose4():
            hide(self.chac1, self.chac2, self.chac3,self.chac4,self.chac5)
            show(self.loading_screen)
            self.player.texture= os.path.join("Ships", list[3])
            t = time.time()
        
            try:
                thread.start_new_thread(function=loadTextures, args='')
            except Exception as e:
                print('error starting thread', e)

            print('---', time.time()-t)

        def choose5():
            hide(self.chac1, self.chac2, self.chac3,self.chac4,self.chac5)
            show(self.loading_screen)
            self.player.texture= os.path.join("Ships", list[4])
            
            t = time.time()
        
            try:
                thread.start_new_thread(function=loadTextures, args='')
            except Exception as e:
                print('error starting thread', e)

            print('---', time.time()-t)
        list = ["ship_2.png","ship_3.png","ship_4.png","ship_5.png","ship_6.png"]

        self.chac1=Chacracter('Chacracter1',2,-1,list[0],choose1)
        self.chac2=Chacracter('Chacracter2',0,-1,list[1],choose2)
        self.chac3=Chacracter('Chacracter3',-2,-1,list[2],choose3)
        self.chac4=Chacracter('Chacracter4',1,1,list[3],choose1)
        self.chac5=Chacracter('Chacracter5',-1,1,list[4],choose1)

        def loadTextures():
            textures_to_load = ['brick', 'shore', 'grass', 'heightmap'] * 25
            bar = HealthBar(max_value=len(textures_to_load), value=0, position=(-.5,-.35,-2), scale_x=1, animation_duration=0, world_parent=self.loading_screen, bar_color=color.gray)
            for i, t in enumerate(textures_to_load):
                load_texture(t)
                print(i)
                bar.value = i+1

            print('loaded textures')
            hide(self.loading_screen)
            show(self.player,self.background,self.minimap)
            Scene()
            self.player.text.visible=True

         # Reference of our action function for play button
        def play_btn():
            hide(self.bg, self.main_menu)
            show(self.chac1, self.chac2, self.chac3,self.chac4, self.chac5)
            #self.a.fade_out(duration=0.5)

        # Reference of our action function for options button
        def options_menu_btn():
            hide(self.bg, self.main_menu)
            show(self.options_menu)
        
        # Reference of our action function for quit button
        def quit_game():
            application.quit()

        # Button list
        ButtonList(button_dict={
            "Play": Func(play_btn),
            "Options": Func(options_menu_btn),
            "Exit": Func(quit_game)
        }, y=0, parent=self.main_menu)
        # [MAIN MENU] WINDOW END

        # [OPTIONS MENU] WINDOW START
        # Title of our menu
        Text("OPTIONS MENU", parent=self.options_menu, y=0.4, x=0, origin=(0, 0))

        # Reference of our action function for back button
        def options_back_btn_action():
            show(self.bg, self.main_menu)
            hide(self.options_menu)

        # Button
        Button("Back", parent=self.options_menu, y=-0.3, scale=(0.1, 0.05), color=rgb(50, 50, 50),
               on_click=options_back_btn_action)
        # [OPTIONS MENU] WINDOW END
        
        # Here we can change attributes of this class when call this class
        for key, value in kwargs.items():
            setattr(self, key, value)

    def input(self,key):                                 # input
        # move left if hold arrow left
        if mouse.left:
            if time.time() - self.player.reload > 1:
                self.player.reload = time.time()
                self.canno = CannonBall(self.player, self.player.x, self.player.y, mouse.x, mouse.y)
                if self.player.enabled:
                    self.canno.enabled = True
                else:
                    self.canno.enabled = False

