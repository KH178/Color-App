import React, {Component} from 'react';
import "rc-slider/assets/index.css";
import styles from './styles/NavBarStyles';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';


class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            format : 'hex',
            open: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }
    handleChange(e){
        this.setState({
            format: e.target.value,
            open:true
        },()=>{
            this.props.handleChange(this.state.format);
        })   
    }
    closeSnackBar(e){
        this.setState({open:false})
    }
    render(){
        const {level, changeLevel, showSlider, classes} = this.props;
        const {format} = this.state;
        return(
            <header className={classes.NavBar}>
                <div className={classes.Logo}>     
                    <Link to="/">reactcolorpicker</Link>
                </div>
               {showSlider && <div className="slider-container">
                <span>Level: {level}</span>
                <div className={classes.Slider}>
                <Slider
                    defaultValue={level}
                    min={100} 
                    max={900}
                    step={100}
                    onAfterChange={changeLevel} 
                />
                </div>    
                </div>  }  
                <div className={classes.SelectContainer}>
                <Select value={format} onChange={this.handleChange}>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgb(255,255,255,1.0)</MenuItem>
                </Select>
                </div>
                <Snackbar 
                anchorOrigin={{vertical:"bottom", horizontal:"left"}} 
                open={this.state.open}
                autoHideDuration={3000}
                message={<span className="message-id">Format changed to: <strong>{format.toUpperCase()}</strong></span>}
                ContentProps={{
                    "ario-describeby": "message-id"
                }}
                action={[
                    <IconButton onClick={this.closeSnackBar} color="inherit" key="close" aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                ]}
                onClose={this.closeSnackBar}
                />
            </header>
        )
    }
}

export default withStyles(styles)(NavBar);