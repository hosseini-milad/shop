import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Divider } from "@mui/material";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import "./style.css";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Confirmation = ({
  open,
  cancelConfirmation,
  title,
  description,
  accepted,
}) => {
  return (
    <Dialog
      open={open}
      onClose={cancelConfirmation}
      TransitionComponent={Transition}
      sx={{ direction: "rtl" }}
    >
      <section className="wrapper-confirmation-dialog persian-font">
        <section className="confirm-title">{title}</section>
        <Divider className="seperator" />
        <section className="confirm-description">{description}</section>
        <section className="confirm-actions">
          <Button
            className="persian-font"
            variant="outlined"
            color="error"
            onClick={cancelConfirmation}
          >
            انصراف
          </Button>
          <Button
            className="persian-font"
            variant="outlined"
            color="success"
            onClick={accepted}
            autoFocus
          >
            تایید
          </Button>
        </section>
      </section>
    </Dialog>
  );
};

export default Confirmation;
