import { LightningElement, track } from 'lwc';
import getApplicant from '@salesforce/apex/ApplicantApexController.isApplicantExist';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TrailheadUpload extends LightningElement {

    @track applicantemail='';
    @track applicant;
    @track trailheadRecordId;
    
    upload=false;
    isExist=false;
    acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg', '.docx'];//restrict upload formats
    handleInput(event) {
          this.applicantemail = event.target.value; 
         }

handleSave() {
    console.log('Test1'+ this.applicantemail);
getApplicant({eml: this.applicantemail})
.then(result => {
this.applicant = result[0];
this.trailheadRecordId=result[1];
console.log('Test2'+ this.applicant);
console.log('Test3'+ this.trailheadRecordId);
if(!this.applicant ==''){
    console.log('we have email');
    this.upload=true;
    const toastEvent = new ShowToastEvent({
    title: 'We have found your email succesfully!',
    message: 'Please Upload your trailhead screen shoot!',
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
        console.log('rest');
        this.resetForm(); 

}
})
.catch(error => {
// Handle error, show error message, etc.
const toastEvent = new ShowToastEvent({
    title: 'Oopps !',
    message: 'We Have already had your TrailHead Screen Shot!',
    variant: 'error',
    });
    this.dispatchEvent(toastEvent);
    // Optionally, you can reset the form or perform other actions after record creation
    this.resetForm();  
});
}

resetForm() {
    this.applicantEmail =null;
    
     }

     

     handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        
        // Process the uploaded files, e.g., show a success message
        const toastEvent = new ShowToastEvent({
        title: 'Success!',
        // message: `${uploadedFiles.length} files uploaded successfully.`,
        message: 'Your File uploaded successfully.',
        variant: 'success',
        });
        this.dispatchEvent(toastEvent);
        this.upload=false;
        
        
        }

        

}