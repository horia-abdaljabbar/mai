class PassportViewModel {
    constructor(data = {}, customerProfileId) {
        // this.passportId = data.passportId||0; // Default value for passportId
        this.passportNumber = data.passportNumber || "00000"; // Default to empty string if not provided
        this.issueDate = data.issueDate || "2024-11-06"; // Default to empty string if not provided
        this.expiryDate = data.expiryDate || "2024-11-09"; // Default to empty string if not provided
        this.nationality = data.nationality || "palestinian"; // Default to empty string if not provided
        this.passportPhoto = data.passportPhoto ||"/Uploads/Passports/"; // Default to empty string if not provided (file path)
        this.iDate ="2024-11-06"; // Default to empty string if not provided
        this.customerProfileId = customerProfileId; // Connect to CustomerProfileViewModel ID
        this.passportPhotoFile= data.passportPhotoFile||null;
    }
    
    // Validation method
  validate() {
    const errors = {};

    // Validate passport number
    if (!this.passportNumber) {
        errors.passportNumber = "رقم الجواز مطلوب";
    }

    // Validate issue date (should be a valid date)
    if (!this.issueDate || this.issueDate === 'default-value') {
        errors.issueDate = "تاريخ الاصدار مطلوب";
    }



    // Validate expiry date (should be a valid date and after the issue date)
        if (!this.expiryDate || this.expiryDate=== 'default-value') {
            errors.expiryDate = "تاريخ الانتهاء مطلوب";
        } else if (this.issueDate && this.expiryDate <= this.issueDate) {
            errors.expiryDate = "تاريخ الاصدار يجب أن يكون بعد تاريخ الانتهاء";
        }

    // Validate nationality
    if (!this.nationality) {
        errors.nationality = "ادخال الجنسية مطلوب";
    }

    // Validate passport photo (ensure it's provided in some form)
    if (!this.passportPhotoFile) {
        errors.passportPhotoFile = "ادخال صورة جواز السفر مطلوب";
    }

    return errors;
}


}

export default PassportViewModel;
