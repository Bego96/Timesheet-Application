import { LightningElement, track } from 'lwc';

export default class Timesheet extends LightningElement {
    @track newEntryModal = false;
    @track day;
    @track valuesort;
   
    entryModal(event) {
        this.newEntryModal = event.detail;
    }

    closeEntryModal(event) {
        this.newEntryModal = event.detail;
    }

    chosenDay(event) {
        console.log("From Timesheet Day: " + event.detail);
        this.day = event.detail;
        console.log("Setted day value" + this.day)
    }

    sortByValue(event) {
        console.log("Im from timesheet " + event.detail)
        this.valuesort = event.detail;
        console.log("Im setted " + this.valuesort);
    }
}