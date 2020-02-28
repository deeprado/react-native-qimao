import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';

// 认证
import Panel from './pages/Auth/Panel';
import Privacy from './pages/Auth/Privacy';
import Agreement from './pages/Auth/Agreement';
import Mobile from './pages/Auth/Mobile';
import Signin from './pages/Auth/Signin';
import Copyright from './pages/Auth/Copyright';
import Permission from './pages/Auth/Permission';

// 书架
import Shelf from './pages/Shelf/Index';
import Record from './pages/Shelf/Record';
import Fill from './pages/Shelf/Fill';

// 搜索
import Search from './pages/Search/Search';
// 书城
import Depot from './pages/Depot/Index';
// 福利
import Welfare from './pages/Welfare/Index';
import Noad from './pages/Welfare/Noad';
import Download from './pages/Welfare/Download';
import Lottery from './pages/Welfare/Lottery';

// 我的
import Profile from './pages/Profile/Index';
import Cash from './pages/Profile/Cash';
import Gold from './pages/Profile/Gold';
import Invitation from './pages/Welfare/Invitation';
import Notice from './pages/Profile/Notice';
import Teenager from './pages/Profile/Teenager';
import Privilege from './pages/Profile/Privilege';
import Withdraw from './pages/Profile/Withdraw';
import RedEnvelope from './pages/Profile/RedEnvelope';

// 设置
import Setting from './pages/Profile/Setting';
import About from './pages/Profile/Setting/About';
import BasicInfo from './pages/Profile/Setting/BasicInfo';
import AccountSafe from './pages/Profile/Setting/AccountSafe';
import ReadSetting from './pages/Profile/Setting/ReadSetting';
import CacheClear from './pages/Profile/Setting/CacheClear';
import Nickname from './pages/Profile/Setting/Nickname';
import Avatar from './pages/Profile/Setting/Avatar';
import AccountMobile from './pages/Profile/Setting/AccountMobile';
import AccountMobileChange from './pages/Profile/Setting/AccountMobileChange';
import AccountDestroy from './pages/Profile/Setting/AccountDestroy';
import AccountDestroyApplication from './pages/Profile/Setting/AccountDestroyApplication';

// 帮助
import Help from './pages/Profile/Help';
import Detail from './pages/Profile/Help/Detail';
import Feedback from './pages/Profile/Help/Feedback';
import FeedbackAdd from './pages/Profile/Help/FeedbackAdd';
import MultiplePic from './pages/Profile/Help/MultiplePic';

// 启动页
import SplashPage from './pages/Splash/Index';
// 广告
import AdPage from './pages/Ad/Index';
import Video from './pages/Ad/Video';

// 封面简介
import Cover from './pages/Fiction/Cover';
// 阅读器
import Reader from './pages/Fiction/Reader';

// 书城
import Category from './pages/Depot/Category';
import Rank from './pages/Depot/Rank';
import Product from './pages/Depot/Product';
import Boutique from './pages/Depot/Boutique';
import Filter from './pages/Depot/Filter';

let SettingStack = createStackNavigator(
  {
    Default: {
      screen: Setting,
      navigationOptions: {
        headerShown: false,
      },
    },
    About: {
      screen: About,
      navigationOptions: {
        headerShown: false,
      },
    },
    BasicInfo: {
      screen: BasicInfo,
      navigationOptions: {
        headerShown: false,
      },
    },
    AccountSafe: {
      screen: AccountSafe,
      navigationOptions: {
        headerShown: false,
      },
    },
    ReadSetting: {
      screen: ReadSetting,
      navigationOptions: {
        headerShown: false,
      },
    },
    CacheClear: {
      screen: CacheClear,
      navigationOptions: {
        headerShown: false,
      },
    },
    Nickname: {
      screen: Nickname,
      navigationOptions: {
        headerShown: false,
      },
    },
    Avatar: {
      screen: Avatar,
      navigationOptions: {
        headerShown: false,
      },
    },
    AccountMobile: {
      screen: AccountMobile,
      navigationOptions: {
        headerShown: false,
      },
    },
    AccountMobileChange: {
      screen: AccountMobileChange,
      navigationOptions: {
        headerShown: false,
      },
    },
    AccountDestroy: {
      screen: AccountDestroy,
      navigationOptions: {
        headerShown: false,
      },
    },
    AccountDestroyApplication: {
      screen: AccountDestroyApplication,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Default',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      headerShown: false,
    },
  },
);

const bottomTabOptions = (tabBarTitle, {iconName, typeName}, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    return <Icon name={iconName} type={typeName} size={25} color={tintColor} />;
  };
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  return {
    tabBarLabel,
    tabBarIcon,
    tabBarVisible,
    headerTitle,
    headerTitleStyle,
    headerStyle,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    ShelfBox: {
      screen: Shelf,
      navigationOptions: () =>
        bottomTabOptions('书架', {iconName: 'ios-podium', typeName: 'ionicon'}),
    },
    DepotBox: {
      screen: Depot,
      navigationOptions: () =>
        bottomTabOptions('书城', {iconName: 'ios-book', typeName: 'ionicon'}),
    },
    WelfareBox: {
      screen: Welfare,
      navigationOptions: () =>
        bottomTabOptions('福利', {iconName: 'ios-gift', typeName: 'ionicon'}),
    },
    ProfileBox: {
      screen: Profile,
      navigationOptions: () =>
        bottomTabOptions('福利', {iconName: 'ios-person', typeName: 'ionicon'}),
    },
  },
  {
    initialRouteName: 'ShelfBox',
    tabBarOptions: {
      activeTintColor: '#FF9744',
      inactiveTintColor: 'gray',
    },
  },
);

