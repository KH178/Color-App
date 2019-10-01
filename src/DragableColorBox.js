import React from 'react';
import {withStyles} from '@material-ui/styles';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import {SortableElement} from 'react-sortable-hoc';

const styles = {
    root:{
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        '&:hover svg':{
 
            color: 'rgba(255,255,255,.8)',
            transform:'scale(1)',
            
        }
    },
    boxContent:{
        position: 'absolute',
        padding: '10px',
        width: '100%',
        letterSpacing: '1px',
        fontSize: '12px',
        left: '0',
        bottom: '0',
        color: '#000',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon:{
        color: 'rgba(0,0,0,.5)',
        transition: 'all .3s',
        transform:'scale(.8)',
    }
}
function DragableColorBox(props) {
    const {classes, deleteColorBox, name} = props
    return (
        <div style={{backgroundColor:props.color}} className={classes.root}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteForeverRoundedIcon className={classes.deleteIcon} onClick={deleteColorBox}/>
            </div>
                        
        </div>
    )
}

export default SortableElement(withStyles(styles)(DragableColorBox));