import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "contents"
    },
    title: {
      textAlign: "center",
      height: 50
    },
    header: {
      height: 50
    }
  })
);
