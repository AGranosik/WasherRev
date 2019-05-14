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