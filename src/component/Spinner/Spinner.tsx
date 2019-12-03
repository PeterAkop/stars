import React, { FC } from "react";
import { CircularProgress } from "@material-ui/core";

import { useStyles } from "./style";

interface ISpinnerProps {
  size?: number | string;
}

const Spinner: FC<ISpinnerProps> = props => {
  const { size = 100 } = props;
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <CircularProgress className={classes.spinner} size={size} />
    </div>
  );
};

export default Spinner;
