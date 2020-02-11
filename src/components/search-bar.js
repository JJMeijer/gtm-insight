import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  searchbox: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  select: {
    width: '25%',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

const inputOptions = {
  GTMID: {
    name: 'GTM ID',
    placeholder: 'GTM-NTQ25T',
    endpoint: '/api/gtm',
    validateValue: value => !!value.match(/^GTM-[0-9A-Z]{4,7}$/),
    validateMessage: 'The ID you provided is not valid. a valid GTM container ID looks like "GTM-XXXXXX"',
  },
  URL: {
    name: 'URL',
    placeholder: 'https://www.digital-power.com',
    endpoint: '/api/www',
    validateValue: value => !!value.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/),
    validateMessage: 'The URL you provided is not valid',
  }
}

export default function SearchBar(props) {
  const [inputType, setInputType] = useState("GTMID")
  const { placeholder } = inputOptions[inputType]

  const handleTypeChange = event => {
    setInputType(event.target.value);
  }

  const classes = useStyles();
  return (
    <Paper component="form" className={classes.searchbox}>
      <Select
          className={classes.select}
          value={inputType}
          onChange={handleTypeChange}
          variant="standard"
      >
        <MenuItem value={"GTMID"}>GTM ID</MenuItem>
        <MenuItem value={"URL"}>URL</MenuItem>
      </Select>
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        className={classes.input}
        placeholder={placeholder}
      />

      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}