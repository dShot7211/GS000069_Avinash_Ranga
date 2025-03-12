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
    displayKeys.forEach((item, index) => (displayVal = displayVal + `${fullOption[item]}${displayKeys.length - 1 !== index ? ',' : ''} `));
  }
  return displayVal === '' ? `${fullOption.id}` : displayVal;
};

const RhfAutocompleteApiSearchMultiselect = ({
  apiDataKey = 'results',
  apiEnd,
  prefilledQuery = {},
  name,
  label,
  displayKeys = ['id'],
  // needFullObj = false,
  keyNeededFromRes = 'id',
  sx
}: any) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<any>([]);
  const [value, setValue] = useState<any>([]);
  const debouncedValue = useDebounce(value, 500);

  const optionsMap = useMemo(() => {
    const map = new Map();
    options.forEach((option: any) => map.set(option[keyNeededFromRes], option));
    return map;
  }, [options, keyNeededFromRes]);

  const getOptions = async ({ searchVal = null }: ApiCallParams) => {
    const theQueryObj = genQueryObject({ prefilledQuery, searchVal });
    const { res, error } = await apiCall({
      method: 'get',
      setLoading,
      apiEnd: apiEnd,
      query: theQueryObj
    });

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
    if (!checkLength(options)) {
      getOptions({});
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (debouncedValue) {
      getOptions({ searchVal: debouncedValue });
    } else if (debouncedValue === '' && checkLength(options)) {
      getOptions({});
    }
  }, [debouncedValue]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple
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
            const fullOption = typeof option === 'object' ? option : optionsMap.get(option);
            return fullOption ? getTextFieldDisplayValues({ fullOption, displayKeys }) : '';
          }}
          isOptionEqualToValue={(option, value) => {
            if (Array.isArray(value)) {
              return value.some((val) => val[keyNeededFromRes] === option[keyNeededFromRes]);
            }
            return option[keyNeededFromRes] === value[keyNeededFromRes];
          }}
          onChange={(_, selectedValues) => {
            // const mappedValues = needFullObj
            //   ? selectedValues
            //   : selectedValues.map((value) => value[keyNeededFromRes]);
            field.onChange(selectedValues);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              value={value}
              onChange={handleChange}
              sx={{
                height: 40,
                mx: 1,
                ml: 0,
                '& .MuiOutlinedInput-root': {
                  padding: '8px 5px'
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

export default RhfAutocompleteApiSearchMultiselect;
