var config = {
  appData: {
    f_title: "苹果限免应用",//第一个跳转小程序的名字
    f_url: "pages/index/index",//第一个跳转小程序的打开路径
    f_id:"wxc8a1acda8d2da0d0",//第一个跳转小程序的appid
    s_title: "抖音免费去水印",
    s_url: "pages/index/index",
    s_id: "wxd7235e2a59c9005b"
  },
  VideoAd:'adunit-574b5a4d798ef68d',//激励广告代码
  BannerAd: 'adunit-3e4a39a38dd19f37'//横幅广告代码
}
var nowTime = function () {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  var date = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
  return date;
}


module.exports = {
  nowTime: nowTime,
  config:config
}

