import React from 'react';
import apiProvider from '../../api/apiProvider';
import Dropdown from 'react-dropdown';

class CustomDropDownListModalBody extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        list: []
      };
    }

    selectedValue = 0;

    async componentDidMount(){
      if(this.state.list.length == 0){
        console.log('1');
        console.log(this.state);
        var response = await apiProvider(this.props.token).get(this.props.url);
        this.setState({
          list: response.data
        });
      }
    }

    async componentDidUpdate(){
      if(this.state.list.length == 0){
        var response = await apiProvider(this.props.token).get(this.props.url);
        this.setState({
          list: response.data
        });
      }
    }

    getFieldValue = () => {
      return this.selectedValue || 0;
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
      this.selectedValue = e.label;
    }
  
    render() {
      return (
      <Dropdown
          options={this.getOptions()}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          value={this.selectedValue}
         />
      );
    }
  }

export default CustomDropDownListModalBody;