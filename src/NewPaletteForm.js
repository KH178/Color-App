import React, {useState} from 'react';
import clsx from 'clsx';
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
import useStyles from  './styles/NewPaletteFormStyles'

function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [colors, addColor] = useState(props.palettes[0].colors);
  const [newPaletteName] = useState('');
  const maxColors = 20;
  const isDisabled = colors.length >= maxColors ? true : false;
 

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



  const handleSave = (newPaletteName, emoji) =>{
    const newPalette = {
      paletteName: newPaletteName,
      colors,
      id: newPaletteName.toLowerCase().replace(/ /g,'-'),
      emoji
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
        
        <div className={classes.container}>
        <Typography variant='h4' gutterBottom>Design your Palette</Typography>
        <div className={classes.buttons}>
        <Button variant="contained" color="secondary" className={classes.button} onClick={clearPalette}>Clear Palette</Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={addRandomColor} disabled={isDisabled}>Random Color</Button>
        </div>
        <ColorPickerForm isDisabled={isDisabled} handleCreateNewColor={handleCreateNewColor} colors={colors}/>
        </div>
    
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