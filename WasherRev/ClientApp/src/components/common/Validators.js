export const emailValidator = (value) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(value).toLowerCase()))
      return 'Podano niepoprawny email!';

    return true;
  }

  export const streetNumberValidator = (value) => {
    const nan = isNaN(parseInt(value));

    if(nan)
      return 'Podana wartość musi być liczbą!';

    return true;
  }

  export const postCodeValidator = (value) => {
    var splited = value.split("-");
    if(splited.length != 2)
      return 'Niepoprawny kod pocztowy';

    if(splited[0].length !== 2 || splited[1].length !== 3)
      return 'Niepoprawny kod pocztowy';

    var re = /[0-9]{2}-[0-9]{3}/;
    if(!re.test(String(value).toLowerCase()) || String(value).length !== 6)
      return 'Niepoprawny kod pocztowy';

    return true;
  }

  export const phoneNumberValidator = (value) => {
    var reg = /^[0-9\+]{8,13}$/;
    if(!reg.test(value)) 
        return 'NIeprawidłowy numer telefonu!';
    else
        return true;
  }