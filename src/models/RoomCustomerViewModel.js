export default class RoomViewModel {
    constructor(data={}, profilePackageId, roomTypeId, profileId) {
    //   this.id = id;
      this.roomNumber = data.roomNumber;
      this.profilePackageId = profilePackageId;
      this.roomTypeId = roomTypeId;
      this.profileId = profileId;
    }
  }
  