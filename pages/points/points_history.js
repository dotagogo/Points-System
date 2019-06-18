Page({
  onShow() {
    this.getHistory();
    this.getpoints();
  },
  getpoints: function () {
    var that = this;
    var points = wx.getStorageSync('points');
    that.setData({
      points: points
    });
  },
  getHistory: function () {
    var that = this;
    wx.getStorage({
      key: 'points_history',
      success(res) {
        var oldarr = JSON.parse(res.data);
        that.setData({
          list: oldarr
        });
      },
    })
  },
})