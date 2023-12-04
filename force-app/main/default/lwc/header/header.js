import { LightningElement, track } from 'lwc';

export default class Header extends LightningElement {
    searchValue = null;
    showDatePicker = false;
    @track entryModal = false;

    handleInputChange(event) {
        this.searchValue = event.target.value;
        console.log(this.searchValue);
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

}