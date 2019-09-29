import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {
    root:{
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',

    }
}
function DragableColorBox(props) {
    return (
        <div style={{backgroundColor:props.color}} className={props.classes.root}>
                        {props.name}
        </div>
    )
}

export default withStyles(styles)(DragableColorBox);