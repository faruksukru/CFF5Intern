public with sharing class ApplicantApexController {
    
    @AuraEnabled(cacheable=false)
    public static List<String> isApplicantExist(string eml){
        List<String> vars=new List<String>();
        List<Applicant__c> applc= [SELECT Id, First_Name__c, Last_Name__c, Email__c, Trailhead_Upload__c FROM Applicant__c WHERE Email__c=: eml];
        
        if(applc.size()>0){
            if(applc[0].Trailhead_Upload__c){
                vars=null;
            }else{
            vars.add(applc[0].Id);
            Trailhead__c newRecord= new Trailhead__c();
            newRecord.First_Name__c=applc[0].First_Name__c;
            newRecord.Last_Name__c=applc[0].Last_Name__c;
            newRecord.Email__c=applc[0].Email__c;
            newRecord.Applicant__c=applc[0].Id;
            Insert newRecord;
            vars.add(newRecord.Id);
            applc[0].Trailhead_Upload__c=true;
            update applc;
            system.debug('Test2 '+vars);

        }
        
        }
        Return vars ;
}
}