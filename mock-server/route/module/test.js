'use strict';
/**
 * 路由模块定义
 * @param  {Object} express Express框架实例
 * @param  {Object} upload  上传文件组件
 * @return {[Object]}         路由模块
 */
function router(express, upload) {
  // API: http://www.expressjs.com.cn/4x/api.html#router
  var router = express.Router();
    // GET方法
  router.get('/', function (req, res) {
    return res.json({
      name: 'carrey',
      content: 'hi, carrey'
    });
  });
 
  return router;
}

module.exports = {
  // root url
  root: '/test',
  router: router
};
