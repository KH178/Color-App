
export default {
    Palette:{
        height: '100vh',
        display: "flex",
        flexDirection: 'column',
    
    },
    PaletteColors:{
        height: '90%'
    },
    goBack:{
        width: '20%',
        height: '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        textTransform: 'uppercase',
        marginBottom: '-4px',
        opacity: '1',
        background: '#000',
        '& a':{
            color:'#fff',
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
            textDecoration: 'none',  
        }
    },

}
