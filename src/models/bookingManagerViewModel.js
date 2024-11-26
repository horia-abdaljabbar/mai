// src/models/BookingManager.js
export default class BookingManager {
    constructor(data = {},customerProfileId) {
        this.bookingDate = data.bookingDate || "2024-11-03T00:00:00";
        this.bookingNumber = data.bookingNumber || "20241103-20241115-AMM-JED-2Cust-1Pkg-001";
        this.status = data.status || 1;
        this.bookingType = data.bookingType || 'group';
        this.numberOfCustomers = data.numberOfCustomers || 0;
        this.numberOfRooms = data.numberOfRooms || 0;
        this.numberOfPackages = data.numberOfPackages || 0;
        this.totalCost = data.totalCost || 0;
        this.iUser = data.iUser || "horia@gmail.com";
        this.iDate = data.iDate || "2024-11-03T11:46:04.9319794";
        this.customerProfileId = customerProfileId;
    }
}
