import { LightningElement, track } from 'lwc';

export default class Timesheet extends LightningElement {
    @track newEntryModal = false;
    @track day;
   
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

    
}