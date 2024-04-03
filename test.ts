for (let ch = 0; ch < 8; ch++) {
    servo8.modeSet(ch,3);   // set to servo mode
}
basic.forever(function() {
    for(let deg = 0;deg <=180;deg+=10){
        for(let ch = 0;ch <8;ch++){
            servo8.servo8(ch,deg);
            basic.pause(200);
        }
        basic.pause(1000);
    }
})