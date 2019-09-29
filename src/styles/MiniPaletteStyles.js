export default {
    root: {
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid black',
        '&:hover':{
            cursor: 'pointer',
        }

    },
    colors:{
        backgroundColor: '#fff',
        height: '150px',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden'

    },
    title:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: '#000',
        paddingTop: '.5rem',
        fontSize: '1rem',
        position: 'relative'
    },
    emoji:{
        marginLeft: '0.5rem',
        fontSize: '1.5rem'

    },
    miniColorBox:{
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'reletive',
        marginBottom: '-4px'
    }
}