import { LightningElement, track } from 'lwc';

export default class Header extends LightningElement {
    @track searchValue = null;
    showDatePicker = false;
    @track entryModal = false;

    handleInputChange(event) {
        this.searchValue = event.target.value;
        console.log(this.searchValue);
        const newEvent = new CustomEvent('searchvalue', {
            detail: this.searchValue
        });

        this.dispatchEvent(newEvent);
    }

    toggleDatePicker() {
        this.showDatePicker = !this.showDatePicker;
    }

    newEntryModal(event) {
        this.entryModal = event.detail;
        const newEvent = new CustomEvent('entrymodal', {
            detail: this.entryModal
        });

        this.dispatchEvent(newEvent);
    }

    chosenDay(event) {
        console.log("From header Day: " + event.detail);
        const newEvent = new CustomEvent('chosenday', {
            detail: event.detail
        });

        this.dispatchEvent(newEvent);
    }

    sortByValue(event) {
        console.log('Im from header ' + event.detail)
        const newEvent = new CustomEvent('chosenvalue', {
            detail: event.detail
        });

        this.dispatchEvent(newEvent);
    }

}