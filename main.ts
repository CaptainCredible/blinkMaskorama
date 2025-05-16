function drawEye (xCoord: number, yCoord: number) {
    basic.clearScreen()
    led.plot(xCoord, yCoord)
    led.plotBrightness(xCoord + 1, yCoord, 20)
    led.plotBrightness(xCoord - 1, yCoord, 20)
    led.plotBrightness(xCoord, yCoord + 1, 20)
    led.plotBrightness(xCoord, yCoord - 1, 20)
}

let closedState = false;
let open = false;
function look (targetX: number, targetY: number) {
    while (eyeX != targetX && eyeY != targetY) {
        if (eyeX > targetX) {
            eyeX += -1
        } else if (eyeX < targetX) {
            eyeX += 1
        }
        if (eyeY > targetY) {
            eyeY += -1
        } else if (eyeY < targetY) {
            eyeY += 1
        }
        drawEye(eyeX, eyeY)
        basic.pause(100)
    }
    drawEye(eyeX, eyeY)
}
let closedAngle = 60
let openAngle = 150
let eyeY = 0
let eyeX = 0
wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, 90)
eyeX = 2
eyeY = 2
basic.forever(function () {
    if(!closedState){
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, openAngle)
        pins.servoWritePin(AnalogPin.P2, 0)
        basic.pause(500)
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, closedAngle)
        pins.servoWritePin(AnalogPin.P2, 180)
        basic.pause(randint(3000, 7000))
    } else {
        if(!open){
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, closedAngle)
            basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
        } else {
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, openAngle)
            basic.showLeds(`
        # # # # #
        # . . . #
        # . . . #
        # . . . #
        # # # # #
        `)
        }
        
    }
    
})
basic.forever(function () {
    look(randint(0, 4), randint(0, 4))
    basic.pause(randint(500, 3000))
    look(2, 2)
    basic.pause(randint(1000, 6000))
})


input.onButtonPressed(Button.A, function() {
    closedState = !closedState
})

input.onButtonPressed(Button.B, function () {
    open = !open
})
