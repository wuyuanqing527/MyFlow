var util = require('../../utils/util.js')
Page({
  data: {
    time: '12:01',
    date: '2017-11-07',
    //数值越大，优先级越高
    thing_priority: 0,
    thing: 'thing',
    things: [
      // {
      //   todo_time: '12:01',
      //   todo_date: '2017-11-07',
      //   todo_thing_priority: 1,
      //   todo_thing: 'thing'
      // }
    ],
    prioritys: [
      { priority: 0, color: 'grey', checked: 'true' },
      { priority: 1, color: 'green' },
      { priority: 2, color: 'yellow' },
      { priority: 3, color: 'crimson' },
    ]
  },
  addThing: function () {
    let _thing = {
      todo_time: this.data.time,
      todo_date: this.data.date,
      todo_thing: this.data.thing,
      todo_thing_priority: this.data.thing_priority
    }
    this.data.things.push(_thing)

    // this.setData({
    //   things: this.data.things,
    //   thing: 'thing'
    // })
    console.log('onshow' + this.data.things.length)
    wx.setStorage({
      key: 'save_things',
      data: this.data.things,
      success: function (res) {
        wx.navigateBack({
          url: '../index/index',
          success: function (res) {
            // success
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindThingChange: function (e) {
    this.setData({
      thing: e.detail.value
    })
  },
  priorityChange:function(e){
    console.log(e.detail.value)
    this.setData({
      thing_priority:e.detail.value
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log(options.tapindex)

    let that = this
    wx.getStorage({
      key: 'save_things',
      success: function (res) {
        that.setData({
          things: res.data
        })
        if (options.tapindex != undefined) {
          console.log(res.data[options.tapindex].todo_thing)
          that.setData({
            time: res.data[options.tapindex].todo_time,
            date: res.data[options.tapindex].todo_date,
            thing_priority: res.data[options.tapindex].todo_thing_priority,
            thing: res.data[options.tapindex].todo_thing,
          })
        } else {
          that.setData({
            time: util.formatTime(new Date()).substring(11, 16),
            date: util.formatTime(new Date()).substring(0, 10),
            thing: '',
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})