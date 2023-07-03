export const delay  = <T>(a : T,t = 100) : Promise<T> => {
    return new Promise((res) => setTimeout(() => {res(a)} ,t))
}