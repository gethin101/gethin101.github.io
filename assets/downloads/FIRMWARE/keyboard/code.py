# gethin-75 KMK firmware

import board
from kmk.kmk_keyboard import KMKKeyboard
from kmk.scanners import DiodeOrientation
from kmk.keys import KC
from kmk.handlers.sequences import simple_key_sequence
from kmk.extensions.media_keys import MediaKeys


class Gethin75(KMKKeyboard):
    # ROW0–ROW5
    row_pins = (
        board.GP2,  # ROW0
        board.GP3,  # ROW1
        board.GP4,  # ROW2
        board.GP5,  # ROW3
        board.GP6,  # ROW4
        board.GP7,  # ROW5
    )

    # COL0–COL16
    col_pins = (
        board.GP8,   # COL0
        board.GP9,   # COL1
        board.GP10,  # COL2
        board.GP11,  # COL3
        board.GP12,  # COL4
        board.GP13,  # COL5
        board.GP14,  # COL6
        board.GP15,  # COL7
        board.GP16,  # COL8
        board.GP17,  # COL9
        board.GP18,  # COL10
        board.GP19,  # COL11
        board.GP20,  # COL12
        board.GP21,  # COL13
        board.GP22,  # COL14
        board.GP26,  # COL15
        board.GP27,  # COL16
    )

    diode_orientation = DiodeOrientation.ROW2COL


keyboard = Gethin75()
keyboard.extensions.append(MediaKeys())

# Macros (you can change these later)
MAC1 = simple_key_sequence((KC.MPRV,))                       # prev track
MAC2 = simple_key_sequence((KC.MPLY,))                       # play/pause
MAC3 = simple_key_sequence((KC.MNXT,))                       # next track
MAC4 = simple_key_sequence((KC.VOLD,))                       # volume down
MAC5 = simple_key_sequence((KC.VOLU,))                       # volume up
MAC6 = simple_key_sequence((KC.LGUI, KC.L,))                 # lock
MAC7 = simple_key_sequence((KC.LGUI, KC.E,))                 # explorer
MAC8 = simple_key_sequence((KC.LCTRL, KC.LSHIFT, KC.ESC,))   # task manager

# Keymap: 6 rows × 17 columns
keyboard.keymap = [
    # ROW 0: esc, F1–F12, 3 macros, 1 NO
    [
        KC.ESC, KC.F1, KC.F2, KC.F3, KC.F4, KC.F5, KC.F6, KC.F7,
        KC.F8, KC.F9, KC.F10, KC.F11, KC.F12,
        MAC1, MAC2, MAC3,
        KC.NO,
    ],

    # ROW 1: ` 1–0 - = backspace, ins, home, pgup
    [
        KC.GRAVE, KC.N1, KC.N2, KC.N3, KC.N4, KC.N5, KC.N6, KC.N7,
        KC.N8, KC.N9, KC.N0, KC.MINUS, KC.EQUAL,
        KC.BSPC, KC.INS, KC.HOME, KC.PGUP,
    ],

    # ROW 2: tab, Q–P, [, ], del, end, pgdn, 1 NO
    [
        KC.TAB, KC.Q, KC.W, KC.E, KC.R, KC.T, KC.Y, KC.U,
        KC.I, KC.O, KC.P, KC.LBRC, KC.RBRC,
        KC.DEL, KC.END, KC.PGDN,
        KC.NO,
    ],

    # ROW 3: caps, A–L, ; ' #, enter, 3 macros
    [
        KC.CAPS, KC.A, KC.S, KC.D, KC.F, KC.G, KC.H, KC.J,
        KC.K, KC.L, KC.SCLN, KC.QUOT, KC.NUHS,
        KC.ENTER,
        MAC4, MAC5, MAC6,
    ],

    # ROW 4: shift, \, Z–/, right shift, 2 macros, up, 1 NO
    [
        KC.LSFT, KC.NUBS, KC.Z, KC.X, KC.C, KC.V, KC.B, KC.N,
        KC.M, KC.COMMA, KC.DOT, KC.SLSH, KC.RSFT,
        MAC7, KC.UP, MAC8,
        KC.NO,
    ],

    # ROW 5: ctrl, win, alt, space, alt gr, win, menu, ctrl, arrows, 6 NO
    [
        KC.LCTL, KC.LGUI, KC.LALT, KC.SPC,
        KC.RALT, KC.RGUI, KC.APP, KC.RCTL,
        KC.LEFT, KC.DOWN, KC.RIGHT,
        KC.NO, KC.NO, KC.NO, KC.NO, KC.NO, KC.NO,
    ],
]


if __name__ == '__main__':
    keyboard.go()
