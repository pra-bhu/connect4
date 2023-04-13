//using JSON functions to deepCopy as we've a fixed sized array and this deepCopy is occasional
export const deepCopy = (source:any[]) => JSON.parse(JSON.stringify(source))

export const getPositionInArray = (position:string) => position.split(':').map(val => parseInt(val))