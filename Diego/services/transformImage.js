class transformImage {
  async applyFilter(image,filterType,params){
    const filter = image + filterType + params;
    return filter
}
}

module.exports = transformImage;