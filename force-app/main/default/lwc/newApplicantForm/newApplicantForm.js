import { LightningElement, track } from 'lwc';
import createRecord from '@salesforce/apex/RecordController.createRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class NewApplicantForm extends LightningElement {

@track applicantObject ={};
@track newRecordId;
upload=false;
recordid;
acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg', '.docx'];

handleInput(event) {
var targetElement = event.target; //Input tags dataset is assigned to a variable
this.applicantObject[targetElement.dataset.fieldname] = targetElement.value; 
}

// Perform record creation using Apex
handleSave() {
createRecord({ applicant: this.applicantObject })
.then(newRecordId => {
this.recordid = newRecordId;
this.upload=true;
const toastEvent = new ShowToastEvent({
title: 'Thank you for your submission to our Intern Program !',
message: 'We have received your submission succesfully. Please Upload your Resume!',
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
title: 'Dublicate Record! We already have your record in our Database',
message: {error},
variant: 'error',
});
this.dispatchEvent(toastEvent);
this.resetForm();
});
}

// Reset form fields to their initial state
resetForm() {
this.applicantObject ={};
this.newRecordId = null;
}

// Get the uploaded files
handleUploadFinished(event) {
const uploadedFiles = event.detail.files;
console.log(this.recorId);
// Process the uploaded files, e.g., show a success message
const toastEvent = new ShowToastEvent({
title: 'Success!',
message: `${uploadedFiles.length} files uploaded successfully.`,
variant: 'success',
});
this.dispatchEvent(toastEvent);
this.upload=false;
}

}