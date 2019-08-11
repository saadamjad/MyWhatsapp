import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from './DefaultTabBar';
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const HEADER_HEIGHT = 50;

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            scrollAnim: new Animated.Value(0),
            offsetAnim: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.state.scrollAnim.addListener(this._handleScroll);
    }

    componentWillUnmount() {
        this.state.scrollAnim.removeListener(this._handleScroll);
    }

    _handleScroll = ({ value }) => {
        this._previousScrollvalue = this._currentScrollValue;
        this._currentScrollValue = value;
    };

    _handleScrollEndDrag = () => {
        this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 250);
    };

    _handleMomentumScrollBegin = () => {
        clearTimeout(this._scrollEndTimer);
    };

    _handleMomentumScrollEnd = () => {
        const previous = this._previousScrollvalue;
        const current = this._currentScrollValue;

        if (previous > current || current < HEADER_HEIGHT) {
            // User scrolled down or scroll amount was too less, lets snap back our header
            Animated.spring(this.state.offsetAnim, {
                toValue: -current,
                tension: 300,
                friction: 35,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(this.state.offsetAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    };

    render() {

        const { scrollAnim, offsetAnim } = this.state;

        const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: [0, -HEADER_HEIGHT],
            extrapolate: 'clamp'
        });

        return (
            <View style={{ flex: 1 }}>

                <Animated.View style={{ paddingTop: 15, paddingHorizontal: 20, backgroundColor: '#3a5562', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height:HEADER_HEIGHT,transform: [{ translateY }] }}>
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>WhatsApp</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={{ marginRight: 20 }}>
                            <Icon name={'search'} color={'white'} size={22} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name={'more-vertical'} color={'white'} size={22} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar translateY={translateY} />}
                >
                    <ScrollView
                        tabLabel="CHATS" 
                        style={[styles.tabView]}
                    >
                        <View style={[styles.card]}>
                            <Text>CHATS</Text>
                        </View>
                    </ScrollView>

                    <ScrollView
                        tabLabel="STATUS" 
                        style={[styles.tabView]}
                    >
                        <View style={[styles.card]}>
                            <Text>STATUS</Text>
                        </View>
                    </ScrollView>

                    <ScrollView
                        tabLabel="CALLS" 
                        style={[styles.tabView]}
                    >
                        <View style={[styles.card]}>
                            <Text>CALLS</Text>
                        </View>
                    </ScrollView>

                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabView: {
        flex: 1
    },
    card: {
        backgroundColor: '#fff',
        margin: 5,
        padding: 15,
    },
})

// import React, { Component } from "react";
// import { Animated, Dimensions, Platform, Text, View } from 'react-native';
// import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, Tabs, Title } from "native-base";

// const NAVBAR_HEIGHT = 56;
// const { width: SCREEN_WIDTH } = Dimensions.get("window");
// const COLOR = "rgb(45,181,102)";
// const TAB_PROPS = {
//     tabStyle: { width: SCREEN_WIDTH / 2, backgroundColor: COLOR },
//     activeTabStyle: { width: SCREEN_WIDTH / 2, backgroundColor: COLOR },
//     textStyle: { color: "white" },
//     activeTextStyle: { color: "white" }
// };

// export default class Home extends Component {
//     scroll = new Animated.Value(0);
//     headerY;

//     constructor(props) {
//         super(props);
//         this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT), -1);
//     }

//     render() {
//         const tabY = Animated.add(this.scroll, this.headerY);
//         return (
//             <View>
//                 {Platform.OS === "ios" &&
//                     <View style={{ backgroundColor: COLOR, height: 20, width: "100%", position: "absolute", zIndex: 2 }} />}
                
                
//                     <Tabs renderTabBar={(props) => 
//                     <Animated.View
//                         style={[{
//                             transform: [{ translateY: tabY }],
//                             zIndex: 1,
//                             width: "100%",
//                             backgroundColor: COLOR,
//                             flex:1
//                         }, Platform.OS === "ios" ? { paddingTop: 20 } : null]}>
//                         <ScrollableTab {...props} underlineStyle={{ backgroundColor: "white" }} />
//                     </Animated.View>
//                     }>
//                         <Tab heading="Tab 1" {...TAB_PROPS} style={{flex:1}}>
//                             {
//                                 <List>
//                                     {
//                                         new Array(20).fill(null).map((_, i) => {
//                                             return (
//                                                 <Item key={i}><Text>Item {i}</Text></Item>
//                                             )
//                                         })
//                                     }
//                                 </List>
//                             }
//                         </Tab>
//                         <Tab heading="Tab 2" {...TAB_PROPS}>
//                             {
//                                 <List>
//                                     {
//                                         new Array(20).fill(null).map((_, i) => {
//                                             return (
//                                                 <Item key={i}><Text>Item {i}</Text></Item>
//                                             )
//                                         })
//                                     }
//                                 </List>
//                             }
//                         </Tab>
//                     </Tabs>
//             </View>
//         );
//     }
// }