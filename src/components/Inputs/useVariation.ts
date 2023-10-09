import { twMerge } from 'tailwind-merge'
import { inputState } from './constants';

const validateWithSuccess = ({ normalState, errorState, successState }: inputState, valid: boolean) => {
    return valid ? twMerge(normalState, successState) : twMerge(normalState, errorState)
}

const validateWithoutSuccess = ({ normalState, errorState }: inputState, valid: boolean) => {
    return valid ? normalState : twMerge(normalState, errorState);
}

const disableInput = ({ normalState, disabled }: inputState) => {
    return twMerge(normalState, disabled);
}

export default (inputStateStyle: inputState, valid: boolean, dirty: boolean, validateSuccess: boolean, disabled?: boolean) => {
    if (!dirty) return inputStateStyle.normalState;
    if (validateSuccess) return validateWithSuccess(inputStateStyle, valid);
    if (disabled) return disableInput(inputStateStyle);

    return validateWithoutSuccess(inputStateStyle, valid);
}


