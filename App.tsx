import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Provider} from 'react-redux';
import counterSlice, {
  incrementAsync,
  incrementIfOdd,
} from './redux/counterSlice';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {RootState, store} from './redux/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.container}>
          <Image
            source={require('./images/reactlogo.png')}
            style={styles.imageStyle}
          />
          <Text style={styles.h1Txt}>
            Counter App Redux Toolkit (Typescript)
          </Text>
          <View style={styles.divider} />
          <Counter />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const Counter = () => {
  const [amount, setAmount] = useState('2');
  const {value, loading} = useAppSelector((state: RootState) => state.counter);
  const dispatch = useAppDispatch();
  const {increment, decrement, incrementByAmount} = counterSlice.actions;
  return (
    <>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => dispatch(decrement())}>
          <Text style={styles.btnTxt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countTxt}>{value}</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => dispatch(increment())}>
          <Text style={styles.btnTxt}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.blank} />
      <View style={styles.row}>
        <TextInput
          style={styles.txtInput}
          value={amount}
          onChangeText={v => setAmount(v)}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const n = Number(amount) || 0;
            dispatch(incrementByAmount(n));
          }}>
          <Text>Add Amount</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={() => {
            const n = Number(amount) || 0;
            dispatch(incrementAsync(n));
          }}>
          <Text>{loading ? 'Calculating...' : 'Add Async'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const n = Number(amount) || 0;
            dispatch(incrementIfOdd(n));
          }}>
          <Text>Add If Odd</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  imageStyle: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  h1Txt: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#9C27B0',
  },
  divider: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 40,
    height: 40,
    borderColor: '#BA68C8',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#CFD8DC',
  },
  btnTxt: {
    fontSize: 24,
  },
  countTxt: {
    width: 80,
    fontSize: 32,
    color: '#E94033',
    textAlign: 'center',
  },
  blank: {
    height: 30,
  },
  txtInput: {
    borderColor: '#BA68C8',
    borderWidth: 1,
    width: 40,
    height: 40,
    margin: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  button: {
    width: 120,
    height: 40,
    borderColor: '#BA68C8',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#CFD8DC',
    margin: 10,
  },
});

export default App;
