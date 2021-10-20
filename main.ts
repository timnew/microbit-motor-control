function switchMode (newMode: boolean) {
    isContinuesControl = newMode
    angle = 135
    if (isContinuesControl) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Asleep)
    }
}
function sustainControlRoutine () {
    angle += pins.map(
    pins.analogReadPin(AnalogPin.P1),
    0,
    1023,
    -5,
    5
    )
    if (angle < 0) {
        angle = 0
    } else if (angle > 270) {
        angle = 270
        radio.sendValue("angle", angle)
    }
}
function mortorControlRoutine () {
    if (GHBit.Button(GHBit.enButton.B1, GHBit.enButtonState.Press)) {
        motorStates = motorStates ^ 0x01
    } else if (GHBit.Button(GHBit.enButton.B2, GHBit.enButtonState.Press)) {
        motorStates = motorStates ^ 0x02
    } else if (GHBit.Button(GHBit.enButton.B3, GHBit.enButtonState.Press)) {
        motorStates = motorStates ^ 0x04
    } else if (GHBit.Button(GHBit.enButton.B4, GHBit.enButtonState.Press)) {
        motorStates = motorStates ^ 0x08
    }
    radio.sendValue("motor", motorStates)
}
function continueControlRoutine () {
    radio.sendValue("angle", pins.map(
    pins.analogReadPin(AnalogPin.P1),
    0,
    1023,
    0,
    270
    ))
}
let angle = 0
let isContinuesControl = false
let motorStates = 0
radio.setGroup(1)
radio.setTransmitPower(7)
motorStates = 0
switchMode(true)
basic.forever(function () {
    if (GHBit.Rocker(GHBit.enRocker.Press)) {
        switchMode(!(isContinuesControl))
    }
    if (isContinuesControl) {
        continueControlRoutine()
    } else {
        sustainControlRoutine()
    }
    mortorControlRoutine()
})
