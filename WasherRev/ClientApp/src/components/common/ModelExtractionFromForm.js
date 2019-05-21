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
    RoomId: form.roomId,
    ProducerId: form.producerId,
    SinceWhen: form.SinceWen,
    IsActive: form.IsActive,
    WorkedTo: form.WorkedTo
  }

  if(withId)
    return{ 'Id': form.id, ...washer}

  return washer;
}