const commonNavigationOptions = {
  tabBarVisible: false,
  headerShown: false,
};

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: commonNavigationOptions,
    },
    // 书架
    Shelf: {
      screen: Shelf,
      navigationOptions: commonNavigationOptions,
    },
    // 搜索
    Search: {
      screen: Search,
      navigationOptions: commonNavigationOptions,
    },
    // 签到
    Signin: {
      screen: Signin,
      navigationOptions: commonNavigationOptions,
    },
    Record: {
      screen: Record,
      navigationOptions: commonNavigationOptions,
    },
    Fill: {
      screen: Fill,
      navigationOptions: commonNavigationOptions,
    },
    // 认证相关
    Panel: {
      screen: Panel,
      navigationOptions: commonNavigationOptions,
    },
    Privacy: {
      screen: Privacy,
      navigationOptions: commonNavigationOptions,
    },
    Mobile: {
      screen: Mobile,
      navigationOptions: commonNavigationOptions,
    },
    Agreement: {
      screen: Agreement,
      navigationOptions: commonNavigationOptions,
    },
    Copyright: {
      screen: Copyright,
      navigationOptions: commonNavigationOptions,
    },
    Permission: {
      screen: Permission,
      navigationOptions: commonNavigationOptions,
    },
    // 书城
    Category: {
      screen: Category,
      navigationOptions: commonNavigationOptions,
    },
    Rank: {
      screen: Rank,
      navigationOptions: commonNavigationOptions,
    },
    Product: {
      screen: Product,
      navigationOptions: commonNavigationOptions,
    },
    Boutique: {
      screen: Boutique,
      navigationOptions: commonNavigationOptions,
    },
    Filter: {
      screen: Filter,
      navigationOptions: commonNavigationOptions,
    },
    // 我的
    ProfileBox: {
      screen: Profile,
      navigationOptions: commonNavigationOptions,
    },
    Cash: {
      screen: Cash,
      navigationOptions: commonNavigationOptions,
    },
    Gold: {
      screen: Gold,
      navigationOptions: commonNavigationOptions,
    },
    Invitation: {
      screen: Invitation,
      navigationOptions: commonNavigationOptions,
    },
    Notice: {
      screen: Notice,
      navigationOptions: commonNavigationOptions,
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: commonNavigationOptions,
    },
    Teenager: {
      screen: Teenager,
      navigationOptions: commonNavigationOptions,
    },
    Privilege: {
      screen: Privilege,
      navigationOptions: commonNavigationOptions,
    },
    Withdraw: {
      screen: Withdraw,
      navigationOptions: commonNavigationOptions,
    },
    RedEnvelope: {
      screen: RedEnvelope,
      navigationOptions: commonNavigationOptions,
    },
    Noad: {
      screen: Noad,
      navigationOptions: commonNavigationOptions,
    },
    Help: {
      screen: Help,
      navigationOptions: commonNavigationOptions,
    },
    Detail: {
      screen: Detail,
      navigationOptions: commonNavigationOptions,
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: commonNavigationOptions,
    },
    FeedbackAdd: {
      screen: FeedbackAdd,
      navigationOptions: commonNavigationOptions,
    },
    // 多图选择
    MultiplePic: {
      screen: MultiplePic,
      navigationOptions: commonNavigationOptions,
    },
    // 福利
    Welfare: {
      screen: Welfare,
      navigationOptions: commonNavigationOptions,
    },
    Video: {
      screen: Video,
      navigationOptions: commonNavigationOptions,
    },
    Download: {
      screen: Download,
      navigationOptions: commonNavigationOptions,
    },
    Lottery: {
      screen: Lottery,
      navigationOptions: commonNavigationOptions,
    },

    // 封面
    Cover: {
      screen: Cover,
      navigationOptions: commonNavigationOptions,
    },
    // 阅读器
    Reader: {
      screen: Reader,
      navigationOptions: commonNavigationOptions,
    },
  },
  {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      headerShown: false,
    },
  },
);

const switchNavigationOptions = {
  gesturesEnabled: true,
  headerTitle: null,
};

const SplashStack = createSwitchNavigator(
  {
    SplashPage: {
      screen: SplashPage,
      navigationOptions: switchNavigationOptions,
    },
    AdPage: {
      screen: AdPage,
      navigationOptions: switchNavigationOptions,
    },
    AppPage: {
      screen: AppAllStack,
      navigationOptions: switchNavigationOptions,
    },
  },
  {
    // mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    // transitionConfig: () => ({
    //   screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    // }),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

// const prefix = 'qimao://';
// export default createAppContainer(SplashStack);
export default SplashStack;
