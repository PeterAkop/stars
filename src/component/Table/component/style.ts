import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchColumn: {
      display: "flex"
    },
    contentWrapper: {
      maxHeight: 100,
      minWidth: 100,
      overflow: "scroll"
    }
  })
);
