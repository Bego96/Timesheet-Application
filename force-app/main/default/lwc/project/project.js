import { LightningElement, wire, track, api } from 'lwc';
import getProjectList from '@salesforce/apex/getProjects.getProjectList';
import getProjectsByDay from '@salesforce/apex/getProjects.getProjectsByDay';

export default class Project extends LightningElement {
    @api day;
    @track projects;

    @wire(getProjectList)
    projectsList({ error, data }) {
        if (data) {
            this.projects = data;

            console.log(data);
            console.log(this.projects);
        } else if (error) {
            console.log(error);
        }
    };

    @wire(getProjectsByDay, {day: '$day'})
    projectsByDay({error, data}) {
        if (data) {
            this.projects = data;

            console.log(data);
            console.log(this.projects);
        } else if (error) {
            console.log(error);
        }
    }


}