
class ProfilePackageViewModel {
    constructor(data={},pricePackageId, packageTripDateId, roomTypeId) {
        this.pricePackageId = pricePackageId;
        this.packageTripDateId = packageTripDateId;
        this.roomTypeId = roomTypeId;
        this.wholesalePrice = data.wholesalePrice;
        this.sellingPrice = data.sellingPrice;
    }

    // Optional: Add any methods for validation or transformations if needed
}
