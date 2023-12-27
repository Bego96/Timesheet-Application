import { LightningElement, track, wire } from 'lwc';
import PName from '@salesforce/schema/Project__c.Name';
import PDate from '@salesforce/schema/Project__c.Date__c';
import Task from '@salesforce/schema/Project_Task__c.Name';
import TDescription from '@salesforce/schema/Project_Task__c.Task_Description__c';
import PTotalHours from '@salesforce/schema/Project__c.Total_Hours__c';
import getListOfTasks from '@salesforce/apex/getProjects.getListOfTasks';
import createNewProject from '@salesforce/apex/getProjects.createNewProject';
import { refreshApex } from '@salesforce/apex';
import getProjectList from '@salesforce/apex/getProjects.getProjectList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class Modalentry extends NavigationMixin(LightningElement){
    @track closeModalEntry;
    @track tasksList = null;
    @track pickedValue = false;
    @track showTaskList = false;

    @track project = {
        name: PName.fieldApiName,
        date: PDate.fieldApiName,
        startHours: 0.0,
        endHours: 0.0,
        totalHours: PTotalHours.fieldApiName
    }

   @track task = {
    taskName: Task.fieldApiName,
    taskDescription: 'Task Description'
   }

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

    @wire(getProjectList)
    projectsToRefresh;


    handleProjectName(event) {
        this.project.name = event.target.value;
        console.log(event.target.value);
    }

    handleDate(event) {
        this.project.date = event.target.value;
        console.log(event.target.value);
    }

    handleTaskName(event) {
        this.task.taskName = event.target.value;
        console.log(event.target.value);
    }

    handleTaskDescription(event) {
        this.task.taskDescription = event.target.value;
        console.log(event.target.value);
    }

    handleStartHours(event) {
        this.project.startHours = event.target.value;
        console.log(event.target.value);
    }

    handleEndHours(event) {
        this.project.endHours = event.target.value;
        console.log(event.target.value);
    }

    closeEntryModal() {
        this.closeModalEntry = false;
        const newEvent = new CustomEvent('closeentrymodal', {
            detail: this.closeModalEntry
        });

        this.dispatchEvent(newEvent);
    }

    pickValue(event) {
        this.task.taskName = event.target.value;
        this.pickedValue = true;
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

    submit() {
        
        
        function convertTimeToDecimal(timeValue) {
            const [hours, minutes] = timeValue.split(':').map(Number);
            const decimalTime = hours + minutes / 60;
            return decimalTime.toFixed(2);
        }
        
        const endTimeValue = this.project.endHours; 
        const decimalEndHours = convertTimeToDecimal(endTimeValue);
        console.log(decimalEndHours); 

        const startTimeValue = this.project.startHours; 
        const decimalStartHours = convertTimeToDecimal(startTimeValue);
        console.log(decimalStartHours);

        this.project.totalHours = decimalEndHours - decimalStartHours;

        console.log(this.project.totalHours);
        createNewProject({
            projectName: this.project.name,
            taskName: this.task.taskName,
            taskDescription: this.task.taskDescription,
            dateOfProject: this.project.date,
            totalHours: this.project.totalHours
        })
        .then(result => {
            // Handle any success logic if needed
            
           refreshApex(this.projectsToRefresh);
           this.closeEntryModal();
            console.log(result[0]);

            const event = new ShowToastEvent({
                title: 'Success!',
                message: 'Successfully created record!',
                variant: 'success'
            });

            // Dispatch the toast event to display the message
            this.dispatchEvent(event);

            this[NavigationMixin.Navigate]({
                type: 'standard__namedPage',
                attributes: {
                    pageName: 'home'
                }
            });
        })
        .catch(error => {
            // Handle any error logic
            console.error('Error creating project', error);
            const event = new ShowToastEvent({
                title: 'Error',
                message: 'Error creating record: ',
                variant: 'error'
            });
        
            // Dispatch the toast event to display the error message
            this.dispatchEvent(event);
        });
    }
}