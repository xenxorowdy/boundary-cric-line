import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const smallBox = () => {
  return (
      <View className={styles.smallBox}>
          <Text>
              
          </Text>
   </View>
  )
}

const styles = StyleSheet.create({
    smallBox: {
        width: '1rem',
        height: '1rem',
        backgroundColor: 'red',
        color:'red'
    },
})