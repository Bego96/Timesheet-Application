import { LightningElement, wire, track, api } from 'lwc';
import getProjectList from '@salesforce/apex/getProjects.getProjectList';
import getProjectsByDay from '@salesforce/apex/getProjects.getProjectsByDay';
import sortByValue from '@salesforce/apex/getProjects.sortByValue';
import searchByValue from '@salesforce/apex/getProjects.searchByValue';

export default class Project extends LightningElement {
    @api day;
    @api valuesort;
    @api searchvalue;
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

    @wire(sortByValue, {valuesort: '$valuesort'})
    projectsByValue({error, data}) {
        if (data) {
            this.projects = data;

            console.log(data);
            console.log(this.projects);
        } else if (error) {
            console.log(error);
        }
    }

    @wire(searchByValue, {searchvalue: '$searchvalue'})
    projectsBySearchValue({error, data}) {
        if (data) {
            this.projects = data;

            console.log(data);
            console.log(this.projects);
        } else if (error) {
            console.log(error);
        }
    }
    
}