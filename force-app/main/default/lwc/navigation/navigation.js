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

    sortByProject() {
        this.sortByValue('project');
    }

    sortByHours() {
        this.sortByValue('hours');
    }

    sortByDate() {
        this.sortByValue('date');
    }

    sortByValue(value) {
        console.log(value)
        const newEvent = new CustomEvent('chosenvalue', {
            detail: value
        });

        this.dispatchEvent(newEvent);
    }
}