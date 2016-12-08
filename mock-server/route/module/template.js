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
      name: 'success',
      enabled: true
    });
  });
  // GET方法
  router.get('/user', function (req, res) {
    // 获取查询参数，使用req.query
    var name = req.query.name;
    var enabled = req.query.enabled;
    return res.json({
      name: name,
      enabled: enabled
    });
  });
  // POST方法
  router.post('/user', function (req, res) {
    // 获取查询参数，使用req.body
    if (req.body.username) {
      res.sendStatus(200);
    } else {
      // Bad Request
      res.sendStatus(400);
    }
  });
  // DELETE方法
  router.delete('/user/:userId', function (req, res) {
    // 获取URL路径中参数，使用req.params
    var userId = req.params.userId;
    return res.json(userId);
  });
  // PUT方法
  router.put('/user', function (req, res) {
    return res.json({result: 'success'});
  });
  // 所有方法
  router.all('/welcome', function (req, res) {
    return res.json({result: 'success'});
  });
  // 上传文件
  router.post('/uploadBusinessLicence', upload.single('file'), function (req, res) {
    res.sendStatus(200);
  });
  return router;
}

module.exports = {
  // root url
  root: '/template',
  router: router
};
