export type ValidationRuleFunc = (value: string) => boolean;

export const validateRules = (value: string, rules : Array<Function>) => {
    if (!rules || rules.length == 0) return true;

    return rules.flatMap(rule => rule(value)).every(rule => rule)
}