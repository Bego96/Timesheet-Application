import { LightningElement, track } from 'lwc';

export default class Timesheet extends LightningElement {
    @track newEntryModal = false;

    entryModal(event) {
        this.newEntryModal = event.detail;
    }

    closeEntryModal(event) {
        this.newEntryModal = event.detail;
    }
}