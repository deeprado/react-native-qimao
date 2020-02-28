
### 依赖处理

# appcenter

# react-native-code-push

# jpush-react-native

# react-native-device-info

android/build.gradle

...
  ext {
    // dependency versions

    We have 3 options for deviceId:
    //Option 1 (latest):
    firebaseIidVersion = "19.0.1" // default: "19.0.1"
    //Option 2 (legacy GooglePlay dependency but using AndroidX):
    googlePlayServicesIidVersion = "17.0.0" // default: "17.0.0" - AndroidX
    //Option 3 (legacy GooglePlay dependency before AndroidX):
    googlePlayServicesIidVersion = "16.0.1"


    //include as needed:
    compileSdkVersion = "28" // default: 28 (28 is required for AndroidX)
    targetSdkVersion = "28" // default: 28 (28 is required for AndroidX)
    supportLibVersion = '1.0.2' // Use '28.0.0' or don't specify for old libraries, '1.0.2' or similar for AndroidX
    mediaCompatVersion = '1.0.1' // Do not specify if using old libraries, specify '1.0.1' or similar for androidx.media:media dependency
    supportV4Version = '1.0.0' // Do not specify if using old libraries, specify '1.0.0' or similar for androidx.legacy:legacy-support-v4 dependency
  }
...

# react-native-vector-icons
android/app/build.gradle

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"


### 计划

# 自定义字体
# 阅读器样式
# 适配IOS
