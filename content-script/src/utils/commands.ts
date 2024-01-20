const covertArrayStringToArray = (arrayString: string) => {
    return arrayString.replace("[", "").replace("]", "").split(",").map((item) => item.trim());
}

export type Command = {
    func: 'run' | 'set';
    selectors: string[],
    params?: string[],
    setting?: string,
    variable: any,
    value: any
}
const cmd = {
    run: (values: { [key: string]: any }, { setting, variable = globalThis, selectors = [], params = [] }: Partial<Command>) => {

        for (let selector of selectors) {
            // @ts-ignore
            if (typeof variable[selector] === "function") {
                // @ts-ignore
                variable = variable[selector](...params);
            } else {
                // @ts-ignore
                variable = variable[selector];
            }
            console.log(variable)
        }

        values = variable
    },
    set: (values: { [key: string]: any }, { variable = "", value }: Partial<Command>) => {
        values[variable] = value;
    }
}

export const runCommands = (commands: Partial<Command>[] | string = []): boolean => {
    if (typeof commands === "string") {
        commands = JSON.parse(commands) as Command[];
    }
    let values = {};
    try {
        for (let command of commands) {
            // @ts-ignore
            cmd[command.func as string](values, command);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}