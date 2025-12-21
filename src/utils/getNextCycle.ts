export function getNextCycle(cycle: number) {
    return cycle === 0 || cycle === 8 ? 1 : cycle + 1
}