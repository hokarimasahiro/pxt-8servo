/**
 * 8servo servo motor driver
 */
//% weight=10 color=#800080 icon="\uf2f1" block="8servo"
namespace servo8 {
    let I2C_ADDR = 0x25

    function setReg8(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(I2C_ADDR, buf);
    }
    function setReg16(reg: number, dat: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = reg;
        buf[1] = dat & 0xff;
        buf[2] = dat >> 8;
        pins.i2cWriteBuffer(I2C_ADDR, buf);
    }
    function setReg24(reg: number, dat: number[]): void {
        let buf = pins.createBuffer(4);
        buf[0] = reg;
        buf[1] = dat[0];
        buf[2] = dat[1];
        buf[3] = dat[2];
        pins.i2cWriteBuffer(I2C_ADDR, buf);
    }
    function setReg32(reg: number, dat: number[]): void {
        let buf = pins.createBuffer(5);
        buf[0] = reg;
        buf[1] = dat[0];
        buf[2] = dat[1];
        buf[3] = dat[2];
        buf[4] = dat[3];
        pins.i2cWriteBuffer(I2C_ADDR, buf);
    }
    function getReg8(reg: number): number {
        pins.i2cWriteNumber(I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt8BE);
    }
    function getReg16(reg: number): number {
        pins.i2cWriteNumber(I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt16LE);
    }
    function getReg32(reg: number): number {
        pins.i2cWriteNumber(I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt32LE);
    }
    function getReg32f(reg: number): number {
        pins.i2cWriteNumber(I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.Float32LE);
    }

    //% blockId="modeSet" block="modeSet ch:%ch mode:%m"
    export function modeSet(ch: number,m:number): void {
        setReg8(ch,m);
        return;
    }
    //% blockId="outputD" block="outputD ch:%ch CTRL:%c"
    export function outputD(ch: number, c: number): void {
        setReg8(0x10 + ch, c);
        return;
    }
    //% blockId="inputD" block="inputD ch:%ch"
    export function inputD(ch: number): number {
        return getReg8(0x20 + ch);
    }
    //% blockId="input8" block="input8 ch:%ch"
    export function input8(ch: number): number {
        return getReg8(0x30 + ch);
    }
    //% blockId="input12" block="input12 ch:%ch"
    export function input12(ch: number): number {
        return getReg16(0x40 + ch * 2);
    }
    //% blockId="servo8" block="servo8 ch:%ch degree:%d"
    export function servo8(ch: number, d: number): void {
        setReg8(0x50 + ch, d);
        return;
    }
    //% blockId="servo16" block="servo16 ch:%ch microSecond:%us"
    export function servo16(ch: number, us: number): void {
        setReg8(0x60 + ch * 2, us);
        return;
    }
    //% blockId="setRGB" block="setRGB led:%led red:%r green:%g blue:%b"
    export function setRGB(led: number, r: number, g: number, b: number): void {
        let dat = [0, 0, 0];
        dat[0] = r;
        dat[1] = g;
        dat[2] = b;
        setReg24(0x70 + led * 3, dat);
        return;
    }
    //% blockId="setColor" block="setColor led:%led color:%c"
    export function setColor(led: number, c: number): void {
        let dat = [0, 0, 0];
        dat[0] = c >> 16;
        dat[1] = c >> 8 & 0xff;
        dat[2] = c & 0xff;
        setReg24(0x70 + led * 3, dat);
        return;
    }
    //% blockId="getColor" block="getColor red:%r green:%g blue:%b"
    export function getColor(r: number, g: number, b: number): number {
        return (r * 256 + g) * 256 + b;
    }
}
