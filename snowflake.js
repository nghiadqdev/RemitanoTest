import { ImageBackground, Dimensions, View, StyleSheet} from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

const SNOWFLAKE = 'https://toppng.com/uploads/preview/snowflakes-png-background-image-snow-crystal-11562921076exjjjry5p3.png'
const {width, height } = Dimensions.get('screen')

const SnowflakeScreen = () => {
  const randomize = max => Math.random() * max;

  const Falling = ({ duration, delay, style, children }) => (
    <Animatable.View
      animation={{
        from: { translateY: -70 },
        to: { translateY: height },
      }}
      duration={duration}
      delay={delay}
      easing={t => Math.pow(t, 1.7)}
      iterationCount="infinite"
      useNativeDriver
      style={style}>
      {children}
    </Animatable.View>
  );

  return (
    <View>
        <ImageBackground style={styles.viewAnimation}>
        {[1,2,3,4,5,6,7,8].map((item, index) =>
        <Falling
            key={index}
            duration={5000}
            delay={index * (5000 / 15)}
            style={{
            position: 'absolute',
            paddingHorizontal: 50,
            left: randomize(width - 20) - 50,
            }}>
            <Animatable.Image animation="rotate" easing="linear" duration={9000} iterationCount="infinite" source={{uri: SNOWFLAKE}} style={{width: 20, height: 20}} />
            </Falling>
        )}
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    viewAnimation: {
        height, width, position: 'absolute', justifyContent: 'flex-start', zIndex: 1,
      },
    })

export default SnowflakeScreen
