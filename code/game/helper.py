from ursina import Animation, destroy


def createAnimation(x, y, path, time=1, scale=1):

    anim = Animation(
        path,
        x=x,
        y=y,
        fps=4,
        loop=True,
        autoplay=True,
        visible=True,
        z=-1,
        scale = scale,
    )
    destroy(anim, delay=2)
