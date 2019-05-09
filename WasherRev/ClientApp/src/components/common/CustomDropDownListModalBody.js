import React from 'react';
import apiProvider from '../../api/apiProvider';
import Dropdown from 'react-dropdown';

class CustomDropDownListModalBody extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        selectedValue: 0,
        list: []
      };
    }

    async componentDidMount(){
      console.log(this.props);
      var response = await apiProvider(this.props.token).get(this.props.url);
      this.setState({
        list: response.data
      });
    }

    getFieldValue = () => {
      return this.state.selectedValue || 0;
    }

    getOptions = () => {
      const { list } = this.state;
      if(list){
        return list.map((element) => {
         return this.props.dropdownOption(element);
        })
      }
    }

    onChange = (e) => {
      console.log(e);
      this.setState({
        selectedValue: e.value}
        );
    }
  
    render() {
      return (
      <Dropdown
          options={this.getOptions()}
          placeholder="Wybierz budynek przypisania do użytkownika"
          onChange={this.onChange}
          value={this.state.selectedValue}
         />
      );
    }
  }

export default CustomDropDownListModalBody;