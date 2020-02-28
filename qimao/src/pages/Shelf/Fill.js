import React, {Component} from 'react';
import {
  View,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  StatusBar,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import {Header, Text, Image, Icon} from 'react-native-elements';
import {Provider, Toast} from '@ant-design/react-native';
import RNFS from 'react-native-fs';
import * as FileUtil from '../Util/FileUtil';

const rootPath =
  Platform.OS === 'ios'
    ? RNFS.MainBundlePath
    : RNFS.ExternalStorageDirectoryPath;

const upperPath = FileUtil.basename(rootPath);

const {width, height} = Dimensions.get('window');

const logoPng = require('../../assets/images/logo.png');
const noDataPng = require('../../assets/images/nodata.png');
const folderPng = require('../../assets/images/folder.png');
const txtPng = require('../../assets/images/txt.png');

const defaultTabBarWidth = 20;
const offsetLeftLength = (width / 2 - defaultTabBarWidth) / 2;
const offsetRightLength = width / 2 + (width / 2 - defaultTabBarWidth) / 2;
const offsetMaxLength = width / 2 + defaultTabBarWidth;

class Fill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideStatusBar: false,

      rootPath: rootPath,
      upperPath: upperPath,

      opOpcity: new Animated.Value(0.5),
      opFlag: false,

      offsetIndex: 0,
      offsetLeftLength: offsetLeftLength,
      offsetRightLength: offsetRightLength,

      tabIndex: 0,
      mobileBooks: [],
      smartBooks: [],
      dirs: [],

      addShelfOpcity: new Animated.Value(0.5),

      chooseFiles: [],

      tabBarWidth: new Animated.Value(20),
      moveLength: 0,

      clicking: false,
      scrolling: false,
    };

    this._fetchSmartRecords = this._fetchSmartRecords.bind(this);
    this._fetchListDirs = this._fetchListDirs.bind(this);

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this._fetchSmartRecords();
    this._fetchListDirs();
  }

  // 本地目录
  async _fetchListDirs() {
    let {dirStats, fileStats} = await FileUtil.statDirs(this.state.rootPath);
    let stats = dirStats.concat(fileStats);
    this.setState({
      dirs: stats,
    });
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderLeftComponent() {
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderRightComponent() {
    return null;
  }

  _fetchSmartRecords() {
    let books = [];
    this.setState({
      smartBooks: books,
    });
  }

  _keySmartExtractor = (item, index) => item.id.toString();
  _keyDirExtractor = (item, index) => index.toString();

  _separator() {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  }

  _renderEmpty() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 80,
          alignSelf: 'center',
        }}>
        <Image
          source={noDataPng}
          style={{
            height: 240,
            width: 360,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            color: '#999999',
          }}>
          暂无数据
        </Text>
      </View>
    );
  }

  // 向右
  toRight() {
    this.setState({
      clicking: true,
      tabIndex: 1,
      offsetIndex: 1,
    });
    this.scrollView.scrollToEnd({
      animated: true,
    });
    Animated.sequence([
      Animated.timing(this.state.tabBarWidth, {
        toValue: offsetMaxLength,
        easing: Easing.linear,
        duration: 50,
      }),
      Animated.timing(this.state.tabBarWidth, {
        toValue: defaultTabBarWidth,
        easing: Easing.linear,
        duration: 300,
      }),
    ]).start(finished => {
      if (finished) {
        this.setState({
          clicking: false,
        });
      }
    });
  }

  // 向左
  toLeft() {
    this.setState({
      clicking: true,
      tabIndex: 0,
      offsetIndex: 0,
    });
    this.scrollView.scrollTo({x: 0, animated: true});
    Animated.sequence([
      Animated.timing(this.state.tabBarWidth, {
        toValue: offsetMaxLength,
        easing: Easing.linear,
        duration: 50,
      }),
      Animated.timing(this.state.tabBarWidth, {
        toValue: defaultTabBarWidth,
        easing: Easing.linear,
        duration: 300,
      }),
    ]).start(finished => {
      if (finished) {
        this.setState({
          clicking: false,
        });
      }
    });
  }

  _renderTabUnderline = () => {
    if (this.state.offsetIndex > 0) {
      return (
        <Animated.View
          style={[
            styles.tabBarUnderlineStyleBox,
            {
              width: this.state.tabBarWidth,
              right: this.state.offsetLeftLength,
            },
          ]}
        />
      );
    } else {
      return (
        <Animated.View
          style={[
            styles.tabBarUnderlineStyleBox,
            {
              width: this.state.tabBarWidth,
              left: this.state.offsetLeftLength,
            },
          ]}
        />
      );
    }
  };

  chooseFile = item => {
    let chooseFiles = this.state.chooseFiles;
    let pos = chooseFiles.indexOf(item.path);
    if (pos > -1) {
      chooseFiles.splice(pos, 1);
    } else {
      chooseFiles.push(item.path);
    }
    this.setState({
      chooseFiles,
    });
  };

  hasChoosed = item => {
    let chooseFiles = this.state.chooseFiles;
    return chooseFiles.indexOf(item.path) > -1;
  };

  _renderOpBox = item => {
    if (this.hasChoosed(item)) {
      return (
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: '#FCC800',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="check" type="feather" color="#312D20" size={14} />
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#717171',
            borderRadius: 10,
          }}
        />
      );
    }
  };

  async enterUpper() {
    let exists = FileUtil.exists(this.state.upperPath);
    if (!exists) {
      Toast.info('已经是最高层目录');
      return false;
    }
    this.setState(
      {
        rootPath: this.state.upperPath,
        upperPath: FileUtil.basename(this.state.upperPath),
      },
      () => {
        this._fetchListDirs();
      },
    );
  }

  enterDir = item => {
    this.setState(
      {
        rootPath: item.path,
        upperPath: FileUtil.basename(this.state.rootPath),
      },
      () => {
        this._fetchListDirs();
      },
    );
  };

  _renderDirItem = ({item, index}) => {
    if (item.isFile) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.chooseFile(item)}>
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 15,
              paddingBottom: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  alignItems: 'center',
                }}>
                <Image
                  source={txtPng}
                  style={{
                    width: 32,
                    height: 32,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#262626',
                  }}>
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#9C9C9C',
                      marginRight: 15,
                    }}>
                    类型：{item.type}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#9C9C9C',
                    }}>
                    大小：{item.size}
                  </Text>
                </View>
              </View>
            </View>
            {this._renderOpBox(item)}
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity activeOpacity={1} onPress={() => this.enterDir(item)}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 15,
              paddingBottom: 15,
            }}>
            <View
              style={{
                width: 50,
              }}>
              <Image
                source={folderPng}
                style={{
                  width: 32,
                  height: 32,
                }}
              />
            </View>
            <View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#262626',
                  }}>
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#9C9C9C',
                  }}>
                  {item.total}项
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  onScoll = ({nativeEvent}) => {
    if (this.state.clicking) {
      return false;
    }
    console.log('bbb');

    let moveLength = nativeEvent.contentOffset.x;

    if (moveLength < width / 2) {
      this.setState({
        offsetIndex: 0,
      });
      let tabBarWidth = defaultTabBarWidth;
      tabBarWidth += moveLength / 2;
      Animated.timing(this.state.tabBarWidth, {
        toValue: tabBarWidth,
        easing: Easing.linear,
        duration: 50,
      }).start();
    } else {
      this.setState({
        offsetIndex: 1,
      });
      let tabBarWidth = offsetMaxLength - moveLength / 2;
      Animated.timing(this.state.tabBarWidth, {
        toValue: tabBarWidth,
        easing: Easing.linear,
        duration: 50,
      }).start();
    }
    this.setState({
      moveLength,
    });
  };

  onMomentumScrollEnd = () => {
    if (this.state.moveLength < offsetMaxLength) {
      this.scrollView.scrollTo({x: 0});
      this.setState({
        offsetIndex: 0,
        tabIndex: 0,
      });
    }
    if (this.state.moveLength > offsetMaxLength) {
      this.scrollView.scrollToEnd();
      this.setState({
        offsetIndex: 1,
        tabIndex: 1,
      });
    }
    // if (this.state.tabIndex === 0) {
    //   this.scrollView.scrollTo({x: 0});
    // } else {
    //   this.scrollView.scrollToEnd();
    // }
  };

  _renderTabContent = () => {
    return (
      <ScrollView
        scrollEventThrottle={1}
        ref={scrollView => (this.scrollView = scrollView)}
        keyboardDismissMode="on-drag"
        horizontal={true}
        onScroll={this.onScoll}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          position: 'relative',
        }}>
        <View
          style={{
            flexDirection: 'row',
            position: 'relative',
          }}>
          {/* 内容 */}
          <View
            style={{
              width: width,
            }}>
            <View
              style={{
                marginBottom: this.state.editing ? 80 : 60,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={this.state.smartBooks}
                keyExtractor={this._keySmartExtractor}
                renderItem={this._renderDirItem}
                ListEmptyComponent={this._renderEmpty}
                ItemSeparatorComponent={this._separator}
                initialNumToRender={10}
                extraData={this.state}
                numColumns={1}
                onEndReachedThreshold={0.1}
                flashScrollIndicators={true}
              />
            </View>
          </View>
          <View
            style={{
              width: width,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 15,
                paddingBottom: 15,
                backgroundColor: '#FFFAE4',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  maxWidth: width - 110,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#6D6C6B',
                  }}
                  numberOfLines={1}>
                  {this.state.rootPath}
                </Text>
              </View>
              <TouchableOpacity onPress={() => this.enterUpper()}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="corner-up-left"
                    type="feather"
                    color="#FFAD1D"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#FFAD1D',
                      marginLeft: 5,
                    }}>
                    上一级
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginBottom: this.state.editing ? 80 : 60,
              }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={this.state.dirs}
                keyExtractor={this._keyDirExtractor}
                renderItem={this._renderDirItem}
                ListEmptyComponent={this._renderEmpty}
                ItemSeparatorComponent={this._separator}
                initialNumToRender={10}
                extraData={this.state}
                numColumns={1}
                onEndReachedThreshold={0.1}
                flashScrollIndicators={true}
              />
            </View>
          </View>
        </View>

        {/* 操作按钮 */}
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: 'pink',
          }}>
          <View
            style={{
              width: width,
              borderTopColor: '#F2F2F2',
              borderTopWidth: 1,
              flexDirection: 'row',
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              style={{
                flexBasis: '50%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  paddingBottom: 15,
                  paddingTop: 15,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#666666',
                  }}>
                  取消全选
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexBasis: '50%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Animated.View
                style={{
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 15,
                  paddingTop: 15,
                  opacity: this.state.addShelfOpcity,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#FCA000',
                  }}>
                  放入书架({this.state.smartBooks.length})
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width,
              borderTopColor: '#F2F2F2',
              borderTopWidth: 1,
              flexDirection: 'row',
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              style={{
                flexBasis: '50%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  paddingBottom: 15,
                  paddingTop: 15,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#666666',
                  }}>
                  全选
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexBasis: '50%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Animated.View
                style={{
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 15,
                  paddingTop: 15,
                  opacity: this.state.addShelfOpcity,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#FCA000',
                  }}>
                  放入书架({this.state.mobileBooks.length})
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  render() {
    return (
      <Provider>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={'#fff'}
            translucent={true}
            hidden={this.state.hideStatusBar}
            animated={true}
          />
          <Header
            backgroundColor={'#fff'}
            leftComponent={this.renderLeftComponent()}
            centerComponent={{
              text: '导入本地图书',
              style: {color: '#000', fontSize: 24},
            }}
            rightComponent={this.renderRightComponent()}
          />

          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.toLeft()}
                style={{
                  flexBasis: '50%',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={
                      this.state.tabIndex === 0
                        ? styles.activeTtabBarTextStyle
                        : styles.tabBarTextStyle
                    }>
                    智能导书
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.toRight()}
                style={{
                  flexBasis: '50%',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={
                      this.state.tabIndex === 1
                        ? styles.activeTtabBarTextStyle
                        : styles.tabBarTextStyle
                    }>
                    手机目录
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: 'red',
                marginBottom: 10,
                position: 'relative',
              }}>
              {this._renderTabUnderline()}
            </View>
          </View>
          <View style={styles.tabBarBox}>{this._renderTabContent()}</View>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  tabBarBox: {flex: 1},
  tabBarUnderlineStyleBox: {
    position: 'absolute',
    top: 0,
    height: 4,
    borderRadius: 5,
    backgroundColor: '#FF8D00',
  },

  tabBarUnderlineStyle: {
    width: 20,
    backgroundColor: '#FF9105',
    borderWidth: 2,
    borderColor: '#FF9105',
    marginLeft: width / 4 - 10,
    borderRadius: 2,
  },
  tabBarTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#6C6C6C',
  },
  activeTtabBarTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#FF9105',
  },
  tabBox: {
    width: width,
    height: height - 150,
  },
  bookBox: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40,
  },
  bookImage: {width: 60, height: 80},
  bookTextBox: {
    marginLeft: 20,
    width: width - 210,
  },
  bookTitleBox: {flexDirection: 'row', marginTop: 3, marginBottom: 3},
  bookTitle: {fontSize: 16},

  bookAuthorBox: {marginTop: 3, marginBottom: 3},
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bookTimeBox: {},
  bookTime: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bookBtnBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookBtn: {
    borderColor: '#DDDDDD',
    borderRadius: 15,
    height: 30,
  },
  bookBtnTitle: {
    fontSize: 14,
    color: '#666666',
    paddingLeft: 10,
    paddingRight: 10,
  },

  opBox: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 50,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
});

export default Fill;
