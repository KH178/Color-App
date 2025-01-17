import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/styles'; 
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state = {
            miniPaletteShowing: true,
            openDeleteDialog: false,
            deletingId: ''
        };
        this.handleDelete = this.handleDelete.bind(this)
        this.openDialog = this.openDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.goToPalette = this.goToPalette.bind(this)
    }
    openDialog(id) {
        this.setState({
            openDeleteDialog: true,
            deletingId:id
        })
    }
    closeDialog() {
        this.setState({
            openDeleteDialog: false,
            deletingId:''
        })
    }
    goToPalette(id){
        this.props.history.push('/palette/' + id);
        
    }
    handleDelete() {
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog()
    }
    render() {
        const { palette, classes } = this.props;
        const { openDeleteDialog } = this.state;
        
        const paletteName = palette.map(p=>(
            <CSSTransition key={p.id} classNames='fade'
             timeout={500} unmountOnExit>
                <MiniPalette {...p}
                    handleClick={this.goToPalette} key={p.id}
                    // deletePalette={deletePalette}
                    openDialog={this.openDialog} />
            </CSSTransition>
        )) 
       
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                         <h1 className={classes.heading}>React Colors</h1>
                         <Link to='/palette/new'>Create new</Link>
                    </nav>
                        <TransitionGroup className={classes.palettes}>
                        {paletteName}
                        </TransitionGroup>
                     
                </div>
                <Dialog open={openDeleteDialog} area-labelledby="delete-dialog-title" onClose={this.closeDialog}>
                    <DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                            <Avatar style={{backgroundColor:blue[100], color:blue[600]}}>
                             <CheckIcon /> 
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Delete' />
                        </ListItem>
                
                        <ListItem button onClick={this.closeDialog}>
                        <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                            <ClearIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Cancel" />
                        </ListItem>
                                        
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);