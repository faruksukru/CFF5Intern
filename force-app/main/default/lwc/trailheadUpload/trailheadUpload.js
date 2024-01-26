import { LightningElement, track } from 'lwc';
import getApplicant from '@salesforce/apex/ApplicantApexController.isApplicantExist';
import deleteRecord from '@salesforce/apex/ApplicantApexController.deleteRecord';
import updateUpload from '@salesforce/apex/ApplicantApexController.updateUpload';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class TrailheadUpload extends LightningElement {

@track applicantemail=null;
@track applicant;
@track trailheadRecordId;
upload=false;
isExist=false;
isShowModal=false;
Modal1=false;
Modal2=false;
@track label=null;//used in modal in HTML to show which heading is used in modal
acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg'];//restrict upload formats

handleInput(event) {
this.applicantemail = event.target.value; 
}

handleSave() {
console.log('Test1'+ this.applicantemail);
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

resetForm() {
this.applicantEmail =null;
//window.location.reload();
}

handleUploadFinished(event) {
//const uploadedFiles = event.detail.files;
// Process the uploaded files, e.g., show a success message
const toastEvent = new ShowToastEvent({
title: 'Success!',
// message: `${uploadedFiles.length} files uploaded successfully.`,
message: 'Your file uploaded successfully!',
variant: 'success',
});
this.dispatchEvent(toastEvent);
this.upload=false;
this.label='modal-heading-02';
this.Modal2=true;
this.Modal1=false;
this.isShowModal=true;

updateUpload({ recordEmail: this.applicantemail })
    .then(result => {
    /*const toastEvent = new ShowToastEvent({
    title: 'We have deleted your previous Screen Shot successfully!',
    message: 'You can Upload new Screen Shoot again by using your Email',
    variant: 'success',
    });
    this.dispatchEvent(toastEvent);
    // Optionally, you can reset the form or perform other actions after record creation
    this.resetForm();*/
    })
    .catch(error => {
    // Handle error, show error message, etc.
    console.error('erroris'+error);
   /* const toastEvent = new ShowToastEvent({
    title: 'We have an error while deleting your Screen Shot. Please Contact with CFF',
    message: {error},
    variant: 'error',
    });
    this.dispatchEvent(toastEvent);
    this.resetForm();*/
    });    

}

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

exitModalBox() {  
this.isShowModal = false;
const websiteUrl = 'https://www.changeforcefoundation.org/'; 
// Option 1: Open in a new tab/window
// window.open(websiteUrl, '_blank');
// Option 2: Navigate in the same tab/window
window.location.href = websiteUrl;
}

}