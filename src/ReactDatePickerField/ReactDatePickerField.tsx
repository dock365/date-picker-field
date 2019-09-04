import * as React from "react";
import { IReactDatePickerFieldState } from "./IReactDatePickerFieldState";
import DatePicker from "react-datepicker";
import { IFieldRenderProps } from "@dock365/reform";
import { FormFieldErrors } from "../FormFieldErrors/FormFieldErrors";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import "react-datepicker/dist/react-datepicker.css";

const className = mergeStyleSets({
  errMsg: {
    color: "#a80000!important",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: 1.3
  },
  datePickerField: {
    backgroundColor: "#ffffff",
    color: "#333333",
    fontSize: "14px",
    borderRadius: 0,
    height: "30px",
    width: "100%",
    paddingLeft: "12px"
  }
});

export type propsType = IFieldRenderProps & {
  customProps: {
    dateFormat?: string;
    showTimeSelect?: boolean;
    timeIntervals?: number;
    timeFormat?: string;
    showTimeSelectOnly?: string;
  };
};

class ReactDatePickerField extends React.Component<
  propsType,
  IReactDatePickerFieldState
> {
  constructor(props: propsType) {
    super(props);
    this.state = {
      selectedValue: null
    };
    this._onChange = this._onChange.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="reformDatePickerField">
        <div>
          {this.props.label && <label htmlFor="">{this.props.label}</label>}
        </div>
        <DatePicker
          selected={this.props.value}
          onChange={this._onChange}
          placeholderText={this.props.placeholder}
          showTimeSelect={
            this.props.customProps && this.props.customProps.showTimeSelect
          }
          timeFormat={
            (this.props.customProps && this.props.customProps.timeFormat) ||
            "HH:mm"
          }
          timeIntervals={
            (this.props.customProps && this.props.customProps.timeIntervals) ||
            15
          }
          timeCaption="Time"
          dateFormat={
            (this.props.customProps && this.props.customProps.dateFormat) ||
            "MM/dd/yyyy"
          }
          showTimeSelectOnly={
            this.props.customProps && this.props.customProps.showTimeSelectOnly
          }
          className={className.datePickerField}
        />
        <div className={className.errMsg}>
          <FormFieldErrors errors={this.props.errors} />
        </div>
      </div>
    );
  }

  private _onChange(value: any) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
}

export default ReactDatePickerField;
