class BusReservationViewModel {
    constructor(data={},packageId) {
    //   this.id = data.id;
      this.reservationType = data.reservationType;
      this.price = data.price;
      this.reservationDate = data.reservationDate;
      this.packageId = packageId;
      this.busNumber = data.busNumber;
      this.busType = data.busType;
      this.numberOfSeats = data.numberOfSeats||5;
      this.pickupLocation = data.pickupLocation;
      this.dropoffLocation = data.dropoffLocation;
    }
  
    // Optional: Add any methods for validation or data manipulation here
  }
  export default BusReservationViewModel;
