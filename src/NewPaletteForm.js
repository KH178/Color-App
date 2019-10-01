import React, {useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DragableColorList from './DragableColorList';
import arrayMove from 'array-move';
import NewPaletteFormNavbar from './NewPaletteFormNavbar';
import ColorPickerForm from './ColorPickerForm';


const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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

function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [colors, addColor] = useState(props.palettes[0].colors);
  const [newPaletteName] = useState('');
  const maxColors = 20;
  const isDisabled = colors.length >= maxColors ? true : false;
 
  useEffect(()=>{
  //   ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
  //    colors.every(({name})=> name.toLowerCase() !== value.toLowerCase())
  // );
  //  ValidatorForm.addValidationRule('isColorUnique',() => {
  //   return colors.every(({color})=> color !== bgColor
  //   )
  //  });
  //  ValidatorForm.addValidationRule('PaletteNameUnique',(value) => {
  //   return props.palettes.every(({paletteName})=> paletteName.toLowerCase() !== value.toLowerCase()
  //   )
  //  });
  })

  const handleCreateNewColor = (bgCol, newCol) => {
    const color = {color: bgCol, name: newCol}
    addColor([...colors,color]);
  };

  const handleDrawer = (op) => {
    console.log(op);
    setOpen(op);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const handleFormChange = (evt) =>{
  //   setColorName(evt.target.value)
  // }
  // const handleSetNewPaletteName = (evt) =>{
  //   setNewPaletteName(evt.target.value)
  // } 

  const handleSave = (newPaletteName) =>{
    const newPalette = {
      paletteName: newPaletteName,
      colors,
      id: newPaletteName.toLowerCase().replace(/ /g,'-'),
      emoji: '😁'
    }
    props.savePalette(newPalette);
    props.history.push('/');
  }

    const removeColor = (colorName) =>{
      const newColors = colors.filter(color => color.name !== colorName)
      addColor(newColors)
    }
   const onSortEnd = ({oldIndex, newIndex}) => {
      const color= arrayMove(colors, oldIndex, newIndex);
      addColor(color);
    };

    const clearPalette = () =>{
      addColor([]);
    }

    const addRandomColor = () => {
      const paletteToChooseFrom = props.palettes.slice(1);
      const randomPalette = paletteToChooseFrom[Math.floor(Math.random()*paletteToChooseFrom.length)];
      const randomColor = randomPalette.colors[Math.floor(Math.random()*randomPalette.colors.length)];
     addColor([...colors,randomColor]);
     
    }
    



  return (
    <div className={classes.root}>
      {/* <CssBaseline />
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
          <TextValidator label="Palette Name"
           value={newPaletteName} 
           onChange={handleSetNewPaletteName}
           validators={['required','PaletteNameUnique']}
           errorMessages={['This field is required!','Name already used!']}           
           />
           <Link to='/'>
           <Button variant="contained" color="secondary">Go Back</Button>
           </Link>
          <Button type={'submit'} variant="contained" color="primary" >Save Palette</Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar> */}
      <NewPaletteFormNavbar open={open} palettes={props.palettes} newPaletteName={newPaletteName} handleSave={handleSave} handleDrawer={handleDrawer}/>
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
        <Button variant="contained" color="secondary" className={classes.button} onClick={clearPalette}>Clear Palette</Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={addRandomColor} disabled={isDisabled}>Random Color</Button>
        </div>

        {/* <ChromePicker onChangeComplete={event => {
          setBgColor(event.hex)}
          } color={bgColor}/>
        <ValidatorForm onSubmit={handleCreateNewColor}>
          <TextValidator value={newColorName} 
          onChange={handleFormChange} 
          name='setColorName'
          validators={['required','isColorNameUnique','isColorUnique']}
          errorMessages={['This field is required!','Color name must be unique!','Color already used!']}
          />
          <Button type={"submit"} variant="contained" color="primary" style={{backgroundColor:!isDisabled && bgColor}} disabled={isDisabled}>{isDisabled ? 'Palette Full':'Add Color'}</Button>
        </ValidatorForm> */}
        <ColorPickerForm isDisabled={isDisabled} handleCreateNewColor={handleCreateNewColor} colors={colors}/>
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
         <DragableColorList colors={colors} removeColor={removeColor} axis="xy" onSortEnd={onSortEnd}/>

      </main>
    </div>
  );
} 

export default NewPaletteForm;