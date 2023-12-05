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
}
