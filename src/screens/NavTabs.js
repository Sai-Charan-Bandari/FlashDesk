import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderMenu from './HeaderMenu';
import { logged, tabIndex } from '../Recoil/Atoms';
import { useRecoilValue,useRecoilState} from 'recoil';
import Home from './Home';
import StartOptions from './StartOptions';
import Main from './SubNavContainer';


export default function NavTabs() {
  const loggedIn=useRecoilValue(logged)
  const layout = useWindowDimensions();

  const [index, setIndex] = useRecoilState(tabIndex);
  // initially i assigned the routes array directly in useState by using the loggedIn val as condition
  // but the routes did not get updated...so i placed it in useState of loggedIn
  const [routes,setRoutes] = React.useState([])
 React.useEffect(()=>{
  loggedIn 
  ?
 setRoutes( [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
  { key: 'third', title: 'Third' },
  ])
  :
  setRoutes([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    ])
 },[loggedIn])

  React.useEffect(()=>{
    console.log('routes : ',routes.length)
  },[routes])

//VIP :
//WE ONLY NEED TO UPDATE THE ROUTES ARR, WE DONT NEED TO UPDATE THE RENDER SCENE AS LOGGED VAL CHANGES
//RENDER SCENE IS ONLY REQUIRED FOR MAPPING OF EACH KEY VALUE OF ROUTES ARR (JUST LIKE SWITCH CONDITIONAL STATEMENT) TO CORRESPONDING COMPONENT
//SO, THE NO. OF TABS GENERATED = NO. OF KEYS IN ROUTES ARR
  const renderScene = 
  SceneMap(
    {
      first: StartOptions,
      second: Home,
      third:Main
    })

  return (
    <>

<HeaderMenu/>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props=><></>}
      />
      </>
  );
}