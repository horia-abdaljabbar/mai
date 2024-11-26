// src/models/ProfilePackageViewModel.js

export default class ProfilePackageViewModel {
    constructor(data = {}, customerProfileId, bookingManagerId,packageId,tripDateId) {
        this.profilePackageId = data.profilePackageId || 0;
        this.tripDateId = tripDateId || 0;
        this.packageId =packageId || 0;
        this.bookingManagerId = bookingManagerId || 0; // Link to booking manager
        this.customerProfileId = customerProfileId || 0; // Link to customer profile
        this.iUser = data.iUser || "";  // Default placeholder for inserted user
        this.iDate = data.iDate || ""; // Default or specified insertion date
        this.uUser = data.uUser || "";  // Default placeholder for updated user
        this.uDate = data.uDate || ""; // Default or specified update date
    }
}
