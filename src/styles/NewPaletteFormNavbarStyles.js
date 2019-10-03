import { DRAWER_WIDTH  } from '../constents';
import Sizes from './Sizes';
const drawerWidth = DRAWER_WIDTH ;
const styles = theme => ({
    root:{
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        heigth: '64px'
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      navBtns:{
          marginRight: '1rem',
          '& a':{
            textDecoration: 'none',
            },
            [Sizes.down('md')]:{
              marginRight: '0',            
            }
      },
      button:{
          margin: '0 .5rem',
          [Sizes.down('xs')]:{
            margin: '.3rem',
            padding: '0.3rem'
          }
      }
})

export default styles;