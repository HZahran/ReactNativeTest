
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from 'react-native';

const mockData = [
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTAPSndSFtbUOtXXMSwb5O59e4s4wnOY21pq_rV9KjugzJA4ZNuA' },
  { src: 'https://cdn.images.express.co.uk/img/dynamic/67/590x/Mohamed-Salah-964789.jpg?r=1527412271188' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK7mhW-API_duVTio4D2jDmVGuUVNp5HV1Jfr6IjB83R7Jwv_nhA' },
  { src: 'https://egyptianstreets.com/wp-content/uploads/2018/05/salah-injury-ramos-e1527368615303.jpg' },
  { src: 'https://talksport.com/sites/default/files/styles/taxonomy-img/public/field/image/201805/salah_5.jpg' },
]

const CustomListItem = ({ item, separators, index }) => (
  <View key={`Image ${index}`} style={styles.listItem}>
    <Image
      style={styles.image}
      source={{ uri: item.src }} />
  </View>
)

const CustomDotItem = ({ item, separators, index }) => (
  <View key={`Dot ${index}`}>
    <Text style={[styles.dot,
    item.active ? styles.activeDot : styles.normalDot]}>
      •
    </Text>
  </View>
)

export default class App extends Component {
  state = {
    activeIndex: 0,
  }

  constructor(props) {
    super(props)

    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }
  }
  changeViewedItem = ({ viewableItems, changed }) => {
    this.setState({ activeIndex: viewableItems ? viewableItems[0].index : 0 })
  }

  render() {
    const { activeIndex } = this.state
    let mainData = mockData.map((item, index) => ({ ...item, index }))
    let dotsData = mockData.map((item, index) => ({ active: index === activeIndex }))

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{"Mo Salah <3"} </Text>
        <View style={styles.listView}>
          <FlatList
            data={mainData}
            renderItem={CustomListItem}
            onViewableItemsChanged={this.changeViewedItem}
            viewabilityConfig={this.viewabilityConfig}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
          <FlatList
            data={dotsData}
            renderItem={CustomDotItem}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0077B5',
  },
  headerText: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Lato sans-serif',
    color: '#F5FCFF'
  },
  listView: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    margin: 20,
    borderWidth: 2,
    borderColor: '#F5FCFF'
  },
  dot: {
    margin: 5,
    fontSize: 50
  },
  activeDot: {
    opacity: 1
  },
  normalDot: {
    opacity: 0.4
  },
  separators: {
    backgroundColor: 'black'
  }
});
