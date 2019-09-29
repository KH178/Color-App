import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import {withStyles} from '@material-ui/styles'; 
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    goToPalette(id){
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const {palette,classes} = this.props;
        const paletteName = palette.map(p=>(
            <MiniPalette {...p} handleClick={()=>this.goToPalette(p.id)}/>
        ))
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                         <h1>React Colors</h1>
                         <Link to='/palette/new'>Create new</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {paletteName}
                    </div>    
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);