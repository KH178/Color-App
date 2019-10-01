import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import {Link} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = '350';

const styles = theme => ({
    root:{
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        heigth: '64px'
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
})

class NewPaletteFormNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            newPaletteName : ''
        }
        // this.handleSave = this.handleSave.bind(this)
        // this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
        this.handleSetNewPaletteName = this.handleSetNewPaletteName.bind(this)
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('PaletteNameUnique',(value) => {
            return this.props.palettes.every(({paletteName})=> paletteName.toLowerCase() !== value.toLowerCase()
            )
           });
    }
   
    // handleDrawerOpen(){

    // }
    handleSetNewPaletteName(evt){
        this.setState({
            newPaletteName: evt.target.value
        })
      } 


    render() { 
        const {classes, open, handleDrawer} = this.props;
        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={()=>handleDrawer(!open)}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Create A Palette 
                </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                <ValidatorForm onSubmit={()=>this.props.handleSave(this.state.newPaletteName)}>
                <TextValidator label="Palette Name"
                value={this.state.newPaletteName} 
                onChange={this.handleSetNewPaletteName}
                validators={['required','PaletteNameUnique']}
                errorMessages={['This field is required!','Name already used!']}           
                />
                <Button type={'submit'} variant="contained" color="primary" >Save Palette</Button>
                </ValidatorForm>
                <Link to='/'>
                <Button variant="contained" color="secondary">Go Back</Button>
                </Link>
                </div>
            </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(NewPaletteFormNavbar);