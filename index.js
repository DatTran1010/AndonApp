import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
