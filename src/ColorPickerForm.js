import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles'

class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state = {bgColor: 'teal',newColorName:''}
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
   componentDidMount(){
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
    this.props.colors.every(({name})=> name.toLowerCase() !== value.toLowerCase())
      );
    ValidatorForm.addValidationRule('isColorUnique',() => {
    return this.props.colors.every(({color})=> color !== this.state.bgColor
    )
    });
   }
    
    handleFormChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleOnSubmit(e){
        this.props.handleCreateNewColor(this.state.bgColor,this.state.newColorName);
        this.setState({
            newColorName:''
        })

    }
 
    render() {
        const {isDisabled, classes} = this.props;
        const {bgColor,newColorName} = this.state;
        return (
        <div className={classes.colorPickerContainer}>
            <ChromePicker onChangeComplete={event => {
                this.setState({bgColor:event.hex})}
                } color={bgColor}
                className={classes.colorPicker}
               />
            <ValidatorForm onSubmit={this.handleOnSubmit}>
                <TextValidator value={newColorName} 
                    onChange={this.handleFormChange} 
                    name='newColorName'
                    className={classes.colorNameInput}
                    margin="normal"
                    variant="outlined"
                    label="Color name"
                    validators={['required','isColorNameUnique','isColorUnique']}
                    errorMessages={['This field is required!','Color name must be unique!','Color already used!']}
                  />
            <Button type={"submit"} variant="contained" className={classes.addColor} color="primary" style={{backgroundColor:!isDisabled && bgColor}} disabled={isDisabled}>{isDisabled ? 'Palette Full':'Add Color'}</Button>
            </ValidatorForm>      
        </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);