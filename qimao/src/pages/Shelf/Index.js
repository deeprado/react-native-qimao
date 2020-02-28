import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Header, Text, Icon, Image} from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';

const {width, height} = Dimensions.get('window');

let mwidth = 150;
let mheight = 110;

const logoPng = require('../../assets/images/logo.png');
class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideStatusBar: false,
      fadeAnim: new Animated.Value(1),
      showMore: false,
      books: [],
      scrollStatus: false,

      recom: {
        title: '我的角色美女老板',
        summery:
          '颜家栋送外卖到一个绝色少妇家里，没想到这女人居然出钱让他陪睡，而且不同意就给差评，而且不同意就给差评而且不同意就给差评而且不同意就给差评而且不同意就给差评',
      },
      ads: [
        {
          id: 100,
          cover: logoPng,
          title: '哔哩哔哩',
          summery: '超好看的小姐姐宅舞视频~',
          source: '腾讯广告',
          type: 'ad',
        },
        {
          id: 101,
          cover: logoPng,
          title: '哔哩哔哩',
          summery: '经典国创资源，就来哔哩哔哩~',
          source: '腾讯广告',
          type: 'ad',
        },
      ],

      w1: new Animated.Value(0),
      h1: new Animated.Value(0),
      w2: new Animated.Value(0),
      h2: new Animated.Value(0),
      f1: new Animated.Value(0),

      editing: false,
      chooseBooks: [],
      chooseIndexes: [],
      offsetOp: new Animated.Value(0),
      delOpcity: new Animated.Value(0.5),
    };

    this.signIn = this.signIn.bind(this);
    this.search = this.search.bind(this);
    this.record = this.record.bind(this);
    this.more = this.more.bind(this);
  }

  componentDidMount() {
    this._fetchRecords();
  }

  renderCenterComponent() {
    return null;
  }

  renderRightComponent() {
    if (this.state.editing) {
      return (
        <View style={styles.topBtnBox}>
          <TouchableOpacity
            activeOpacity={1}
            style={{marginRight: 10}}
            onPress={() => this.closeMa()}>
            <Text
              style={{
                fontSize: 16,
                color: '#333333',
              }}>
              完成
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.topBtnBox}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.signIn}
          style={styles.topBtn}>
          <Icon name="calendar" type="antdesign" size={24} color="#FF741C" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.search}
          style={styles.topBtn}>
          <Icon name="search" type="octicon" color="#333333" size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.record}
          style={styles.topBtn}>
          <Icon name="clock" type="feather" size={24} color="#333333" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.more}
          style={styles.topBtn}>
          <Icon name="more-vertical" type="feather" size={26} color="#333333" />
        </TouchableOpacity>
      </View>
    );
  }

  // 滑动事件
  onScroll = event => {
    let scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY >= 50 && !this.state.scrollStatus) {
      this.setState({
        scrollStatus: true,
      });
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 200,
      }).start();
    }
    if (scrollY < 50 && this.state.scrollStatus) {
      this.setState({
        scrollStatus: false,
      });
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 200,
      }).start();
    }
  };

  // 签到
  signIn() {
    this.props.navigation.navigate('Signin');
  }
  // 搜索
  search() {
    this.props.navigation.navigate('Search');
  }
  // 记录
  record() {
    this.props.navigation.navigate('Record');
  }
  // 更多
  more() {
    if (this.state.showMore) {
      this.closePopModal();
    } else {
      this.showPopModal();
    }
  }

  // 切换路由到书城
  goDepot = () => {
    this.props.navigation.navigate('DepotBox');
  };

  goTarget = routeName => {
    this.props.navigation.navigate(routeName);
  };

  openImport = () => {
    let that = this;
    that.closePopModal(() => {
      that.goTarget('Fill');
    });
  };

  openReader = data => {
    this.props.navigation.navigate('Reader', {
      id: 'sdfad',
    });
  };

  _fetchRecords() {
    let max = 20;
    let books = [];
    for (var i = 0; i < max; i++) {
      var tmp = {
        id: i + 1,
        title: '我的绝色美女老板',
        summary: '阿斯顿发生的',
        author: '一念汪洋',
        reading: true,
        lastChapter: '第二千八百一十五章',
        hasUpdate: true,
        cover: logoPng,
        type: 'book',
      };
      books.push(tmp);
    }
    // 插入广告
    books.splice(0, 0, this.state.ads[0]);
    books.splice(3, 0, this.state.ads[1]);
    // 插入广告
    this.setState({
      books: books,
    });
  }

  _keyExtractor = (item, index) => item.id.toString();

  _renderFooter = () => {
    if (this.state.editing) {
      return (
        <View
          style={{
            height: 100,
          }}
        />
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.footerBox}
        onPress={() => this.goDepot()}>
        <View style={styles.footer}>
          <View
            style={{
              height: 90,
              width: 66,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#EBEBEB',
            }}>
            <Icon name="plus" type="feather" size={20} color="#9E9E9E" />
          </View>
          <View style={styles.footerContentBox}>
            <Text style={styles.footerContent}>添加你喜欢的小说</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _separator() {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  }

  _renderEmpty() {
    return (
      <View>
        <Text>无数据</Text>
      </View>
    );
  }

  openAd = data => {
    console.log(data);
  };

  chooseOne = (data, index) => {
    console.log(data, index);
    let chooseBooks = this.state.chooseBooks;
    let chooseIndexes = this.state.chooseIndexes;
    let pos = chooseIndexes.indexOf(index);
    if (pos > -1) {
      chooseBooks.splice(pos, 1);
      chooseIndexes.splice(pos, 1);
    } else {
      chooseIndexes.push(index);
      chooseBooks.push(data);
    }
    this.setState({
      chooseBooks,
      chooseIndexes,
    });
  };

  hasChoosed = index => {
    let chooseIndexes = this.state.chooseIndexes;
    let pos = chooseIndexes.indexOf(index);
    return pos > -1 ? true : false;
  };

  _renderOpBox = (data, index) => {
    if (this.state.editing) {
      if (this.hasChoosed(index)) {
        return (
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.chooseOne(data, index)}>
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
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.chooseOne(data, index)}>
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
            </TouchableOpacity>
          </View>
        );
      }
    }
    if (data.hasUpdate) {
      return (
        <View
          style={{
            backgroundColor: '#FF8D00',
            alignItems: 'center',
            borderRadius: 3,
          }}>
          <Text
            style={{
              paddingTop: 1,
              paddingBottom: 3,
              paddingLeft: 5,
              paddingRight: 4,
              color: '#fff',
              fontSize: 12,
            }}>
            更新
          </Text>
        </View>
      );
    }
    return null;
  };

  _renderAd = (data, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.openAd(data)}
        key={data.id}>
        <View style={styles.bookBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image source={logoPng} style={styles.bookImage} />
            </View>
            <View style={styles.bookTextBox}>
              <View style={styles.bookTitleBox}>
                <Text style={styles.bookTitle}>{data.title}</Text>
              </View>
              <View style={styles.bookContentBox}>
                <Text style={styles.bookContent} numberOfLines={1}>
                  {data.summery}
                </Text>
                <Text style={styles.adName} numberOfLines={1}>
                  {data.source}
                </Text>
              </View>
            </View>
          </View>
          {this._renderOpBox(data, index)}
        </View>
      </TouchableOpacity>
    );
  };

  _renderBook = (data, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.openReader(data)}
        key={data.id}>
        <View style={styles.bookBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image source={logoPng} style={styles.bookImage} />
            </View>
            <View style={styles.bookTextBox}>
              <View style={styles.bookTitleBox}>
                <Text style={styles.bookTitle}>{data.title}</Text>
              </View>
              {data.reading ? (
                <View style={styles.bookContentBox}>
                  <Text style={styles.bookContent} numberOfLines={1}>
                    {data.lastChapter}
                  </Text>
                  <Text style={styles.bookRead} numberOfLines={1}>
                    继续阅读>
                  </Text>
                </View>
              ) : (
                <View style={styles.bookContentBox}>
                  <Text style={styles.bookContent} numberOfLines={1}>
                    {data.author}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {this._renderOpBox(data, index)}
        </View>
      </TouchableOpacity>
    );
  };

  _renderItem = row => {
    let data = row.item;
    let index = row.index;
    if (data.type === 'ad') {
      return this._renderAd(data, index);
    } else {
      return this._renderBook(data, index);
    }
  };

  // 打开封面
  openCover = () => {
    this.props.navigation.navigate('Cover', {
      id: '234234',
    });
  };

  showPopModal = () => {
    this.setState(
      {
        showMore: true,
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.w2, {
            toValue: 18,
            easing: Easing.linear,
            duration: 300,
          }),
          Animated.timing(this.state.h2, {
            toValue: 18,
            easing: Easing.linear,
            duration: 300,
          }),
          Animated.timing(this.state.f1, {
            toValue: 18,
            easing: Easing.linear,
            duration: 300,
          }),
          Animated.timing(this.state.w1, {
            toValue: mwidth,
            easing: Easing.linear,
            duration: 360,
          }),
          Animated.timing(this.state.h1, {
            toValue: mheight,
            easing: Easing.linear,
            duration: 360,
          }),
        ]).start(finished => {
          // if (finished) {
          //   this.setState({
          //     isVisible: false,
          //   });
          // }
        });
      },
    );
  };

  closePopModal = callback => {
    Animated.parallel([
      Animated.timing(this.state.w2, {
        toValue: 0,
        easing: Easing.linear,
        duration: 120,
      }),
      Animated.timing(this.state.h2, {
        toValue: 0,
        easing: Easing.linear,
        duration: 120,
      }),
      Animated.timing(this.state.f1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 120,
      }),
      Animated.timing(this.state.w1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 300,
      }),
      Animated.timing(this.state.h1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 300,
      }),
    ]).start(finished => {
      if (finished) {
        this.setState({
          showMore: false,
        });
        callback && callback();
      }
    });
  };

  // 书架管理
  startMa = () => {
    this.setState({
      editing: true,
    });
    Animated.parallel([
      Animated.timing(this.state.w2, {
        toValue: 0,
        easing: Easing.linear,
        duration: 120,
      }),
      Animated.timing(this.state.h2, {
        toValue: 0,
        easing: Easing.linear,
        duration: 120,
      }),
      Animated.timing(this.state.f1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 120,
      }),
      Animated.timing(this.state.w1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 300,
      }),
      Animated.timing(this.state.h1, {
        toValue: 0,
        easing: Easing.linear,
        duration: 300,
      }),

      Animated.timing(this.state.offsetOp, {
        easing: Easing.linear,
        duration: 300,
        toValue: 1,
      }),
    ]).start(finished => {
      this.setState({
        showMore: false,
      });
    });
  };

  // 关闭管理
  closeMa = () => {
    Animated.parallel([
      Animated.timing(this.state.offsetOp, {
        easing: Easing.linear,
        duration: 300,
        toValue: 0,
      }),
    ]).start(finished => {
      console.log('', finished);
    });
    this.setState({
      showMore: false,
      editing: false,
    });
  };

  // 全选
  chooseAll = () => {
    let books = this.state.books;
    let chooseBooks = [];
    let chooseIndexes = [];
    books.map(function(item, index) {
      chooseBooks.push(item);
      chooseIndexes.push(index);
    });
    this.setState(
      {
        chooseBooks,
        chooseIndexes,
      },
      () => {
        if (chooseIndexes.length > 0) {
          Animated.timing(this.state.delOpcity, {
            easing: Easing.linear,
            duration: 100,
            toValue: 1,
          }).start();
        }
      },
    );
  };

  // 删除
  deleteBooks = () => {
    let chooseIndexes = this.state.chooseIndexes.reverse();
    let books = this.state.books;
    chooseIndexes.map(function(item) {
      books.splice(item, 1);
    });
    this.setState({
      chooseBooks: [],
      chooseIndexes: [],
      books,
    });
    //
    this.closeMa();
  };

  // 弹窗
  _renderPopWindow = () => {
    if (!this.state.showMore) {
      return null;
    }
    return (
      <Modal
        transparent={true}
        visible={this.state.showMore}
        animationType={'fade'}
        onRequestClose={() => this.closePopModal()}>
        <View style={[styles.popContainer]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.closePopModal()}>
            <View style={[styles.popContainer]} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={e => console.log(e)}
            style={{
              position: 'absolute',
              width: mwidth,
              top: 52,
              right: 20,
              zIndex: 100,
            }}>
            <View style={styles.modalBox}>
              <Animated.View
                style={[
                  styles.modal,
                  {
                    width: this.state.w1,
                    height: this.state.h1,
                  },
                ]}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.startMa()}>
                  <View style={styles.itemView}>
                    <Animated.View
                      style={{
                        width: this.state.w2,
                        height: this.state.h2,
                      }}>
                      <Icon
                        name="grid"
                        type="feather"
                        color="#666666"
                        size={18}
                      />
                    </Animated.View>
                    <Animated.Text
                      style={[
                        styles.textStyle,
                        {
                          fontSize: this.state.f1,
                        },
                      ]}>
                      书架管理
                    </Animated.Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.openImport()}>
                  <View style={styles.itemView}>
                    <Animated.View
                      style={{
                        width: this.state.w2,
                        height: this.state.h2,
                      }}>
                      <Icon
                        name="folder-plus"
                        type="feather"
                        color="#666666"
                        size={18}
                      />
                    </Animated.View>
                    <Animated.Text
                      style={[
                        styles.textStyle,
                        {
                          fontSize: this.state.f1,
                        },
                      ]}>
                      导入书籍
                    </Animated.Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={this.state.scrollStatus ? '#fff' : '#EDEDED'}
          translucent={true}
          hidden={this.state.hideStatusBar}
          animated={true}
        />
        {this._renderPopWindow()}

        <Animated.View
          style={{
            opacity: this.state.fadeAnim,
          }}>
          <Header
            // backgroundImage={logoPng}
            backgroundColor={this.state.scrollStatus ? '#fff' : '#EDEDED'}
            // backgroundImageStyle={{
            //   opacity: 0.5,
            // }}
            placement="left"
            leftComponent={{
              text: '七猫免费小说',
              style: {color: '#000', fontSize: 20},
            }}
            rightComponent={this.renderRightComponent()}
            containerStyle={styles.topContainer}
          />
        </Animated.View>

        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll}>
          <View style={styles.placeHolderBox}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.openCover}
              style={{
                height: 100,
                position: 'absolute',
                top: 0,
                left: 20,
                width: width - 40,
                zIndex: 20,
              }}>
              <View style={styles.placeHolderAd}>
                <View>
                  <Image source={logoPng} style={styles.placeHolderImage} />
                </View>
                <View style={styles.placeHolderTextBox}>
                  <View style={styles.placeHolderTitleBox}>
                    <Text style={styles.placeHolderTitle}>
                      {this.state.recom.title}
                    </Text>
                    <Icon name={'rowing'} color={'#00aced'} size={20} />
                  </View>
                  <View style={styles.placeHolderContentBox}>
                    <Text style={styles.placeHolderContent} numberOfLines={2}>
                      {this.state.recom.summery}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.placeHolderUp} />
            <View style={styles.placeHolderDow} />
          </View>

          {/* 列表 */}
          <View style={styles.booksBox}>
            <FlatList
              data={this.state.books}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              extraData={this.state}
              ListEmptyComponent={this._renderEmpty}
              ListFooterComponent={this._renderFooter}
              ItemSeparatorComponent={this._separator}
              initialNumToRender={10}
              numColumns={1}
              onEndReachedThreshold={0.1}
              flashScrollIndicators={true}
            />
          </View>
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: -60,
            // bottom: 0,
            left: 0,
          }}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: this.state.offsetOp.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60],
                  }),
                },
              ],
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: width,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.chooseAll()}
                style={{
                  flexBasis: '50%',
                  alignItems: 'center',
                  flexGrow: 1,
                }}>
                <View
                  style={{
                    paddingBottom: 15,
                    paddingTop: 15,
                    flexGrow: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#666666',
                    }}>
                    全选
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.deleteBooks()}
                style={{
                  flexBasis: '50%',
                  flexGrow: 1,
                  alignItems: 'center',
                }}>
                <Animated.View
                  style={{
                    paddingBottom: 15,
                    paddingTop: 15,
                    opacity: this.state.delOpcity,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#FCA000',
                    }}>
                    删除({this.state.chooseIndexes.length})
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    // backgroundColor: '#EDEDED',
    // paddingBottom: 10,
  },
  topBackImg: {width: width},
  topBtnBox: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  topBtn: {
    marginLeft: 30,
  },
  placeHolderBox: {
    position: 'relative',
    height: 100,
  },
  placeHolderAd: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 10,

    shadowColor: '#000000',
    shadowOffset: {w: 10, h: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  placeHolderImage: {width: 60, height: 80},
  placeHolderTextBox: {
    marginLeft: 15,
    width: width - 150,
  },
  placeHolderTitleBox: {flexDirection: 'row', marginTop: 5},
  placeHolderTitle: {fontSize: 16},

  placeHolderContentBox: {marginTop: 5},
  placeHolderContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  placeHolderUp: {
    height: 50,
    backgroundColor: '#E8E8E8',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeHolderDown: {
    height: 50,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  booksBox: {
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bookBox: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookImage: {width: 66, height: 90},
  bookTextBox: {
    marginLeft: 20,
    width: width - 180,
  },
  bookTitleBox: {flexDirection: 'row', marginTop: 12, marginBottom: 12},
  bookTitle: {fontSize: 16},

  bookContentBox: {
    flexDirection: 'row',
  },
  bookContent: {
    fontSize: 14,
    color: '#ACACAC',
    lineHeight: 20,
    marginRight: 10,
  },
  adName: {
    fontSize: 12,
    color: '#D0D0D0',
    lineHeight: 20,
  },
  bookRead: {
    fontSize: 14,
    color: '#FF9B21',
    lineHeight: 20,
    marginRight: 10,
  },

  footerBox: {
    marginTop: 15,
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  footerPng: {width: 60, height: 80},
  footerContentBox: {
    marginLeft: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  footerContent: {
    fontSize: 16,
    color: '#9B9B9B',
  },

  popContainer: {
    width: width,
    height: height,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalBox: {
    borderRadius: 5,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  textStyle: {
    color: '#2E2E2E',
    fontSize: 20,
    marginLeft: 8,
  },
  imgStyle: {
    width: 20,
    height: 20,
  },
});

export default Index;
