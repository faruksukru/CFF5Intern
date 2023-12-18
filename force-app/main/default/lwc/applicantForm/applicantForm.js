import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ApplicantForm extends LightningElement {
    recordid=null;
    upload=false;
   
acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg', '.docx'];
    handleSuccess(event) {
        console.log(event.detail.id);
        this.recordid = event.detail.id;
        this.upload=true;
const toastEvent = new ShowToastEvent({
title: 'Thank you for your submission to our Intern Program !',
message: 'We have received your submission succesfully. Please Upload your Resume!',
variant: 'success',
});
this.dispatchEvent(toastEvent);
// Optionally, you can reset the form or perform other actions after record creation
this.resetForm();
    }

    handleError(event) {
       
const toastEvent = new ShowToastEvent({
title: 'Dublicate Record!',
message: 'We already have your record in our Database',
variant: 'error',
});
this.dispatchEvent(toastEvent);
// Optionally, you can reset the form or perform other actions after record creation
//this.resetForm();
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
    }
    
    }

   

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