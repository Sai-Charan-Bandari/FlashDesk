import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import {RecoilRoot} from 'recoil';
import DbUpdater from './src/Functions/DbUpdater';
import LoginSetter from './src/Functions/LoginSetter';
import NavTabs from './src/screens/NavTabs';

export default function App() {
  return (
    <RecoilRoot>
    <NativeBaseProvider style={styles.container}>
      <NavTabs/>
      {/* we r calling this db updater which contains useEffects for all atoms in order to update firestore */}
      <DbUpdater/>
      {/* we r just calling this empty comp LoginSetter bcoz it will call onAuthStateChanged */}
      {/* <LoginSetter/> */}
      {/* <StatusBar style="auto" /> */}
    </NativeBaseProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
