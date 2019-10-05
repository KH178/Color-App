import React from 'react';
import {withStyles} from '@material-ui/styles';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import {SortableElement} from 'react-sortable-hoc';
import styles from './styles/DragableColorBoxStyles';

function DragableColorBox(props) {
    const {classes, deleteColorBox, name, color} = props
    return (
        <div style={{backgroundColor:color}} className={classes.root}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteForeverRoundedIcon className={classes.deleteIcon} onClick={deleteColorBox}/>
            </div>
                        
        </div>
    )
}

export default SortableElement(withStyles(styles)(DragableColorBox));