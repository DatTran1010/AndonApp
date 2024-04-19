import {NavigationContainerRef, StackActions} from '@react-navigation/native';

let navigator: NavigationContainerRef<any>;

function setTopLevelNavigator(navigatorRef: NavigationContainerRef<any>) {
  navigator = navigatorRef;
}

function navigate(routeName: string, params?: object) {
  const currentRoute = navigator.getCurrentRoute();
  if (currentRoute?.name === 'LoginScreen') return;

  if (navigator) {
    navigator.dispatch({
      ...StackActions.replace(routeName, params),
      target: navigator.getRootState()?.key,
    });
  } else {
    console.error('Navigation navigator is not initialized!');
  }
}
function reset(name: string, params?: object) {
  if (navigator) {
    navigator.dispatch(StackActions.replace(name, params));
  } else {
    console.error('Navigation navigator is not initialized!');
  }
}

const goBack = () => {
  if (navigator) {
    if (navigator.canGoBack()) {
      navigator.goBack();
      return;
    }
  }
  navigate('HomeScreen');
};

// Thêm các phương thức khác nếu cần thiết, như goBack(), replace(), ...

export default {
  navigate,
  reset,
  setTopLevelNavigator,
  goBack,
};
