import React, { FC, useState, ChangeEvent, SyntheticEvent } from "react";
import { TableCell, TextField, IconButton, Popover } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

import { useStyles } from "./style";
import { IColumn } from "../interfaces";

interface ICellProps extends IColumn {}

export const Column: FC<ICellProps> = props => {
  const { isFilter, name, onFilter, additionalInfo } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [value, setValue] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onFilter) {
      onFilter(event.target.value);
    }
    setValue(event.target.value);
  };

  const handleCloseFilter = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const classes = useStyles();

  return (
    <>
      {isFilter ? (
        <TableCell>
          <>
            <div className={classes.searchColumn}>
              {additionalInfo ? `${name} ${additionalInfo}` : name}
              <IconButton size={"small"} onClick={handleClick}>
                <SearchIcon />
              </IconButton>
            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseFilter}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            >
              <TextField
                onChange={handleOnChange}
                value={value}
                label={"Text filter..."}
              />
            </Popover>
          </>
        </TableCell>
      ) : (
        <TableCell>
          <div>{additionalInfo ? `${name} ${additionalInfo}` : name}</div>
        </TableCell>
      )}
    </>
  );
};
