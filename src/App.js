import React, {useEffect, useState} from 'react'
import ProjectPage from './pages/ProjectPage'
import LoadingPage from './pages/LoadingPage'
import HomePage from './pages/HomePage'
import TodoPage from './pages/TodoPage'
import {checkAuthStateChanged} from './firebase'
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useUserState} from './hooks/useUserState';
import Page404 from './pages/Page404'
import { CircularProgress, Dialog } from '@material-ui/core'

  const theme = createMuiTheme({
    mixins: {
      toolbar: {
        minHeight: 56,
      }
    },
    palette: {
      type: 'light',
      colors: {
        red: '#ff0000'
      },
      primary: {
        main: '#2196f3'
      }
    },
    overrides: {
      MuiIconButton: {
        sizeSmall: {
          width: 32,
          height: 32
        }
      },
    }
  });

function App() {
  
  const [{user, init}, setUser] = useUserState();
  const [progress, setProgress] = useState(false);

  useEffect(() => { 
    checkAuthStateChanged(setUser, setProgress);
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          {user ? (
            <React.Fragment>
              <Router>
                <Switch>
                  <Route path='/' exact component={ProjectPage}/>
                  <Route path='/todos/:projectId' component={TodoPage}/>
                  <Route path='/' component={Page404}/>
                </Switch>
              </Router>
              </React.Fragment>
          ): (
            init ? <HomePage /> : <LoadingPage/>
          )}
          <Dialog
            open={progress}
            aria-labelledby="auth-dialog"
            PaperComponent={CircularProgress}
          />
        </CssBaseline>
      </ThemeProvider>
  );
}

export default App;
