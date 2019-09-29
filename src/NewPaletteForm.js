import React, {useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import DragableColorBox from './DragableColorBox';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [bgColor, setBgColor] = useState('orangered');
  const [colors, addColor] = useState([]);
  const [newColorName, setColorName] = useState('');
  const [newPaletteName, setNewPaletteName] = useState('');

  useEffect(()=>{
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
     colors.every(({name})=> name.toLowerCase() !== value.toLowerCase())
  );
   ValidatorForm.addValidationRule('isColorUnique',() => {
    return colors.every(({color})=> color !== bgColor
    )
   });
  })

  const handleCreateNewColor = (evt) => {
    const color = {color: bgColor, name: newColorName}
    addColor([...colors,color]);
    setColorName('');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleFormChange = (evt) =>{
    setColorName(evt.target.value)
  }
  const handleSetNewPaletteName = (evt) =>{
    setNewPaletteName(evt.target.value)
  } 
  const handleSave = () =>{
    let newName = 'New Test Palette';
    const newPalette = {
      paletteName: 'New Test Palette',
      colors,
      id: newName.toLowerCase().replace(/ /g,'-'),
      emoji: '😁'
    }
    props.savePalette(newPalette);
    props.history.push('/');
  }



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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSave}>
          <TextValidator label="Palette Name" value={newPaletteName} onChange={handleSetNewPaletteName}/>
          <Button variant="contained" color="primary" >Save Palette</Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div>
        <Typography variant='h4'>Design your Palette</Typography>
        <Button variant="contained" color="secondary" className={classes.button}>Clear Palette</Button>
        <Button variant="contained" color="primary" className={classes.button}>Random Color</Button>
        </div>

        <ChromePicker onChangeComplete={event => {
          setBgColor(event.hex)}
          } color={bgColor}/>
        <ValidatorForm onSubmit={handleCreateNewColor}>
          <TextValidator value={newColorName} 
          onChange={handleFormChange} 
          name='setColorName'
          validators={['required','isColorNameUnique','isColorUnique']}
          errorMessages={['This field is required!','Color name must be unique!','Color already used!']}
          />
          <Button type={"submit"} variant="contained" color="primary" style={{backgroundColor:bgColor}}>Add Color</Button>
        </ValidatorForm>
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

          {colors.map(color=>(
            <DragableColorBox color={color.color} name={color.name} key={color.name}/>
          ))}

      </main>
    </div>
  );
}