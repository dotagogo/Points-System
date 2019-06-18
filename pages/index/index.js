/*
Made By xuhuai
使用说明地址：https://github.com/xuhuai66/Points-System
*/
var common = require("../points/common/common.js");
Page({
  data: {
 word:'点我扣积分'
  },
  //积分校检
  check() {
    var that = this;
    wx.getStorage({
      key: 'points',
      success: function (res) {
        var points = res.data;
        if (points < 3) {
          wx.showModal({
            title: '温馨提示',
            content: '积分不足，请先领取积分',
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/points/points',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          var points = res.data - 3;
          wx.setStorageSync('points', points);
          that.points_history();
          that.successgo();
        }
      },
      fail() {
        wx.showModal({
          title: '温馨提示',
          content: '请先领取积分',
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/points/points',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  //积分历史
  points_history () {
    var that = this;
    wx.getStorage({
      key: 'points_history',
      success(res) {
        var oldarr = JSON.parse(res.data);
        var date = common.nowTime();
        that.setData({
          list_url: {
            date: date,
            content: "获取密码",
            points: "-3"
          }
        });
        var newarr = [that.data.list_url];
        var newarr = newarr.concat(oldarr);
        var newarr = JSON.stringify(newarr);
        wx.setStorage({
          key: 'points_history',
          data: newarr
        })
      },
    });
  },
  //成功操作
  successgo(){
   this.setData({
     word:'积分扣除成功'
   })
    }
})
