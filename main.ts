let motorStates = 0
radio.setGroup(1)
radio.setTransmitPower(7)
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    radio.sendValue("angle", pins.map(
    pins.analogReadPin(AnalogPin.P1),
    0,
    1023,
    0,
    270
    ))
    motorStates = 0
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
})
