import { LightningElement } from 'lwc';

export default class Filters extends LightningElement {
    dayOne() {
        this.chooseDay(0);
    }

    dayTwo() {
        this.chooseDay(1);
    }

    dayThree() {
        this.chooseDay(2);
    }

    dayFour() {
        this.chooseDay(3);
    }

    dayFive() {
        this.chooseDay(4);
    }

    daySix() {
        this.chooseDay(5);
    }

    daySeven() {
        this.chooseDay(6);
    }

    chooseDay(day) {
        console.log("Day: " + day);
    }
}