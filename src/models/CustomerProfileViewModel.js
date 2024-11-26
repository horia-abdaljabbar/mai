class CustomerProfileViewModel {
    constructor(data = {}) {
        // this.id = 0;
        this.firstName = data.firstName||"";
        this.fatherName = data.fatherName||"بب";
        this.grandFatherName = data.grandFatherName||"لل";
        this.familyName = data.familyName||"لل";
        this.fullName = data.fullName||"";
        this.firstNameEnglish = data.firstNameEnglish||"gg";
        this.fatherNameEnglish = data.fatherNameEnglish||"ggg";
        this.grandFatherNameEnglish = data.grandFatherNameEnglish||"ggg";
        this.familyNameEnglish =data.familyNameEnglish||"ggg";
        this.fullNameEnglish = data.fullNameEnglish||"";
        this.idNumber = data.idNumber||"023232323";
        this.gender = data.gender ?? null;
        this.dateOfBirth = data.dateOfBirth||"2024-11-06";
        this.phoneNumber = data.phoneNumber||"0595911228";
        this.email = data.email||"h@gmail.com";
        this.address = data.address ||"hhhhh";
        this.emergencyContactName = data.emergencyContactName ||"ccccccc";
        this.emergencyContactPhone = data.emergencyContactPhone ||"0595911228";
        this.registrationProfile = data.registrationProfile ||"2024-10-29T14:32:35.761Z";
    }

      // Method to validate profile data
    validate() {
      const errors = {};

      // Validate required fields
      if (!this.firstName) errors.firstName = 'الاسم الاول مطلوب';
      if (!this.fatherName) errors.fatherName = 'اسم الاب مطلوب';
      if (!this.grandFatherName) errors.grandFatherName = 'اسم الجد مطلوب';
      if (!this.familyName) errors.familyName = 'اسم العائلة مطلوب';
      if (!this.fullName) errors.fullName = 'الاسم الكامل بالعربية مطلوب';
      if (!this.firstNameEnglish) errors.firstNameEnglish = 'الاسم الاول بالإنجليزية مطلوب';
      if (!this.fatherNameEnglish) errors.fatherNameEnglish = 'اسم الاب بالإنجليزية مطلوب';
      if (!this.grandFatherNameEnglish) errors.grandFatherNameEnglish = 'اسم الجد بالإنجليزية مطلوب';
      if (!this.familyNameEnglish) errors.familyNameEnglish = 'اسم العائلة بالإنجليزية مطلوب';
      if (!this.fullNameEnglish) errors.fullNameEnglish = 'الاسم الكامل بالإنجليزية مطلوب';
      if (this.gender == null) {
        errors.gender = 'ادخال الجنس مطلوب';
      }
      if (!this.dateOfBirth) errors.dateOfBirth = 'تاريخ الميلاد مطلوب';
      if (!this.idNumber) errors.idNumber = 'رقم الهوية مطلوب';
      if (!this.email) errors.email = 'البريد الالكتروني مطلوب';  
      if (!this.address) errors.address = 'ادخال العنوان مطلوب';  

       // Check if emergency contact phone is empty or has a default value
      if (!this.phoneNumber ||this.phoneNumber === 'default-value') 
        {
      errors.phoneNumber = 'رقم الجوال مطلوب';
        }    
      if (!this.emergencyContactName) errors.emergencyContactName = 'اسم جهة الاتصال في حالة الطوارئ مطلوب';
      // Check if emergency contact phone is empty or has a default value
      if (!this.emergencyContactPhone || this.emergencyContactPhone === 'default-value') 
        {
      errors.emergencyContactPhone = 'رقم هاتف في حالة الطوارئ مطلوب';
        }    


      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        errors.email = 'البريد الالكتروني مطلوب';
      } else if (!emailPattern.test(this.email)) {
        errors.email = 'البريد الإلكتروني غير صالح';
      }

       // Validate Arabic name fields to only allow Arabic characters
       const arabicPattern = /^[\u0600-\u06FF\s]+$/;  // Matches Arabic letters and spaces
       if (this.firstName && !arabicPattern.test(this.firstName)) {
           errors.firstName = 'الاسم الاول يجب أن يكون بالعربية فقط';
       }
       if (this.fatherName && !arabicPattern.test(this.fatherName)) {
           errors.fatherName = 'اسم الاب يجب أن يكون بالعربية فقط';
       }
       if (this.grandFatherName && !arabicPattern.test(this.grandFatherName)) {
           errors.grandFatherName = 'اسم الجد يجب أن يكون بالعربية فقط';
       }
       if (this.familyName && !arabicPattern.test(this.familyName)) {
           errors.familyName = 'اسم العائلة يجب أن يكون بالعربية فقط';
       }
       if (this.fullName && !arabicPattern.test(this.fullName)) {
           errors.fullName = 'الاسم الكامل يجب أن يكون بالعربية فقط';
       }

       // Validate English name fields to only allow English characters
       const englishPattern = /^[a-zA-Z\s]+$/;  // Matches English letters and spaces
       if (this.firstNameEnglish && !englishPattern.test(this.firstNameEnglish)) {
           errors.firstNameEnglish = 'الاسم الاول يجب أن يكون بالإنجليزية فقط';
       }
       if (this.fatherNameEnglish && !englishPattern.test(this.fatherNameEnglish)) {
           errors.fatherNameEnglish = 'اسم الاب يجب أن يكون بالإنجليزية فقط';
       }
       if (this.grandFatherNameEnglish && !englishPattern.test(this.grandFatherNameEnglish)) {
           errors.grandFatherNameEnglish = 'اسم الجد يجب أن يكون بالإنجليزية فقط';
       }
       if (this.familyNameEnglish && !englishPattern.test(this.familyNameEnglish)) {
           errors.familyNameEnglish = 'اسم العائلة يجب أن يكون بالإنجليزية فقط';
       }
       if (this.fullNameEnglish && !englishPattern.test(this.fullNameEnglish)) {
           errors.fullNameEnglish = 'الاسم الكامل يجب أن يكون بالإنجليزية فقط';
       }

  
       const idNumberPattern = /^\d{9}$/; // Ensures the ID number has exactly 9 digits

       if (!this.idNumber) {
           errors.idNumber = 'رقم الهوية مطلوب';
       } else if (!idNumberPattern.test(this.idNumber)) {
           errors.idNumber = 'رقم الهوية يجب أن يكون مؤلفاً من 9 أرقام.';
       }


      // Return the errors object (empty if no errors)
      return errors;
    }

}
// `${data.firstName} ${data.fatherName} ${data.grandFatherName} ${data.familyName}`
// `${data.firstNameEnglish} ${data.fatherNameEnglish} ${data.grandFatherNameEnglish} ${data.familyNameEnglish}`
export default CustomerProfileViewModel;
