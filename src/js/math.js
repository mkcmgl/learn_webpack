export function add(x, y) {
    return x + y;
}

export function mul(x, y) {
    return x * y;
}
export function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
}