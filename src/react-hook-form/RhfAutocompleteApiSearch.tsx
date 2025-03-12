import { Autocomplete, CircularProgress, IconButton, TextField } from '@mui/material';
import { apiCall } from 'network/apiController';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import useDebounce from 'utils/useDebounce';
import { checkLength } from 'utils/validations';
import { Icon } from '@iconify/react';

type ApiCallParams = {
  searchVal?: string | null;
  prefilledQuery?: any;
};
type DisplayParams = {
  fullOption: any;
  displayKeys: string[];
};

const genQueryObject = ({ prefilledQuery, searchVal }: ApiCallParams) => ({
  ...prefilledQuery,
  ...(searchVal && { search: searchVal })
});

const getTextFieldDisplayValues = ({ fullOption, displayKeys = [] }: DisplayParams) => {
  let displayVal = '';
  if (checkLength(displayKeys)) {
    displayKeys.forEach((item, index) => (displayVal = displayVal + `${fullOption[item]} ${displayKeys.length - 1 !== index ? ',' : ''} `));
  }
  return displayVal === '' ? `${fullOption.id}` : displayVal;
};
//  we will not use apisearchkeys for now
const RhfAutocompleteApiSearch = ({
  apiDataKey = 'results',
  apiEnd,
  prefilledQuery = {},
  name,
  label,
  displayKeys = ['id'],
  needFullObj = false,
  keyNeededFromRes = 'id',
  callApiAtEveryOpen = false,

  sx
}: any) => {
  // console.log('prefilled q', prefilledQuery);

  const { control } = useFormContext();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<any>([]);
  // console.log('options', options);

  const [value, setValue] = useState<any>();
  const debouncedValue = useDebounce(value, 500);

  // we have used this to get the full object for getOptionLable
  const optionsMap = useMemo(() => {
    const map = new Map();
    options.forEach((option: any) => map.set(option[keyNeededFromRes], option));
    return map;
  }, [options, keyNeededFromRes]);

  const getOptions = async ({ searchVal = null }: ApiCallParams) => {
    setOptions([]);
    const theQueryObj = genQueryObject({ prefilledQuery, searchVal });
    const { res, error } = await apiCall({ method: 'get', setLoading, apiEnd: apiEnd, query: theQueryObj });

    if (res) {
      setOptions(res?.data[apiDataKey]);
    }
    if (error) {
      console.log('error in RhfAutocompleteApisearch', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
    if (callApiAtEveryOpen || !checkLength(options)) {
      getOptions({});
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (debouncedValue) {
      getOptions({ searchVal: debouncedValue });
    } else if (!debouncedValue) {
      getOptions({});
    }
    // && checkLength(options)
  }, [debouncedValue]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <Autocomplete
          {...field}
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          options={options}
          loading={loading}
          noOptionsText="No Data Found"
          clearIcon={
            <IconButton onClick={() => getOptions({})}>
              <Icon icon="charm:cross" style={{ width: '18px', height: '18px' }} />
            </IconButton>
          }
          getOptionLabel={(option) => {
            // console.log('the option i n the options label', option);

            // Handle both full object and id scenarios
            // if (typeof option !== 'object') {
            //   getOptions({ [name]: option });
            // }
            const fullOption = typeof option === 'object' ? option : optionsMap.get(option);
            // console.log('the full option', fullOption);

            return fullOption ? getTextFieldDisplayValues({ fullOption, displayKeys }) : '';
          }}
          // isOptionEqualToValue={(option, value) => {
          //   console.log('option', option);
          //   console.log('value', value);

          //   if (Array.isArray(value)) {
          //     return value.some((val) => val[keyNeededFromRes] === option[keyNeededFromRes]);
          //   }
          //   return option[keyNeededFromRes] === value[keyNeededFromRes];
          // }}
          //                                          send    full    value           | value hai toh value.id other wise null
          onChange={(_, value) => (needFullObj ? field.onChange(value) : field.onChange(value ? value[keyNeededFromRes] : null))} // Handle value change
          renderInput={(params) => (
            <TextField
              // autoFocus
              {...params}
              label={label}
              value={value}
              onChange={handleChange}
              sx={{
                height: 40,
                // mx: 1,
                '& .MuiOutlinedInput-root': {
                  padding: '3px 5px'
                },
                ...sx
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
              fullWidth
            />
          )}
          sx={{ minWidth: 300, maxHeight: 40 }}
        />
      )}
    />
  );
};

export default RhfAutocompleteApiSearch;
