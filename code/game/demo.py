from ursina import *
app = Ursina()

window.x = 200

window.color = color.color(0, 0, .1)
Button.color = color._20
window.color = color._25
Text.default_font = 'consola.ttf'
Text.default_resolution = 16*2
te = TextField(max_lines=300, scale=1)
te.text = dedent('''
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Aliquam sapien tellus, venenatis sit amet ante et, malesuada porta risus.
    Etiam et mi luctus, viverra urna at, maximus eros. Sed dictum faucibus purus,
    nec rutrum ipsum condimentum in. Mauris iaculis arcu nec justo rutrum euismod.
    Suspendisse dolor tortor, congue id erat sit amet, sollicitudin facilisis velit.'''
    )[1:]
te.render()

app.run()