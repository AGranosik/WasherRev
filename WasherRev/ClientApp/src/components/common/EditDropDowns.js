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

  export const roomOption = (room) => {
    return {
      value: room.id,
      label: `Nr ${room.id} :  ${room.name}`
    }
  }

  export const producerOption = (producer) => {
    return {
      value: producer.id,
      label: `Nr ${producer.id} :  ${producer.name}`
    }
  }