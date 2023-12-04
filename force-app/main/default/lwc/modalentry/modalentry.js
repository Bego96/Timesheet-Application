import { LightningElement, track } from 'lwc';

export default class Modalentry extends LightningElement {
    @track closeModalEntry;
    @track tasksList = null;
    @track pickedValue = null;
    

    closeEntryModal() {
        this.closeModalEntry = false;
        const newEvent = new CustomEvent('closeentrymodal', {
            detail: this.closeModalEntry
        });

        this.dispatchEvent(newEvent);
    }

    pickValue(event) {
        this.pickedValue = event.target.value;
    }

    taskList() {
        this.tasksList = this.tasksList ? false : [
            {
                key: 1,
                name: 'John'
            },
            {
                key: 2,
                name: 'Jacon'
            }
        ];
        //When user clicks on task name input, he will get list of existing tasks from SF
        //so user has a choise to pick existing task instead
    }
}