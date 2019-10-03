import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import {Link} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/NewPaletteFormNavbarStyles';
import CreateIcon from '@material-ui/icons/Create';

class NewPaletteFormNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            formShowing: false
        }
        this.handleformShowing = this.handleformShowing.bind(this)
        this.hideDialogForm = this.hideDialogForm.bind(this)
    }

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
                     <CreateIcon />
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