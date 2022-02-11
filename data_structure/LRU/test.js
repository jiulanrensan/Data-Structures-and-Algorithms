const LRUCache = require('./lru.js')

const lru = new LRUCache(2)

lru.put(1, 1); // 缓存是 {1=1}
lru.put(2, 2); // 缓存是 {1=1, 2=2}
lru.get(1);    // 返回 1
lru.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lru.get(2);    // 返回 -1 (未找到)
lru.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lru.get(1);    // 返回 -1 (未找到)
lru.get(3);    // 返回 3
lru.get(4);    // 返回 4