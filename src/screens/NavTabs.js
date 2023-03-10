import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderMenu from './HeaderMenu';
import { logged, tabIndex } from '../Recoil/Atoms';
import { useRecoilValue,useRecoilState} from 'recoil';
import HomeNavContainer from './HomeNavContainer';
import StartOptions from './StartOptions';
import SubNavContainer from './SubNavContainer';
import Intro from './Intro';
import LoginSetter from '../Functions/LoginSetter';

export default function NavTabs() {
  
  // LoginSetter()

  const loggedIn=useRecoilValue(logged)
  const layout = useWindowDimensions();

  const [index, setIndex] = useRecoilState(tabIndex);
  // initially i assigned the routes array directly in useState by using the loggedIn val as condition
  // but the routes did not get updated...so i placed it in useState of loggedIn
  const [routes,setRoutes] = React.useState([])
 React.useEffect(()=>{
  // loggedIn 
  // ?
 setRoutes( [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
  { key: 'third', title: 'Third' },
  { key: 'fourth', title: 'Fourth' },
])
// :
// setRoutes([
//   { key: 'first', title: 'First' },
//   { key: 'second', title: 'Second' },
//   { key: 'fourth', title: 'Fourth' },
//     ])
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
      second: HomeNavContainer,
      third:SubNavContainer,
      fourth:Intro
    })

  return (
    <>
<HeaderMenu/>
{/* VIP : NAVIGATION B/W TABS */}
{/*  IF WE ARE AT SOME TAB 0 AND WANT TO MOVE TO ANOTHER TAB 1 UPON CLICK OF A BUTTON IN TAB 0 
THEN SIMPLY setIndex(TAB INDEX i.e, 1) TO NAVIGATE TO THAT TAB
WORKING : WHEN WE UPDATE THE GLOBAL TABINDEX STATE, THEN THE TAB VIEW WILL BE RE-RENDERED AND THIS TIME IT TAKES
THE NEW INDEX AS START INDEX WITHIN THE navigationState property.
*/}
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