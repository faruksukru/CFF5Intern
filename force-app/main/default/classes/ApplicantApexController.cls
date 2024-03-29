public without sharing class ApplicantApexController {
/* gets email from JS and make query if the we have record in applicant related with this email.
if yes, then it looks if trailhead uplod field is checked, if checked it gives message, if unchecked
it create a new record in trailhead object to get screen shoot. if we dont ant record related with email, 
the sytem gives another message says we couldnt find email try a new one.  */
@AuraEnabled
public static List<String> isApplicantExist(string eml){
List<String> vars=new List<String>();
system.debug('email: '+eml);
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
//get email to find related trailhead record and delete it. it also find applicant object to make upload check box false
@AuraEnabled
public static void deleteRecord(string recordEmail){
Trailhead__c trailheadRecord =  [SELECT Id, Applicant__c FROM Trailhead__c WHERE Email__c=:recordEmail ];
Delete trailheadRecord ;
Applicant__c applicant= [SELECT Id, Trailhead_Upload__c FROM Applicant__c WHERE id=: trailheadRecord.Applicant__c];
applicant.Trailhead_Upload__c=false;
Update applicant;
}
//get email and when the screen shoot uploaded suceesfully it update trailhead file upload checkbox
@AuraEnabled
public static void updateUpload(string recordEmail){
Trailhead__c trailheadRecord =  [SELECT Id, Applicant__c, isFileUploaded__c FROM Trailhead__c WHERE Email__c=:recordEmail ];
trailheadRecord.isFileUploaded__c=true;
Update trailheadRecord;
}
}