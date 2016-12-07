import React from 'react';
import { render } from 'react-dom';
import MainApp from './mainApp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <MainApp />
  </MuiThemeProvider>
);

render(
    <App/>,
    document.getElementById('main')
)