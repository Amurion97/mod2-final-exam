export function* infinite() {
    let index = 1;
    while (true) {
        yield index++;
    }
}