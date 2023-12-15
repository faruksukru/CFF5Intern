// newRecordForm.js
import { LightningElement, track } from 'lwc';
import createRecord from '@salesforce/apex/RecordController.createRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class NewRecordForm extends LightningElement {
  //  @track recordName = '';
    @track applicantObject ={};
    @track newRecordId;

    handleInput(event) {
        //const inputIndex = event.target.dataset.index; // Retrieve the index from the data attribute
        //const inputValue = event.target.value; // Retrieve the value of the input
       // this.recordName = event.target.value;
       var targetElement = event.target; //Input tags dataset is assigned to a variable
this.applicantObject[targetElement.dataset.fieldname] = targetElement.value; 
    }

    handleFileUploadFinished(event) {
        // Handle file upload completion if needed
        // You can obtain file details from event.detail.files
    }

    handleSave() {
        // Perform record creation using Apex
        createRecord({ applicant: this.applicantObject })
            .then(newRecordId => {
                this.newRecordId = newRecordId;
console.log(newRecordId);
                // Pass the newRecordId to the file upload component
                const fileUploadComponent = this.template.querySelector('c-file-upload-component');
                if (fileUploadComponent) {
                    fileUploadComponent.recordId = newRecordId;
                }
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
                console.error(error);
                const toastEvent = new ShowToastEvent({
                    title: 'Dublicate Record! We already have your record in our Database',
                    message: {error},
                    variant: 'error',
                });
                this.dispatchEvent(toastEvent);
                this.resetForm();
            });
    }

    resetForm() {
        // Reset form fields to their initial state
        this.applicantObject ={};
        this.newRecordId = null;
    }
}