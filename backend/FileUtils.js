var fs = require('fs');
var qs = require('qs')

var path = require("path");



class FileUtils {

  static geFileNameToUpload (req, file) {
    var query = require('url').parse(req.url,true).path;
    // console.log(req.query.type)
    // var query = req.query
    var unq_id  = req.params.carId;
    // var type = query.type
    var dir_path = `./uploads/`
    
    console.log(file.mimetype)
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'  || file.mimetype == 'image/png'){
    //   console.log(type)
      console.log("image type is jpeg")
      var file_name = `${unq_id}.png`
      console.log(file_name)
      console.log(dir_path)
    //   console.log(fs.existsSync(`${dir_path}/${file_name}`))
    //   if(fs.existsSync(`${dir_path}/${file_name}`) && type !== 'profile'){
    //     throw new Error('file exists, cannot override')
    //   }
      return file_name;
    } else{
      throw new Error('unsupported file type')
    }
  }

  static createDirectory (dirPath) {
    if(!fs.existsSync(dirPath)){
      console.log("Directory does not exist, creating")
      fs.mkdirSync(dirPath, {recursive: true})
      console.log("Directory created")
    }
    console.log('Directory already exists')
  }

  static getFileContentType(){
      return 'image/png';
  }

  static getUploadedFileName(car_id){
    var extension = 'png'
    var fileDir = './uploads/'
    var fileName = fileDir+`/${car_id}.${extension}`
    console.log(`Retrieving file name ${fileName}`)
    return fileName
  }

  static deleteUploadedFile(car_id){
    var extension = 'png'
    var fileDir = './uploads/'
    var fileName = fileDir+`/${car_id}.${extension}`
    var filePath = this.getAbsolutePath(fileName);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${fileName}`, err);
        return;
      }
      console.log(`File deleted successfully. ${fileName}`)
    });
  }

  static getAbsolutePath(relativePath){
    return path.resolve(relativePath);
  }

}

module.exports = FileUtils;