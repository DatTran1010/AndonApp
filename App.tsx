import React from 'react';
import store from './src/redux/Store';
import {Provider} from 'react-redux';
import NavigationApp from './src/screens/navigation/NavigationApp';
import {I18nextProvider} from 'react-i18next';
import i18next from './services/i18next';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  OverlayComponent,
  SnackbarComponent,
  ToastComponent,
} from './src/components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <NavigationApp />
              <OverlayComponent />
              <ToastComponent />
              <SnackbarComponent />
            </GestureHandlerRootView>
          </PaperProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
