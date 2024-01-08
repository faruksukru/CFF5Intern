import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ApplicantForm extends LightningElement {
recordid=null;
upload=false;
@track isShowModal = false;
@track isFileUploadDisabled = false;
acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg', '.docx'];//restrict upload formats

//call onsucces and show success mesage
handleSuccess(event) {
console.log(event.detail.id);
this.recordid = event.detail.id;
this.upload=true;
const toastEvent = new ShowToastEvent({
title: 'Succes Submission  !',
message: 'Please Upload your Resume and Cover Letter!',
variant: 'success',
});
this.dispatchEvent(toastEvent);
}
//call onerror and show success mesage
handleError(event) {
const toastEvent = new ShowToastEvent({
title: 'Dublicate Record!',
message: 'We already have your record in our Database',
variant: 'error',
});
this.dispatchEvent(toastEvent);
}   

// Reset form fields to their initial state
resetForm() {
const inputFields = this.template.querySelectorAll(
'lightning-input-field'
);
if (inputFields) {
inputFields.forEach(field => {
field.reset();
});
}}

//When clicked goto web site button in modal call website
hideModalBox() {  
this.isShowModal = false;
const websiteUrl = 'https://www.changeforcefoundation.org/'; 
// Option 1: Open in a new tab/window
// window.open(websiteUrl, '_blank');

// Option 2: Navigate in the same tab/window
window.location.href = websiteUrl;
}
//onuploadfinished calls this function to show toast message, also disable upload file
handleUploadResume(event) {
const uploadedFiles = event.detail.files;
console.log(this.recorId);
// Process the uploaded files, e.g., show a success message
const toastEvent = new ShowToastEvent({
title: 'Success!',
// message: `${uploadedFiles.length} files uploaded successfully.`,
message: 'Your Resume uploaded successfully. Please Do Not Forget To Upload Your Cover Letter',
variant: 'success',
});
this.dispatchEvent(toastEvent);
this.isFileUploadDisabled = true;
}
//onuploadfinished calls this function to show toast message, call rest form to reset form and call Modal
handleUploadCover(event) {
const uploadedFiles = event.detail.files;
console.log(this.recorId);
// Process the uploaded files, e.g., show a success message
const toastEvent = new ShowToastEvent({
title: 'Success!',
// message: `${uploadedFiles.length} files uploaded successfully.`,
message: 'Your Cover Letter uploaded successfully.',
variant: 'success',
});
this.dispatchEvent(toastEvent);
this.upload=false;
this.resetForm();
this.isShowModal = true;
}
}