import Sizes from './Sizes';
import chroma from 'chroma-js';
const styles = {
    root:{
        width: '20%',
        height: '25%',
        margin: '-3px auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        '&:hover svg':{
            color: 'rgba(255,255,255,.8)',
            transform:'scale(1)',
        },
        [Sizes.down('lg')]:{
            width: '25%',
            height: '20%'
        },
        [Sizes.down('md')]:{
            width: '50%',
            height: '10%'
        },
        [Sizes.down('sm')]:{
            width: '100%',
            height: '5%'
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
        color: props => chroma(props.color).luminance() <= .3 ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.8)',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon:{
        color: props => chroma(props.color).luminance() <= .3 ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.8)',
        transition: 'all .3s',
        transform:'scale(.8)',
    }
}

export default styles;