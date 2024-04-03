/**
 * 8angle potentio meter
 */
//% weight=10 color=#800080 icon="\u261d" block="8angle"
namespace angle8 {
    let I2C_ADDR = 0x43

    /**
     * set reg
     */
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
    function setReg32(reg: number, dat: number[]): void {
        let buf = pins.createBuffer(5);
        buf[0] = reg;
        buf[1] = dat[0];
        buf[2] = dat[1];
        buf[3] = dat[2];
        buf[4] = dat[3];
        pins.i2cWriteBuffer(I2C_ADDR, buf);
    }
    /**
     * get reg
     */
    function getReg8(reg: number): number {
        pins.i2cWriteNumber(I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt8BE);
    }
    function getReg16(reg: number): number {
        pins.i2cWriteNumber(I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt16LE);
    }

    /**
     * input8
     * @param ch number,eg:0
     */
    //% blockId="input8" block="input8 ch:%ch"
    //% weight=90 blockGap=8
    export function input8(ch: number): number {
        return getReg8(0x10 + ch);
    }
    /**
     * input12
     * @param ch number,eg:0
     */
    //% blockId="input12" block="input12 ch:%ch"
    //% weight=90 blockGap=8
    export function input12(ch: number): number {
        return getReg16(ch);
    }
    /**
     * inputSW
     */
    //% blockId="inputSW" block="inputSW"
    //% weight=90 blockGap=8
    export function inputSW(): number {
        return getReg8(0x20);
    }
    /**
     * setRGB
     */
    //% blockId="setRGB" block="setRGB led:%led red:%r green:%g blue:%b bright:%br"
    export function setRGB(led: number, r: number, g: number, b: number, br: number): void {
        let dat = [0, 0, 0, 0];
        dat[0] = r;
        dat[1] = g;
        dat[2] = b;
        dat[3] = br;
        setReg32(0x30 + led * 4, dat);
        return;
    }
    /**
     * setRGB
     */
    //% blockId="setColor" block="setColor led:%led color:%c bright:%br"
    export function setColor(led: number, c: number, br: number): void {
        let dat = [0, 0, 0, 0];
        dat[0] = c >> 16;
        dat[1] = c >> 8 & 0xff;
        dat[2] = c & 0xff;
        dat[3] = br;
        setReg32(0x30 + led * 4, dat);
        return;
    }
    /**
     * setRGB
     */
    //% blockId="getColor" block="getColor red:%r green:%g blue:%b"
    export function getColor(r: number, g: number, b: number): number {
        return (r * 256 + g) * 256 + b;
    }
}
