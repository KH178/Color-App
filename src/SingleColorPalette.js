import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import styles from './styles/PaletteStyles';
import PaletteFooter from './PaletteFooter';
import {withStyles} from '@material-ui/styles';


class SingleColorPalette extends Component {
    constructor(props){
        super(props);
            this.state = {
                format: 'hex'
            }
            this._shades = this.generateShades(this.props.palette, this.props.colorId);
            console.log(this._shades);
            this.changeFormat = this.changeFormat.bind(this);
            
    }

    generateShades(palette, colorToFilterBy){
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color=>color.id === colorToFilterBy)
            )
        }
        return shades.slice(1);
    }
    changeFormat(val){
        this.setState({
            format: val
        })
    }
    render() {
        const {format} = this.state;
        const {paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        
        const colorShades = this._shades.map(color=>(
            <ColorBox background={color[format]} name={color.name} key={color.name} showLink={false}/>
            
        ))
 
        return (
            <div className={classes.Palette}>
                <NavBar handleChange={this.changeFormat} showSlider={false}/>
                <div className={classes.PaletteColors}>
                {colorShades}
                <div className={classes.goBack}>
                <Link to={`/palette/${id}`}>Go Back</Link>
                </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);