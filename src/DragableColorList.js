import React, { Component } from 'react';
import DragableColorBox from './DragableColorBox';
import {SortableContainer} from 'react-sortable-hoc';

class DragableColorList extends Component {
    render() {
        const {colors,removeColor} = this.props;
        return (
            <div style={{height:'100%'}}>
                 {colors.map((color, i)=>(
            <DragableColorBox color={color.color} index={i} name={color.name} key={color.name} deleteColorBox={()=>removeColor(color.name)}/>
          ))}
            </div>
        );
    }
}

export default SortableContainer(DragableColorList);