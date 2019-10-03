import React,{Component} from 'react';
import {Route, Switch} from 'react-router-dom'; 
import './App.css';
import Palette from './Palette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';



class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('Palettes'));
    this.state = {
      palettes: savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this)
    this.findPalette = this.findPalette.bind(this)
    this.deletePalette = this.deletePalette.bind(this)
  }
  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    })
  }
  deletePalette(id){
   this.setState((
     st => ({palettes: st.palettes.filter(palette => palette.id !== id)})
   ),this.syncLocalStorage)
   console.log(this.state.palettes);
   console.log(id);
  }

  savePalette(newPalette){
    // console.log(newPalette);
    // console.log(seedColors);
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    },this.syncLocalStorage);
    
  }
  syncLocalStorage(){
    //saves palettes to localstorage
    window.localStorage.setItem('Palettes',JSON.stringify(this.state.palettes))
  }
  render() {
  return (
    <Switch>
    <Route exact path='/palette/new' render={(routeProps)=><NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps}/>}/>
    <Route exact path='/' render={(routeProps)=> <PaletteList palette={this.state.palettes} {...routeProps} deletePalette={this.deletePalette}/>}/>
    <Route exact path='/palette/:id' render={(routeProps)=> <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>}/>
    <Route exact path='/palette/:paletteId/:colorId' render={(routeProps)=><SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId}/>}/>
    </Switch>
    
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])}/>
    // </div>
  );
}
}
export default App;
