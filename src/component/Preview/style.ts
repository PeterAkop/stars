import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  header: {
    position: "unset"
  },
  toolBar: {
    minHeight: 47
  },
  wrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  closeWrapper: {
    display: "flex",
    alignItems: "center"
  }
});
