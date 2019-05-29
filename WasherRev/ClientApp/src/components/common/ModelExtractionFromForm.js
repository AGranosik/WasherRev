export const user_extract = (form, withId = false) => {
    var user = {
        Email: form.email,
        BuildingId: form.buildingName.split(" ")[1],
        Password: form.password,
        RoleName: form.roleName,
        Username: form.username,
        IsActive: 1
      }
    if(withId)
      return {'Id': form.id, ...user};

    return user;
}

export const building_extract = (form, withId = false) => {
  var building = {
    Name: form.name,
    Street: form.street,
    StreetNo: form.streetNo,
    PostCode: form.postCode,
    IsActive: 1
  }

  if(withId)
    return { 'Id': form.id, ...building };

  return building;
}

export const producer_extract = (form, withId = false) => {
  var producer = {
    Name: form.name,
    ServicePhoneNo: form.servicePhoneNo
  }

  if(withId)
    return {'Id': form.id, ...producer};

  return producer;
}

export const washer_extract = (form, withId = false) => {
  var washer = {
    Name: form.name,
    RoomId: form.roomName.split(" ")[1],
    ProducerId: form.producerName.split(" ")[1],
    SinceWhen: form.sinceWhen == "" ? undefined : `${form.sinceWhen}T00:00:00`,
    IsActive: 1,
    WorkedTo: form.workedTo == "" ? undefined : form.workedTo
  }
  if(withId)
    return{ 'Id': form.id, ...washer}

  return washer;
}

export const room_extract = (form, withId = false) => {
  var room = {
    Name: form.name,
    Floor: form.floor,
    Capacity: form.capacity,
    BuildingId: form.buildingName.split(" ")[1],
    IsActive: 1
  }

  if(withId)
    return { 'Id': form.id, ...room}
  
    return room;
}