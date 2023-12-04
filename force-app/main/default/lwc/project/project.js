import { LightningElement, wire } from 'lwc';
import getProjectList from '@salesforce/apex/getProjects.getProjectList';

export default class Project extends LightningElement {

    name;

    @wire(getProjectList)
    projects({ error, data }) {
        if (data) {
            this.name = data[0].Name + " " + data[0].Project_Task__r.Task_Description__c;

            console.log(data);
            console.log(this.name);
        } else if (error) {
            console.log(error);
        }
    };
}