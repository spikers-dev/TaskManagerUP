import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';

import TaskBoard from 'containers/TaskBoard';
import MUITheme from 'MUITheme/MUITheme';
import store from 'store';

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={MUITheme}>
        <TaskBoard />
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
