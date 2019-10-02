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
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/NewPaletteFormNavbarStyles';

// const drawerWidth = '350';

// const styles = theme => ({
//     root:{
//         display: 'flex'
//     },
//     appBar: {
//         transition: theme.transitions.create(['margin', 'width'], {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         heigth: '64px'
//       },
//       appBarShift: {
//         width: `calc(100% - ${drawerWidth}px)`,
//         marginLeft: drawerWidth,
//         transition: theme.transitions.create(['margin', 'width'], {
//           easing: theme.transitions.easing.easeOut,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//       },
//       navBtns:{
//           marginRight: '1rem',
//           '& a':{
//             textDecoration: 'none',
//             }
//       },
//       button:{
//           margin: '0 .5rem',
//       }
// })

class NewPaletteFormNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            formShowing: false
        }
        this.handleformShowing = this.handleformShowing.bind(this)
        this.hideDialogForm = this.hideDialogForm.bind(this)
        // this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
        // this.handleSetNewPaletteName = this.handleSetNewPaletteName.bind(this)
    }
    // componentDidMount(){
    //     ValidatorForm.addValidationRule('PaletteNameUnique',(value) => {
    //         return this.props.palettes.every(({paletteName})=> paletteName.toLowerCase() !== value.toLowerCase()
    //         )
    //        });
    // }
   
    // handleSetNewPaletteName(evt){
    //     this.setState({
    //         newPaletteName: evt.target.value
    //     })
    //   } 
    handleformShowing(){
        this.setState({
            formShowing: true
        })
    }

    hideDialogForm(){
        this.setState({
            formShowing: false
        })
    }


    render() { 
        const {classes, open, handleDrawer, handleSave} = this.props;
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
               {!open && <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={()=>handleDrawer(!open)}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                     <MenuIcon />
                </IconButton>}
                <Typography variant="h6" noWrap>
                    Create A Palette 
                </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                {this.state.formShowing && <PaletteMetaForm palettes={this.props.palettes} handleSave={handleSave} hideDialogForm={this.hideDialogForm}/>}
                <Link to='/'>
                <Button variant="contained" color="secondary" className={classes.button}>Go Back</Button>
                </Link>
                <Button variant="contained" color="primary" onClick={this.handleformShowing} className={classes.button}>
                    Save
                </Button>
                </div>
            </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(NewPaletteFormNavbar);