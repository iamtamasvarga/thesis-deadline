export enum KEYS {
    DEADLINE_TOGGLE = "DEADLINE_TOGGLE",
    DEADLINE_TYPE = "DEADLINE_TYPE",
    CUSTOM_DEADLINE = "CUSTOM_DEADLINE"
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

export class BreakPointsPx {
  static readonly DESKTOP = 1024;
  static readonly TABLET = 768;
  static readonly PHONE = 480;
}

export class BreakPointsEm {
  static readonly DESKTOP = 64;
  static readonly TABLET = 48;
  static readonly PHONE = 30;
}
