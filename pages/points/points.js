let rewardedVideoAd = null;
var common = require("common/common.js");
Page({
  data:{
    f_title: common.config.appData.f_title,
    s_title: common.config.appData.s_title,
    BannerAd:common.config.BannerAd
  },
  onLoad: function (options) {
    this.first();
    this.ads();
  },
  onShow() {
    this.getpoints();
  },
  
  //初始化积分
  first: function () {
    var that = this;
    wx.getStorage({
      key: 'day_one_1',//跳转小程序一
      fail: function (res) {
        wx.setStorage({
          key: 'day_one_1',
          data: 0,
        })
      },
    });
    wx.getStorage({
      key: 'day_one_2',//跳转小程序二
      fail: function (res) {
        wx.setStorage({
          key: 'day_one_2',
          data: 0,
        })
      },
    });
    wx.getStorage({
      key: 'points',
      fail: function (res) {
        wx.setStorageSync('points', 1);//初始化积分1
        that.getpoints();
        that.points_history();
      },
    })
  },
  //初始化积分历史
  points_history: function () {
    var that = this;
    var date = common.nowTime();
    wx.getStorage({
      key: 'points_history',
      fail(res) {
        that.setData({
          list_url: {
            date: date,
            content: "初次使用",
            points: "+1"
          }
        });
        var newarr = [that.data.list_url]; //对象转为数组
        var newarr = JSON.stringify(newarr);//数组转对象
        wx.setStorage({
          key: 'points_history',
          data: newarr
        })
      }
    });
  },
  //配置激励广告
  ads: function () {
    var that = this;
    if (wx.createRewardedVideoAd) {
      rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: common.config.VideoAd
      })
      rewardedVideoAd.onLoad()
      rewardedVideoAd.onError((err) => {
      })
      rewardedVideoAd.onClose((res) => {
        if (res && res.isEnded) {
          that.add_2();
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '中途退出无法获得积分奖励哦',
            success(res) {
              if (res.confirm) {
                that.openad();
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }
  },
  //打开视频广告
  openad() {
    if (rewardedVideoAd) {
      rewardedVideoAd.show();
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '您目前微信版本有误，暂不支持观看',
      })
    }
  },
  //获取积分数
  getpoints: function () {
    var that = this;
    var points = wx.getStorageSync('points');
    that.setData({
      points: points
    });
  },
  //跳转小程序奖励记录
  points1_history: function () {
    var that = this;
    wx.getStorage({
      key: 'points_history',
      success(res) {
        var oldarr = JSON.parse(res.data);
        var date = common.nowTime();
        that.setData({
          list_url: {
            date: date,
            content: "打开推荐程序",
            points: "+1"
          }
        });
        var newarr = [that.data.list_url]; //对象转为数组
        var newarr = newarr.concat(oldarr);//连接数组
        var newarr = JSON.stringify(newarr);//数组转对象
        wx.setStorage({
          key: 'points_history',
          data: newarr
        })
      },
    });
  },
  //观看视频奖励记录
  points2_history: function () {
    var that = this;
    wx.getStorage({
      key: 'points_history',
      success(res) {
        var oldarr = JSON.parse(res.data);
        var date = common.nowTime();
        that.setData({
          list_url: {
            date: date,
            content: "观看视频",
            points: "+3"
          }
        });
        var newarr = [that.data.list_url]; //对象转为数组
        var newarr = newarr.concat(oldarr);//连接数组
        var newarr = JSON.stringify(newarr);//数组转对象
        wx.setStorage({
          key: 'points_history',
          data: newarr
        })
      },
    });
  },

  //跳转第一个小程序
 go1: function (e) {
    var that = this;
    wx.navigateToMiniProgram({
      appId: common.config.appData.f_id,
      path: common.config.appData.f_url,
      success(res) {
        that.check1();
      },
      fail(res) {
        wx.showModal({
          title: '温馨提示',
          content: '中途退出无法获得积分奖励哦',
          success(res) {
            if (res.confirm) {
              that.ios();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  //跳转第二个小程序
  go2: function (e) {
    var that = this;
    wx.navigateToMiniProgram({
      appId: common.config.appData.s_id,
      path: common.config.appData.s_url,
      success(res) {
        that.check2();
      },
      fail(res) {
        wx.showModal({
          title: '温馨提示',
          content: '中途退出无法获得积分奖励哦',
          success(res) {
            if (res.confirm) {
              that.douyin();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  //获取现在日期
  nowday: function () {
    var now = new Date();
    var day = now.getDate();
    return day;
  },
  //校检第一个小程序是否跳转
  check1: function () {
    var that = this;
    wx.getStorage({
      key: 'day_one_1',
      success: function (res) {
        var time = res.data;
        var now = that.nowday();
        if (time == now) {
          wx.showToast({
            title: '今日已领取',
            icon: 'success',
            duration: 2000
          })
        } else {
          that.add_1();
          wx.setStorage({
            key: 'day_one_1',
            data: now,
          })
        }
      },
    })
  },
  //校检第二个小程序是否跳转
  check2: function () {
    var that = this;
    wx.getStorage({
      key: 'day_one_2',
      success: function (res) {
        var time = res.data;
        var now = that.nowday();
        if (time == now) {
          wx.showToast({
            title: '今日已领取',
            icon: 'success',
            duration: 2000
          })
        } else {
          that.add_1();
          wx.setStorage({
            key: 'day_one_2',
            data: now,
          })
        }
      },
    })
  },
  //加3积分
  add_2: function () {
    var that = this;
    var points = wx.getStorageSync('points');
    var points = points + 3;
    wx.setStorageSync('points', points);
    wx.showToast({
      title: '积分+3',
      icon: 'success',
      duration: 2000
    });
    that.getpoints();
    that.points2_history();

  },
  //加1积分
  add_1: function () {
    var that = this;
    var points = wx.getStorageSync('points');
    var points = points + 1;
    wx.setStorageSync('points', points);
    wx.showToast({
      title: '积分+1',
      icon: 'success',
      duration: 2000
    });
    that.getpoints();
    that.points1_history();
  },
  //查看积分历史
  gohistory() {
    wx.navigateTo({
      url: 'points_history',
    })
  },
})