export const buildingOption = (building) => {
    return {
      value: building.id,
      label: `Nr ${building.id} : ${building.name} ${building.street} ${building.streetNo} ${building.postCode}`
    }
  }

export const roleOption = (role) => {
    return {
      value: role.id,
      label: role.name
    }
  }