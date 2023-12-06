import { LightningElement, track, wire } from 'lwc';
import getListOfTasks from '@salesforce/apex/getProjects.getListOfTasks';
export default class Modalentry extends LightningElement {
    @track closeModalEntry;
    @track tasksList = null;
    @track pickedValue = null;
    @track showTaskList = false;
   

    @wire(getListOfTasks)
    listOfTasks({error, data}) {
        if (data) {
            this.tasksList = data;

            console.log(data);
            console.log(this.tasksList);
        } else if (error) {
            console.log(error);
        }
    }

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

    pickTaskValue(event) {
        this.pickedValue = event.target.value;
    }

    taskList() {
        this.showTaskList = !this.showTaskList;

        
        //When user clicks on task name input, he will get list of existing tasks from SF
        //so user has a choise to pick existing task instead
    }

    closeTasksList() {
        this.showTaskList = false;
    }

    resetTaskValue() {
        this.pickedValue = null;
    }

    get margin() {
        return this.pickedValue ? 'slds-m-right_xx-small margin-left: 12px' : 'slds-m-right_xx-small margin-left: 0';
    }
}