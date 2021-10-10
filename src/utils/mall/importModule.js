export default function (context, fileType) {
    try {
        const components = {};
        const keyReg = new RegExp(`(\\.\\/|\\.${fileType})`, 'g');
        context.keys().forEach((key) => {
            components[key.replace(keyReg, "")] = context(key).default;
        });
    
        return components;
    } catch (error) {
        throw new Error('传入参数有误')
    }
}