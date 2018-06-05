
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

const CustomSeparator = ({ highlighted }) => (
  <View style={[styles.separators, highlighted && { marginLeft: 0 }]} />
)
const CustomListItem = ({ item, separators, index }) => (
  <View key={`Image ${index}`} style={styles.listItem}>
    <Image
      style={styles.image}
      source={{ uri: item.src }} />
  </View>
)

const CustomDotItem = ({ item, separators, index }) => (
  <View key={`Dot ${index}`} style={styles.listItem}>
    <Text style={styles.dot}>{item.active ? 'Active' : 'Not Active'}</Text>
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
        <Text style={styles.headerText}>Mo Salah</Text>
        <View style={styles.listView}>
          <FlatList
            ItemSeparatorComponent={CustomSeparator}
            data={mainData}
            renderItem={CustomListItem}
            onViewableItemsChanged={this.changeViewedItem}
            viewabilityConfig={this.viewabilityConfig}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
        <View style={styles.listView}>
          <FlatList
            ItemSeparatorComponent={CustomSeparator}
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
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Lato sans-serif'
  },
  listView: {
    height: 250
  },
  image: {
    width: 300,
    height: 300,
    margin: 20
  },
  dot: {
    margin: 5
  },
  separators: {
    backgroundColor: 'black'
  }
});
