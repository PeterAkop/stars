import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  wrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  spinner: {
    margin: "auto"
  }
});
