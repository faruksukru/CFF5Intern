import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ApplicantForm extends LightningElement {
    recordid=null;
    upload=false;
    @track isShowModal = false;
acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg', '.docx'];

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
// Optionally, you can reset the form or perform other actions after record creation
//this.resetForm();
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

    hideModalBox() {  
        this.isShowModal = false;
    }
    

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
        //this.upload=false;
        }

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