import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import styles from './styles/ColorBoxStyles';
import {withStyles} from '@material-ui/styles';

class ColorBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState(e){
         this.setState({copied: true },()=>{
            setTimeout(()=>{ 
                this.setState({
                    copied: false
                })
            }, 1500);
        })    
    }

    render(){      
        const {name, background, colorId, paletteId,showLink,classes} = this.props;
        const {copied} = this.state;
        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div className={classes.ColorBox} style={{background}}>
                <div 
                style={{background}} 
                className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
                />   
                <div className="copy-container">
                    <div className={classes.boxContent}>
                        <span className={`${classes.colorName}`}>{name}</span>
                    </div>
                    <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
                        <h1 className={`${classes.copyText}`}>Copied!</h1>
                        <p className={`${classes.copyText}`}>{background}</p>
                    </div>
                    <button className={classes.copyButton}>Copy</button>
                </div>
               { showLink && <Link to={`/palette/${paletteId}/${colorId}`} onClick={e=>e.stopPropagation()}>
                <span className={`${classes.seeMore}`}>More</span>
                </Link>}
            </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);