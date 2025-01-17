import React, { PureComponent } from 'react';
import {withStyles} from '@material-ui/styles'; 
import styles from './styles/MiniPaletteStyles';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';


class MiniPalette extends PureComponent {
    constructor(props){
        super(props);
        this.detetePalette = this.detetePalette.bind(this);

    }
    detetePalette(e){
        e.stopPropagation();
        this.props.openDialog(this.props.id);
        
    }
    render() {
        const {classes,paletteName,emoji,colors, handleClick,id} = this.props;
        const miniColorBoxes = colors.map(color=>(
        <div className={classes.miniColorBox} style={{backgroundColor:color.color}} key={color.name}></div>
    ))
        return (
            <div className={classes.root} onClick={()=>handleClick(id)}>
                <DeleteRoundedIcon
                 className={classes.deleteIcon}
                 onClick={this.detetePalette}                 
                 />
                <div className={classes.colors}>{miniColorBoxes}</div>
               <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
            </div>
        );
}}

export default  withStyles(styles)(MiniPalette);