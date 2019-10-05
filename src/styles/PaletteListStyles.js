import Sizes from './Sizes';
import bg from './bg.svg'
export default {
    '@global':{
        '.fade-exit':{
            opacity:1,
        },
        '.fade-exit-active':{
            opacity:0,
            transition: 'opacity .5s ease-out'
        },
        '.fade-enter': {
            opacity: 0,
            transition: 'opacity .5s ease-in'
        },
        '.fade-enter-active': {
            opacity: 1,
            transition: 'opacity .5s ease-in'
        }
    },
    root:{
        backgroundColor: '#7338aa',
        backgroundImage: `url(${bg})`,
        /* background by SVGBackgrounds.com */
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'scroll'
    },
    container:{
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [Sizes.down('xl')]:{
            width: '80%',
        },[Sizes.down('xs')]:{
            width: '70%',
        }
    },
    nav:{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: '#fff',
        alignItems: 'center',
        '& a':{
        color: '#fff'
        }
    },
    palettes:{
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '2.5rem',
        [Sizes.down('md')]:{
            gridTemplateColumns: 'repeat(2, 50%)',
            gridGap: '1.5rem',
        },
        [Sizes.down('xs')]:{
            gridTemplateColumns: 'repeat(1, 100%)',
        }
    },
    heading:{
        fontSize: '2rem'
    }
}
