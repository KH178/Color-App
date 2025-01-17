import React, {Component} from 'react';
import ColorBox from './ColorBox';
import styles from './styles/PaletteStyles';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import {withStyles} from '@material-ui/styles';


class Palette extends Component{   
    constructor(props){
        super(props);
        this.state = {level: 500, format:'hex'}
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level){
        this.setState({ level });
    }
    changeFormat(val){
        this.setState({
            format: val
        })
    }
    render(){
        const {colors, paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        const {level, format} = this.state;
        const colorBoxes = colors[level].map(c=>(
            <ColorBox background={c[format]} name={c.name} key={c.id} colorId={c.id} paletteId={id} showLink/>
        ))
        return(
            <div className={classes.Palette}>
                <NavBar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showSlider/>
                <div className={classes.PaletteColors}>
                    {colorBoxes}                                    
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(Palette);