import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AsyncSelect from 'react-select/async';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

import UsersRepository from 'repositories/UsersRepository';
import UserPresenter from 'presenters/UserPresenter';

import useStyles from './useStyles';

const LOAD_OPTIONS_SORT = 'first_name ASC';

function UserSelect({ error, label, isClearable, isDisabled, isRequired, onChange, value, helperText }) {
  const [isFocused, setFocus] = useState(false);
  const styles = useStyles();
  const handleLoadOptions = (inputValue) =>
    UsersRepository.index({
      q: {
        firstNameOrLastNameCont: inputValue,
        typeMatches: 'Developer',
        s: LOAD_OPTIONS_SORT,
      },
      page: 1,
      per: 99,
    }).then(({ data }) => data.items);

  return (
    <FormControl margin="dense" disabled={isDisabled} focused={isFocused} error={error} required={isRequired}>
      <InputLabel shrink>{label}</InputLabel>
      <div className={styles.select}>
        <AsyncSelect
          cacheOptions
          loadOptions={handleLoadOptions}
          defaultOptions
          getOptionLabel={(user) => UserPresenter.fullName(user)}
          getOptionValue={(user) => user.id}
          isDisabled={isDisabled}
          isClearable={isClearable}
          defaultValue={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      </div>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

UserSelect.defaultProps = {
  error: false,
  isClearable: false,
  isDisabled: false,
  value: undefined,
  helperText: '',
};

UserSelect.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape(),
  helperText: PropTypes.string,
};

export default UserSelect;
