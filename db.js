// 简单的内存计数器实现

// 计数值
let count = 0;

// 计数器对象
const Counter = {
  // 创建新计数（增加计数）
  create: async function () {
    count++;
    return { count };
  },

  // 获取当前计数
  count: async function () {
    return count;
  },

  // 清空计数
  destroy: async function (options) {
    count = 0;
    return true;
  },
};

// 初始化方法（为了保持与原接口兼容）
async function init() {
  console.log('内存计数器已初始化');
}

// 导出初始化方法和计数器对象
module.exports = {
  init,
  Counter,
};
