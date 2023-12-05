import { LightningElement, track } from 'lwc';

export default class Navigation extends LightningElement {
    filterToggle = false;
    @track showNewEntryModal = false;

    openFilter(){
        this.filterToggle = !this.filterToggle;
    }

    addNewEntry() {
        this.showNewEntryModal = true;
        const event = new CustomEvent('newentrymodal', {
            detail: this.showNewEntryModal
        });

        this.dispatchEvent(event);
    }

    chosenDay(event) {
        console.log("From navigation Day: " + event.detail);
        const newEvent = new CustomEvent('chosenday', {
            detail: event.detail
        });

        this.dispatchEvent(newEvent);
    }
}