import {FieldProps} from "formik";
import React from "react";
import MuiSlider, {SliderProps as MuiSliderProps} from "@material-ui/core/Slider";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface SliderProps extends FieldProps, Omit<MuiSliderProps, "name" | "onChange" | "value" | "defaultValue"> {
}

export const fieldToSlider = ({
                                 field,
                                 form: {isSubmitting},
                                 disabled = false,
                                 ...props
                              }: SliderProps): MuiSliderProps => {
   return {
      disabled: isSubmitting || disabled,
      ...props,
      ...field,
      name: field.name,
      value: field.value
   };
};

export const Slider: React.ComponentType<SliderProps> = (props: SliderProps) => (
    <MuiSlider
        {...fieldToSlider(props)}
        onChange={(e, value) => props.field.onChange({
           ...e,
           target: {
              ...e.target,
              name: props.field.name,
              value
           },
        })}
    />
);
