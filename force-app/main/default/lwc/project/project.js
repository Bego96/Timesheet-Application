import { LightningElement, wire, track, api } from 'lwc';
import getProjectList from '@salesforce/apex/getProjects.getProjectList';
import getProjectsByDay from '@salesforce/apex/getProjects.getProjectsByDay';
import sortByValue from '@salesforce/apex/getProjects.sortByValue';
import searchByValue from '@salesforce/apex/getProjects.searchByValue';
import getProjectsByDate from '@salesforce/apex/getProjects.getProjectsByDate';
export default class Project extends LightningElement {
    @api day;
    @api valuesort;
    @api searchvalue;
    @track projects;
    @api date;
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

    @wire(getProjectsByDate, {dateValue: '$date'})
    projectsByDate({error, data}) {
        console.log("Date from project " + this.dateValue);
        if (data) {
            this.projects = data;

            console.log(data);
            console.log(this.projects);
        } else if (error) {
            console.log(error);
        }
    }

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