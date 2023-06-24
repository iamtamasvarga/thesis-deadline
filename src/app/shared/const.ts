export enum KEYS {
    DEADLINE_TOGGLE = "DEADLINE_TOGGLE"
}

export const parseStringToBool = (value: string): boolean => 
{
    const tempValue = value.toLowerCase();

    if(value === "true")
        return true;
    else if(value === "false")
        return false;

    throw new Error(`${value} is not a type of bool`);
}