// Apex
public with sharing class getProjects {

    @AuraEnabled(cacheable=true)
    public static List<Project__c> getProjectList() {
        try {
            return [SELECT Id, Name, Date__c, Project_Task__r.Name, Project_Task__r.Task_Description__c, Total_Hours__c, CreatedDate 
            FROM Project__c 
            WHERE CreatedDate >= LAST_N_DAYS:30 
            ORDER BY CreatedDate DESC];
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

    @AuraEnabled
    public static Project__c createNewProject(String projectName, String taskName, String taskDescription, Date dateOfProject, Decimal totalHours){
        try {
            Project__c newProject = new Project__c();
            Project_Task__c existingTask;

            // Query for an existing project task
            List<Project_Task__c> existingTasks = [SELECT Id, Name, Task_Description__c FROM Project_Task__c WHERE Name = :taskName LIMIT 1];

            // If the task exists, link it to the new project
            if (!existingTasks.isEmpty()) {
                existingTask = existingTasks[0];
            } else {
                // If the task does not exist, create a new task
                Project_Task__c newProjectTask = new Project_Task__c();
                newProjectTask.Name = taskName;
                newProjectTask.Task_Description__c = taskDescription;
                insert newProjectTask; // Insert the new task to get the Id
                existingTask = newProjectTask;
            }

            // Set project details
            newProject.Name = projectName;
            newProject.Project_Task__c = existingTask.Id;
            newProject.Date__c = dateOfProject;
            newProject.Total_Hours__c = totalHours;

            // Insert the new project
            insert newProject;
            // Log information to debug logs
            System.debug('Project created successfully: ' + newProject.Name);
            return newProject;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Project__c> sortByValue(String valuesort) {
        try {
            if (valuesort == 'project') {
                return [SELECT Id, Name, Date__c, Project_Task__r.Name, Project_Task__r.Task_Description__c, Total_Hours__c
                        FROM Project__c ORDER BY Name ASC];
            } else if (valuesort == 'hours') {
                return [SELECT Id, Name, Date__c, Project_Task__r.Name, Project_Task__r.Task_Description__c, Total_Hours__c
                        FROM Project__c ORDER BY Total_Hours__c ASC];
            } else if (valuesort == 'date') {
                return [SELECT Id, Name, Date__c, Project_Task__r.Name, Project_Task__r.Task_Description__c, Total_Hours__c
                        FROM Project__c ORDER BY Date__c ASC];
            } else {
                // Handle invalid input
                return null;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<SObject> searchByValue(String searchvalue){
        try {
          // Your actual logic for searching by value goes here
        List<SObject> searchResults = new List<SObject>();
        
        // Querying Project__c records
        List<Project__c> projectResults = [SELECT Id, Name, Date__c, Project_Task__r.Name, Project_Task__r.Task_Description__c, Total_Hours__c
            FROM Project__c WHERE Name = :searchvalue OR Project_Task__r.Name = :searchvalue];

        searchResults.addAll(projectResults);
        
        return searchResults;


        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Project__c> getProjectsByDate(String dateValue) {
        try {
            List<Project__c> projects = [
                SELECT Id, Name, Date__c, Project_Task__r.Name, Project_Task__r.Task_Description__c, Total_Hours__c 
                FROM Project__c
                WHERE Date__c =: Date.valueOf(dateValue)
            ];

            return projects;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
