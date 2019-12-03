import React, { FC } from "react";
import { TableCell, IconButton, Tooltip } from "@material-ui/core";

import { IRow } from "../interfaces";
import { useStyles } from "./style";

interface IRowProps extends IRow {}

export const Row: FC<IRow> = props => {
  const {
    value,
    onAction,
    icon: Icon,
    label = "click to execute action"
  } = props;

  const classes = useStyles();
  return (
    <>
      {onAction && Icon ? (
        <TableCell>
          <Tooltip title={label}>
            <span>
              <IconButton onClick={onAction}>
                <Icon />
              </IconButton>
            </span>
          </Tooltip>
        </TableCell>
      ) : (
        <TableCell>
          <div className={classes.contentWrapper}>{value ? value : "-"}</div>
        </TableCell>
      )}
    </>
  );
};
