declare module "input-otp" {
  import * as React from "react";

  export type OTPInputProps = {
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
    containerClassName?: string;
    className?: string;
    disabled?: boolean;
    // allow any other props to be passed to underlying input
    [key: string]: any;
  };

  export const OTPInput: React.ForwardRefExoticComponent<
    OTPInputProps & React.RefAttributes<HTMLInputElement>
  >;

  export const OTPInputContext: {
    slots: {
      char: string;
      hasFakeCaret: boolean;
      isActive: boolean;
    }[];
  };

  export default OTPInput;
}
