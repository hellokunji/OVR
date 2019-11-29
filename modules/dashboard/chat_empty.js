import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import TextComponent from '../common/uncategorized/text';

const EmptyChat = props => {
  return (
    <View style={styles.main}>
      <View style={styles.box}>
        <TextComponent style={styles.mainTitle} text='Start the conversation!'/>
        <View style={styles.user}>
          <View style={styles.profileImg}>
            <Image style={styles.image} source={props.userDetail.image}/>
          </View>
          <TextComponent style={styles.title} fontWeight='Medium' text={props.userDetail.title}/>
          <TextComponent style={styles.subtitle} text={props.userDetail.subtitle}/>
        </View>
      </View>
    </View>
  )
};

export default EmptyChat;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {

  },
  mainTitle: {
    textAlign: 'center',
    fontSize: 23
  },
  user: {
    alignItems: 'center',
    marginTop: 50
  },
  profileImg: {
    marginBottom: 15
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 49
  },
  title: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 14
  }
});
