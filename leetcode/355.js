//  355 https://leetcode-cn.com/problems/design-twitter/
// 设计一个简化版的推特(Twitter)，可以让用户实现发送推文，关注/取消关注其他用户，能够看见关注人（包括自己）的最近 10 条推文。

// 实现 Twitter 类：

// Twitter() 初始化简易版推特对象

// void postTweet(int userId, int tweetId) 根据给定的 tweetId(推文id) 和 userId 创建一条新推文。每次调用此函数都会使用一个不同的 tweetId 。

// List<Integer> getNewsFeed(int userId) 检索当前用户新闻推送中最近  10 条推文的 ID 。新闻推送中的每一项都必须是由用户关注的人或者是用户自己发布的推文。推文必须 按照时间顺序由最近到最远排序 。

// void follow(int followerId, int followeeId) ID 为 followerId 的用户开始关注 ID 为 followeeId 的用户。

// void unfollow(int followerId, int followeeId) ID 为 followerId 的用户不再关注 ID 为 followeeId 的用户

// test case
// Twitter twitter = new Twitter();
// twitter.postTweet(1, 5); // 用户 1 发送了一条新推文 (用户 id = 1, 推文 id = 5)
// twitter.getNewsFeed(1);  // 用户 1 的获取推文应当返回一个列表，其中包含一个 id 为 5 的推文
// twitter.follow(1, 2);    // 用户 1 关注了用户 2
// twitter.postTweet(2, 6); // 用户 2 发送了一个新推文 (推文 id = 6)
// twitter.getNewsFeed(1);  // 用户 1 的获取推文应当返回一个列表，其中包含两个推文，id 分别为 -> [6, 5] 。推文 id 6 应当在推文 id 5 之前，因为它是在 5 之后发送的
// twitter.unfollow(1, 2);  // 用户 1 取消关注了用户 2
// twitter.getNewsFeed(1);  // 用户 1 获取推文应当返回一个列表，其中包含一个 id 为 5 的推文。因为用户 1 已经不再关注用户 2


// 先模拟一个单链表
class Node {
  constructor (data) {
    this.next = null
    this.data = data
  }
}

// 只实现添加
class SingleLinkedList {
  constructor () {
    this.head = new Node()
    this.size = 0
  }
  // 添加节点
  append (data) {
    const node = new Node(data)
    if (!this.head.next) {
      this.head.next = node
      return
    }
    let currentNode = this.head
    while (currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = node
  }
  // 插入到第一个
  insertFirst (data) {
    const moveNode = this.head.next
    const node = new Node(data)
    this.head.next = node
    node.next = moveNode
  }
}

class Tweet {
  constructor({tweetId, postTime, userId}) {
    this.userId = userId
    this.tweetId = tweetId
    this.postTime = postTime
  }
}

class User {
  constructor(userId) {
    this.userId = userId
    // 关注列表，set可以用来去重
    this.followeeList = new Set()
    this.postList = new SingleLinkedList()
  }
  postTweet (tweetId) {
    // 最新的应该插入最前面
    // 因为链表是从头节点开始取，保证优先取最新的
    this.postList.insertFirst(new Tweet({
      tweetId, 
      userId: this.userId,
      postTime: new Date().getTime()
    }))
  }
  follow (followId) {
    this.followeeList.add(followId)
  }
  unfollow (followId) {
    this.followeeList.delete(followId)
  }
  getFolloweeList () {
    return [...this.followeeList]
  }
  getPostList () {
    return this.postList
  }
}

class Twitter {
  constructor () {
    this.userMap = new Map()
  }
  postTweet (userId, tweetId) {
    if (!this.userMap.get(userId)) this.userMap.set(userId, new User(userId))
    const user = this.userMap.get(userId)
    user.postTweet(tweetId)
  }
  follow (userId, followeeId) {
    if (!this.userMap.get(userId)) this.userMap.set(userId, new User(userId))
    if (!this.userMap.get(followeeId)) this.userMap.set(followeeId, new User(followeeId))
    const user = this.userMap.get(userId)
    user.follow(followeeId)
    console.log('follow: userId', userId, this.userMap);
  }
  unfollow (userId, followeeId) {
    // 不存这个userId
    if (!this.userMap.get(userId)) return
    const user = this.userMap.get(userId)
    user.unfollow(followeeId)
    console.log('follow: userId', userId, this.userMap);
  }
  getNewsFeed (userId) {
    // 不存在这个userId
    if (!this.userMap.get(userId)) return []
    const user = this.userMap.get(userId)
    const followeeList = user.getFolloweeList()
    const userPostLinkedList = user.getPostList()
    // 多链表进行比较
    const res = this._getInMulLinkedList([userPostLinkedList, ...followeeList.map(el => {
      return this.userMap.get(el).getPostList()
    })])
    console.log('getNewsFeed', res);
    return res
  }
  // 取十条数据
  _getInMulLinkedList (list) {
    // 分别用指针指向各个链表头部
    // 如取出各个链表数据放入 [{tweetId: 1, time: 1},{tweetId: 2, time: 4},{tweetId: 3, time: 5}]
    // 按照时间进行排序，取出最新的，这里用sort排序
    // 然后回到刚取出的数据的链表，取该链表下一个数据，继续比较
    // 先放置数据
    const queue = []
    for (let i = 0; i < list.length; i++) {
      // head.next 为 Node 类型
      // head.next.data.postTime
      list[i].head.next && queue.push(list[i].head.next)
    }
    
    const res = []
    let num = 0
    while (num < 10) {
      // 没有则退出循环
      if (!queue.length) break
      // 最新在最末尾
      queue.sort((a,b) => a.data.postTime - b.data.postTime)
      // latest 为 Node 类型
      const latest = queue.pop()
      res.push(latest.data.tweetId)
      latest.next && queue.push(latest.next)
      num++
    }
    return res
  }
}

const twitter = new Twitter()
twitter.postTweet(1, 5)
twitter.follow(1, 2)
twitter.follow(2, 1)
twitter.getNewsFeed(2)
twitter.postTweet(2, 6)
twitter.getNewsFeed(1)
twitter.getNewsFeed(2)
// twitter.unfollow(2, 1)
// twitter.getNewsFeed(1)
// twitter.getNewsFeed(2)
// twitter.unfollow(1, 2)
// twitter.getNewsFeed(1)
// twitter.getNewsFeed(2)
