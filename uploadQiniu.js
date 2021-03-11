var qiniu = require('qiniu')
var fs = require('fs')

var bucket = 'icyc-storage' // 空间名
var prefix = 'icyc/dist/' // 七牛云路径前缀
var distPath = './dist/' // 需要上传的目录路径
var accessKey = '*****'
var secretKey = '*****'
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

var config = new qiniu.conf.Config()
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0
// 是否使用https域名
//config.useHttpsDomain = true;
// 上传是否使用cdn加速
//config.useCdnDomain = true;

// 单个文件上传
function upload(key, filepath) {
  var options = {
    scope: bucket + ':' + key,
  }
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)
  var formUploader = new qiniu.form_up.FormUploader(config)
  var putExtra = new qiniu.form_up.PutExtra()

  new Promise(function(resolve, reject) {
    // 文件上传
    formUploader.putFile(uploadToken, key, filepath, putExtra, function(
      respErr,
      respBody,
      respInfo,
    ) {
      if (respErr) {
        resolve(respErr)
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody)
      } else {
        reject(respInfo.statusCode, respBody)
      }
    })
  })
}

// 上传所有目录下文件  目前七牛不支持批量上传，需要循环上传。
// 注意：相同路径将会覆盖
var fileNames = fs.readdirSync(distPath)
Promise.all(
  fileNames.map(fileName => upload(prefix + fileName, distPath + fileName)),
)
  .then(() => {
    console.log('upload success')
  })
  .catch(() => {
    console.log('upload fail')
  })
