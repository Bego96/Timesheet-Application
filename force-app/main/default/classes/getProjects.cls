// Apex
public with sharing class getProjects {

    @AuraEnabled(cacheable=true)
    public static List<Project__c> getProjectList() {
        try {
            return [SELECT Id, Name, Date__c, Project_Task__r.Name, Project_Task__r.Task_Description__c, Total_Hours__c FROM Project__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Project__c> getProjectsByDay(Integer day){
        try {
            List<Project__c> projects = [
            SELECT Id, Name, Date__c, Project_Task__r.Name, Project_Task__r.Task_Description__c, Total_Hours__c 
            FROM Project__c
            WHERE DAY_IN_WEEK(Date__c) =: day
            ];


        return projects;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Project_Task__c> getListOfTasks(){
        try {
            return [
                SELECT Id, Name, Task_Description__c 
                FROM Project_Task__c
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
