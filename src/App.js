import React,{Component} from 'react';
import {Route, Switch} from 'react-router-dom'; 
import './App.css';
import Palette from './Palette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import PaletteList from './PaletteList';
// import SingleColorPalette from './SingleColorPalette';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page from './Page';



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
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500}>
          <Switch location={location}>
            <Route exact path='/palette/new' render={(routeProps)=><Page><NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps}/></Page>}/>
            <Route exact path='/' render={(routeProps)=> <Page><PaletteList palette={this.state.palettes} {...routeProps} deletePalette={this.deletePalette}/></Page>}/>
            <Route exact path='/palette/:id' render={(routeProps)=> <Page><Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/></Page>}/>
            <Route render={(routeProps)=><Page><PaletteList palette={this.state.palettes} {...routeProps} deletePalette={this.deletePalette}/></Page>}/>
          </Switch>
          </CSSTransition>
        </TransitionGroup>
    )}/>
  );
}
}
export default App;
