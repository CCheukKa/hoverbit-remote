input.onButtonPressed(Button.A, function () {
    Throttle += -10
})
input.onButtonPressed(Button.AB, function () {
    if (Arm == 0) {
        Arm = 1
    } else {
        Arm = 0
    }
})
input.onButtonPressed(Button.B, function () {
    Throttle += 10
})
input.onGesture(Gesture.Shake, function () {
    Throttle = 0
    Arm = 0
})
let Roll = 0
let Arm = 0
let Throttle = 0
let radiochannel = 7
basic.showNumber(radiochannel)
radio.setGroup(radiochannel)
basic.forever(function () {
    Roll = Math.constrain(input.rotation(Rotation.Roll), -45, 45)
    Throttle = Math.constrain(Math.map(90 - input.rotation(Rotation.Pitch), 45, 135, 0, 100), 0, 100)
    basic.clearScreen()
    if (Arm) {
        led.setDisplayMode(DisplayMode.Greyscale)
        led.plotBrightness(0, 0, 40)
        led.plotBrightness(0, 4, 40)
        led.plotBrightness(4, 0, 40)
        led.plotBrightness(4, 4, 40)
    }
    for (let index = 0; index <= 4; index++) {
        led.plotBrightness(index, Math.map(Throttle, 0, 100, 4, 0), 255)
    }
    for (let index2 = 0; index2 <= 4; index2++) {
        led.plotBrightness(Math.map(Roll, -45, 45, 0, 4), index2, 255)
    }
    radio.sendValue("A", Arm)
    radio.sendValue("R", Roll)
    radio.sendValue("T", Throttle)
})
