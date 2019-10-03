import Sizes from './Sizes';
export default {
    NavBar:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '5vh',
    },
    Logo:{
        marginRight: '15px',
        fontSize: '2rem',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',

        '& a':{
            textDecoration: 'none',
            color: 'rgb(88, 88, 88)',
        },
        [Sizes.down('xs')]:{
            display: 'none'
        }
     },
     Slider:{
        width: '350px',
        margin: '0 10px',
        display: 'inline-block',

        '& .rc-slider-track':{
            backgroundColor: 'transparent'
        },
        '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus':{
            backgroundColor: 'rgb(45, 192, 136)',
            outline: 'none',
            border: '2px solid rgb(45, 192, 136)',
            boxShadow: 'none',
        },
        '& .rc-slider-mark':{
            paddingTop:'7px',
            color: 'red',
        },
        [Sizes.down('md')]:{
            width: '150px'
        }
    },
    SelectContainer:{
        margin: '0 1rem 0 auto'
    }
}