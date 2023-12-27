import { LightningElement, track } from 'lwc';

export default class Timesheet extends LightningElement {
    @track newEntryModal = false;
    @track day;
    @track valuesort;
    @track searchvalue;
    @track date;
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

    chosenDate(event) {
        console.log("From Timesheet Date: " + event.detail);
        this.date = event.detail;
        console.log("Setted day value" + this.date)
    }

    handleInputChange(event) {
        this.searchvalue = event.detail;
        console.log(event.detail);
        
    }
}