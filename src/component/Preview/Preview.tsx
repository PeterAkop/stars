import React, { FC, ReactNode, forwardRef } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  Slide
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { TransitionProps } from "@material-ui/core/transitions";

import { useStyles } from "./style";

interface IPreviewProps {
  content: ReactNode;
  handleClose: () => void;
  open: boolean;
  title: string;
}

const Transition = forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const Preview: FC<IPreviewProps> = props => {
  const { content, handleClose, open, title } = props;

  const classes = useStyles();
  return (
    <Dialog fullScreen={true} open={open} TransitionComponent={Transition}>
      <AppBar className={classes.header}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.wrapper}>
            <Typography variant="h6">{title}</Typography>
            <div className={classes.closeWrapper}>
              <Typography variant="h6">Close preview</Typography>
              <IconButton edge="end" color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {content}
    </Dialog>
  );
};
export default Preview;
