import * as React from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const NumericFormatCustom = React.forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

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

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormattedInputs(props) {
  const [values, setValues] = React.useState({
    
    numberformat: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    props.setSendBank(prevState => ({
      ...prevState,
      payValue:event.target.value
    }))
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="formatted-text-mask-input">مبلغ پرداختی</InputLabel>
      <Input
        label="react-number-format"
        value={values.numberformat}
        onChange={handleChange}
        name="numberformat"
        id="formatted-text-mask-input"
        inputComponent={NumericFormatCustom}
        
      />
    </FormControl>
  );
}
