/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import { Provider } from "react-redux";
// import store from "./Redux/store";
// ReactDOM.render(<Provider store={store}>
//     <App />
// </Provider>,
//      document.getElementById('root'));
AppRegistry.registerComponent(appName, () => App);
