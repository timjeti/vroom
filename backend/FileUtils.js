var fs = require('fs');
var qs = require('qs')

var path = require("path");



class FileUtils {

  static geFileNameToUpload (req, file) {
    var query = require('url').parse(req.url,true).path;
    var unq_id  = req.params.carId;
    var dir_path = `./uploads/`
    
    console.log(file.mimetype)
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'  || file.mimetype == 'image/png'){
      console.log("image type is jpeg")
      var file_name = `${unq_id}.png`
      console.log(file_name)
      console.log(dir_path)
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

  static getSliderNameToUpload(file) {
    var dir_path = `./uploads/`
    console.log(file.mimetype)
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'  || file.mimetype == 'image/png'){
      return Date.now()+'.png';
    } else{
      throw new Error('Unsupported file type for image')
    }
  }

  static deleteSliderFile(slider_id) {
    var extension = 'png'
    var fileDir = './uploads/slider'
    var fileName = fileDir+`/${slider_id}.${extension}`
    var filePath = this.getAbsolutePath(fileName);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting slider file: ${fileName}`, err);
        return;
      }
      console.log(`Slider File deleted successfully. ${fileName}`)
    });
  }

  static getUploadedSliderName(slider_id){
    var extension = 'png'
    var fileDir = './uploads/slider'
    var fileName = fileDir+`/${slider_id}.${extension}`
    console.log(`Retrieving file name ${fileName}`)
    return fileName
  }

}



module.exports = FileUtils;