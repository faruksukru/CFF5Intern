// RecordController.cls
public with sharing class RecordController {
    @AuraEnabled
    public static Id createRecord(Applicant__c applicant) {
        try {
            // Create a new record
            Applicant__c newRecord = new Applicant__c( );
            newRecord.First_Name__c=applicant.First_Name__c;
            newRecord.Last_Name__c=applicant.Last_Name__c;
            newRecord.Email__c=applicant.Email__c;
            newRecord.Phone__c=applicant.Phone__c;
            newRecord.LinkedIn__c=applicant.LinkedIn__c;
            newRecord.Trailhead__c=applicant.Trailhead__c;
            newRecord.Views_and_Suggestions__c=applicant.Views_and_Suggestions__c;
            newRecord.Application_Date__c=system.today();
            newRecord.Application_Status__c='Applied';
            // Insert the new record
            insert newRecord;

            // Return the Id of the new record
            return newRecord.Id;
        } catch (Exception e) {
            // Handle exceptions and log errors
            System.debug('Error creating record: ' + e.getMessage());
            throw new AuraHandledException('Error creating record: ' + e.getMessage());
        }
    }
}