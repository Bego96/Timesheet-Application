import { LightningElement, wire, track } from 'lwc';
import getProjectList from '@salesforce/apex/getProjects.getProjectList';

export default class Project extends LightningElement {

    @track projects;

    @wire(getProjectList)
    projects({ error, data }) {
        if (data) {
            this.projects = data;

            console.log(data);
            console.log(this.projects);
        } else if (error) {
            console.log(error);
        }
    };
}