export type ValidationRuleFunc = (value: string) => boolean;

export const validateRules = (value: string, rules : Array<Function>) => {
    if (!rules || rules.length == 0) return true;

    console.log("hey", rules.flatMap(rule => rule(value)).every(rule => rule))
    return rules.flatMap(rule => rule(value)).every(rule => rule)
}