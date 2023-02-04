import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderMenu from './HeaderMenu';
import { logged } from '../Recoil/Atoms';
import { useRecoilValue } from 'recoil';
import Home from './Home';
import StartOptions from './StartOptions';
import Main from './Main';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'black' }} />
);



export default function NavTabs() {
  const loggedIn=useRecoilValue(logged)
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState(
    loggedIn 
    ?
    [
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
    ]
    :
    [
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    ]
  );


  const renderScene = 
  loggedIn?
  SceneMap(
    {
      first: StartOptions,
      second: Home,
      third:Main
    })
    :
    SceneMap(
  {
  first: StartOptions,
  second: Home,
  }
  );

  return (
    <>
    <SafeAreaProvider>

<HeaderMenu/>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props=><></>}
      />
      </SafeAreaProvider>
      </>
  );
}