class transformImage {
    async applyEffect(image,effectType,params){
        const effect = image + effectType + params;
        return effect
    }
}

module.exports = transformImage;