import { LightningElement, track } from 'lwc';
import getApplicant from '@salesforce/apex/ApplicantApexController.isApplicantExist';
import deleteRecord from '@salesforce/apex/ApplicantApexController.deleteRecord';
import updateUpload from '@salesforce/apex/ApplicantApexController.updateUpload';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class TrailheadUpload extends LightningElement {
// variables used in Js
@track applicantemail=null;//initial value for email
@track applicant;
@track trailheadRecordId;//keeps newly created trailhead record
upload=false;//used for upload part in HTML to e shown
isExist=false;
isShowModal=false;//used for modal to be shown
Modal1=false;//used in modal to show first option (we have screen shoot)
Modal2=false;//used in modal to show second option (screen shoot uploded succesfully)
@track label=null;//used in modal in HTML to show which heading is used in modal
acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg'];//restrict upload formats
//To get entered email
handleInput(event) {
this.applicantemail = event.target.value; 
}
/*call apex conttroller to check if we have this email in applicant object records. 
if yes, then it looks if trailhead uplod field is checked, if checked it gives message, if unchecked
it create a new record in trailhead object to get screen shoot. if we dont ant record related with email, 
the sytem gives another message says we couldnt find email try a new one. 
Here we have change value of the boolean variable to show correct messsages in modal in HTML */
handleSave() {
getApplicant({eml: this.applicantemail})
.then(result => {
this.applicant = result[0];
this.trailheadRecordId=result[1];
if(!this.applicant ==''){
console.log('we have email');
this.upload=true;
const toastEvent = new ShowToastEvent({
title: 'We have found your email succesfully!',
message: 'Please Upload your trailhead screen shot!',
variant: 'success',
});
this.dispatchEvent(toastEvent);
// Optionally, you can reset the form or perform other actions after record creation
this.resetForm();    
}else{
const toastEvent = new ShowToastEvent({
title: 'Oopps !',
message: 'We could not find your email. Please enter your submission email and submit again!',
variant: 'error',
});
this.dispatchEvent(toastEvent);
// Optionally, you can reset the form or perform other actions after record creation
this.resetForm(); 
}
})
.catch(error => {
// Handle error, show error message, etc.
/*const toastEvent = new ShowToastEvent({
title: 'Oopps !',
message: 'We Have already had your TrailHead Screen Shot!',
variant: 'error',
});
this.dispatchEvent(toastEvent);*/
this.label='modal-heading-01';
this.Modal1=true;
this.Modal2=false;
this.isShowModal=true;
// Optionally, you can reset the form or perform other actions after record creation
this.resetForm();  
});
}
//this reset email input
resetForm() {
this.applicantEmail =null;
//window.location.reload();
}
/*When screen shoot uploades succesfully, it shows sucess message and change boolean variables based on the condition to be shown on the Modal.
Also call apex controler to update trailhead upload check box.*/ 
handleUploadFinished(event) {
updateUpload({ recordEmail: this.applicantemail })
.then(result => {
const toastEvent = new ShowToastEvent({
title: 'Success!',
message: 'Your file uploaded successfully!',
variant: 'success',
});
this.dispatchEvent(toastEvent);
this.upload=false;
this.label='modal-heading-02';
this.Modal2=true;
this.Modal1=false;
this.isShowModal=true;
})
.catch(error => {
// Handle error, show error message, etc.
console.log('error is'+JSON.stringify(error));
});    
}
//This is called via delete button in modal to call apex controller to delete trailhead record and show messages about delete
deleteModalBox() { 
deleteRecord({ recordEmail: this.applicantemail })
.then(result => {
const toastEvent = new ShowToastEvent({
title: 'We have deleted your previous Screen Shot successfully!',
message: 'You can Upload new Screen Shoot again by using your Email',
variant: 'success',
});
this.dispatchEvent(toastEvent);
// Optionally, you can reset the form or perform other actions after record creation
this.resetForm();
})
.catch(error => {
// Handle error, show error message, etc.
console.error('erroris'+error);
const toastEvent = new ShowToastEvent({
title: 'We have an error while deleting your Screen Shot. Please Contact with CFF',
message: {error},
variant: 'error',
});
this.dispatchEvent(toastEvent);
this.resetForm();
});    
this.isShowModal = false;
}
//This is called Go CFF Website button in modal to go to web site of CFF
exitModalBox() {  
this.isShowModal = false;
const websiteUrl = 'https://www.changeforcefoundation.org/'; 
// Option 1: Open in a new tab/window
// window.open(websiteUrl, '_blank');
// Option 2: Navigate in the same tab/window
window.location.href = websiteUrl;
}
}