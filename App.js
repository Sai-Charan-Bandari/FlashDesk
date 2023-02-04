import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import {RecoilRoot} from 'recoil';
import NavTabs from './src/screens/NavTabs';

export default function App() {
  return (
    <RecoilRoot>
    <NativeBaseProvider style={styles.container}>
      <NavTabs/>
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
