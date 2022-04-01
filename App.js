/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useState, useRef} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions, ActivityIndicator,
  TouchableOpacity, RefreshControl, TextInput,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';

const {width, height } = Dimensions.get('screen')
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [urlWeb, seturlWeb] = useState('http://');
  const [urLSubmit, setUrlSubmit] = useState('')
  const [isWebShow, setWebShow] = useState(-1)
  const [errMessage, setErrMessage] = useState('')
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    display: 'flex',
  };
  const refWeb = useRef(null)
  const textInputRef = useRef(null)
  //action
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  const handleChangeText = text => {
    seturlWeb(text)
    setWebShow(-1)
    setErrMessage('')
  }
  const handleSearch = () => {
    if (validURL(urlWeb)){
      setWebShow(urLSubmit != urlWeb ? 0 : 1)
      setUrlSubmit(urlWeb)
      textInputRef.current.blur()
    }
    else {
      setWebShow(-1)
      setErrMessage('Not correct url address')
      setTimeout(() => {
        setErrMessage('')
      }, 1000);
    }
  }
  const onRefreshing = () => {refWeb.current.reload()}
  //render
  const contain = useCallback(() => (
    <View style={{ marginVertical: 20, width, alignItems: 'center'}}>
      <Text style={styles.txtTitle}>{'Enter link web view here'}</Text>
      <TextInput
        ref={textInputRef}
        keyboardType={'url'}
        returnKeyType={'send'}
        onSubmitEditing={handleSearch}
        value={urlWeb}
        onChangeText={handleChangeText}
        style={styles.textInputStyle} />
      <TouchableOpacity onPress={handleSearch} style={styles.viewSubmit}>
        <Text style={styles.txtSubmit}>{'Submit'}</Text>
      </TouchableOpacity>
      {errMessage !== '' && <Text style={{color: 'red', fontSize: 12}}>{errMessage}</Text>}
    </View>
  ), [urlWeb, errMessage, urLSubmit])

  const webViewScreen = useCallback(() => {
    if (isWebShow > -1)
    return(
      <View style={{flex: 1, width}}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={false} onRefresh={onRefreshing} />}>
          {isWebShow === 0 && <ActivityIndicator size={'large'} />}
            <WebView
              ref={refWeb}
              style={{width, minHeight: height }}
              source={{ uri: urLSubmit }}
              onLoadEnd={() => setWebShow(1)}
              onError={(err) => setErrMessage('Page error')}
            />
        </ScrollView>
      </View>
    )
  }, [urLSubmit, isWebShow])
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
        <View
          style={{
            backgroundColor: Colors.white,
            display: 'flex',
            width, height,
            justifyContent: 'center',
          }}>
          {contain()}
          {webViewScreen()}
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    borderWidth: 1,
    paddingVertical: 0,
    paddingHorizontal: 10,
    textAlign: 'left',
    color: 'black',
    fontSize: 17,
    height: 35,
    width: width*0.8,
    marginTop: 15,
    zIndex: 2,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  txtTitle: {
    color: 'black',
    zIndex: 2,
    backgroundColor: 'white',
    fontSize: 30,
  },
  txtSubmit: {
    color: 'white',
    fontSize: 20,
  },
  viewSubmit: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 2,
    marginVertical: 10,
  }
});

export default App;
