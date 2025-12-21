import type { TaskModel } from "../models/TaskModel";

export function nextCycleType(cycle: number): TaskModel['type'] {
    if (cycle % 8 === 0) return 'longBreakTime'
    if (cycle % 2 === 0) return 'shortBreakTime'

    return 'workTime'
}