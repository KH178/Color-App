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
    this.state = {
      palettes: seedColors
    }
    this.savePalette = this.savePalette.bind(this)
    this.findPalette = this.findPalette.bind(this)
  }
  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    })
  }
  savePalette(newPalette){
    console.log(newPalette);
    console.log(seedColors);
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    })
  }
  render() {
  return (
    <Switch>
    <Route exact path='/palette/new' render={(routeProps)=><NewPaletteForm savePalette={this.savePalette} {...routeProps}/>}/>
    <Route exact path='/' render={(routeProps)=> <PaletteList palette={this.state.palettes} {...routeProps}/>}/>
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
