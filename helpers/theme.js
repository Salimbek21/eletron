import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
   palette: {
      primary: {
         // main: '#FED000',
         main: '#FFF212',
      },
      secondary: {
         main: '#FFF212',
      },
      error: {
         main: red.A400,
      },
      background: {
         default: '#fff',
      },
   },
});

export default theme;