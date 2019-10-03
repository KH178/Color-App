import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import 'emoji-mart/css/emoji-mart.css'
import data from 'emoji-mart/data/messenger.json'
import { NimblePicker } from 'emoji-mart'

class PaletteMetaForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            open : true,
            newPaletteName : '',
            stage:'form'
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleSetNewPaletteName = this.handleSetNewPaletteName.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }

    componentDidMount(){
        ValidatorForm.addValidationRule('PaletteNameUnique',(value) => {
            return this.props.palettes.every(({paletteName})=> paletteName.toLowerCase() !== value.toLowerCase()
            )
           });
    }

    handleClickOpen (){
        this.setState({
            stage : 'form'
        })
      };

      handleSetNewPaletteName(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
      } 
      showEmojiPicker(){
        this.setState({
          stage: 'emoji'
        })
      }
      savePalette(emoji){
        this.props.handleSave(this.state.newPaletteName, emoji.native)
      }
    render() {
        const {newPaletteName,stage} = this.state;
        const {hideDialogForm} = this.props;
        return (
            <div>
            <Dialog open={stage === 'emoji'} onClose={hideDialogForm}>
                <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                <NimblePicker set='messenger' data={data} onSelect={this.savePalette} title='reactcolorpicker'/>
            </Dialog> 
            <Dialog open={stage === 'form'} onClose={hideDialogForm} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={this.showEmojiPicker}>
              <DialogContent>
                <DialogContentText>
                  <Typography variant='h6' component={'span'}> Please enter the name for your Palette. Make sure it's unique.</Typography>
                  <Typography variant="caption" display="block">Palette name cannot be changed after saving.</Typography>
                </DialogContentText>
                <TextValidator label="Palette Name"
                value={newPaletteName} 
                name='newPaletteName'
                fullWidth
                margin="normal"
                onChange={this.handleSetNewPaletteName}
                validators={['required','PaletteNameUnique']}
                errorMessages={['This field is required!','Name already used!']}           
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={hideDialogForm} color="primary">
                  Cancel
                </Button>
                <Button type={'submit'} variant="contained" color="primary" >Save Palette</Button>
                </DialogActions>
              </ValidatorForm>
            </Dialog>
            </div>      
        );
    }
}

export default PaletteMetaForm;