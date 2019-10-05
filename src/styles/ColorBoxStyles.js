import chroma from 'chroma-js';
import Sizes from './Sizes';

export default {
    ColorBox:{
        width: '20%',
        height: props => props.showLink ? '25%' : '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        textTransform: 'uppercase',
        marginBottom: '-4px',
        '&:hover button':{
            opacity: '1'
        },
        [Sizes.down('md')]:{
            width: '50%',
            height: props => props.showLink ? '10% ': '20%',
        },
        [Sizes.down('xs')]:{
            width: '100%',
            height: props => props.showLink ? '5% ': '10%',
        }
    },
    copyText:{
        color: props => chroma(props.background).luminance() >= .5 ? 'rgba(0,0,0,.8)' : 'rgba(255,255,255,.8)'
    },
    colorName:{
        color: props => chroma(props.background).luminance() <=.3 ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.8)'
    },
    seeMore:{
        color: props => chroma(props.background).luminance() <=.3 ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.8)',
        position: 'absolute',
        right: 0,
        bottom: 0,
        background: 'rgba(255,255,255,.3)',
        width: '60px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        textTransform: 'uppercase',
        fontWeight: 400,
    },
    copyButton:{
        color: props => chroma(props.background).luminance() <=.3 ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.8)', 
        width: '100px',
        height:'30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        textAlign: 'center',
        border: "none",
        outline: "none",
        cursor: 'pointer',
        background: 'rgba(255,255,255,.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        opacity: '0',
        textDecoration: 'none',    
    },
    boxContent:{
        position: 'absolute',
        padding: '10px',
        width: '80%',
        letterSpacing: '1px',
        fontSize: '12px',
        left: '0',
        bottom: '0',
        color: '#000',
    },
   
    copyOverlay:{
        opacity: '0',
        zIndex: '0',
        width: '100%',
        height: '100%',
        transition: 'transform .5s ease-in-out',
        transform: 'scale(.1)',
    },
    showOverlay:{
        transform: 'scale(50)',
        opacity: '1',
        zIndex: '10',
        position: 'absolute',
        cursor: 'none',
    },
    copyMsg:{
        position: 'fixed',
        left: '0',
        bottom: '0',
        top: '0',
        right: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        transform: 'scale(.1)',
        opacity: '0',
        color: '#fff',
        flexDirection: 'column',

        '& h1':{
            fontWeight: '400',
            background: 'rgba(255,255,255,.3)',
            width: '100%',
            textAlign: 'center',
            marginBottom: '0',
            padding: '1rem',
            textTransform: 'uppercase',
            [Sizes.down('xs')]:{
                fontSize: '4rem'
            },
            [Sizes.down('md')]:{
                fontSize: '5rem'
            }
        },
        '& p':{
            fontSize: '2rem',
            fontWeight: '100'
        }
    },
    showMsg:{
        transform: 'scale(1)',
        opacity: '1',
        zIndex: '25',
        transition: 'all .4s ease-in-out',
        transitionDelay: '.3s',
    }

}
