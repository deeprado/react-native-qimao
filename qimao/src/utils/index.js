import {PixelRatio, Dimensions} from 'react-native';

const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

const basePx = 375;

export function px2dp(px) {
  return (px * deviceW) / basePx;
}

export default {
  navigationHeight: 44,
  navigationBarBGColor: '#3497FF',
  statusBarHeight: 20,
  /*最小线宽*/
  pixel: 1 / PixelRatio.get(),

  /*屏幕尺寸*/
  size: {
    width: deviceW,
    height: deviceH,
  },
};
