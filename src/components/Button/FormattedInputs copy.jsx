import * as React from 'react';
import { NumericFormat } from 'react-number-format';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

const NumericFormatCustom = React.forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    console.log("test")
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="ریال "
      />
    );
  },
);

export default function FormattedInputs(props) {

  const {setSendBank,SendBank}=props
  const [values, setValues] = React.useState();
  const handleChange = (e) => {
    setValues(e.target.value);
  };
  console.log(values)
  return (
    <>
      
      <TextField
        label="مبلغ پرداختی"
        value={values}
        onChange={handleChange}
        name="numberformat"
        
        slotProps={{
          input: {
            inputComponent: NumericFormatCustom,
          },
        }}
        variant="standard"
      />
    </>
  );
}
