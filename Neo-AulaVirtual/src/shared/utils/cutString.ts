export const cutString = (str : string, limit : number) => {
    const arr = str.split(" ").slice(0,2);
    const newStr = arr.join(" ").slice(0, limit);
    return newStr;
}