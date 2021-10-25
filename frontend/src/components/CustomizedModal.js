import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CustomizedCard from "./CustomizedCard";
import CustomizedButtons from "./CustomizedButtons";
import { Grid } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
};
export default function TransitionsModal({
  modalType,
  isCourseModalOpened,
  handleCloseCourseModal,
  isStudentModalOpened,
  handleCloseStudentModal,
}) {
  return (
    <>
      {modalType == "course" ? (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isCourseModalOpened}
        onClose={handleCloseCourseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isCourseModalOpened}>
          <CustomizedCard sx={modalStyle}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "600", textAlign: "center" }}
                >
                  Are you sure you’d like to delete this course?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  id="transition-modal-description"
                  variant="h7"
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  All associated student and assignment data will be removed.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div style={{ padding: "10px" }}></div>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item xs={3}>
                  <CustomizedButtons type2 height1 onClick={handleCloseCourseModal}>
                    Cancel
                  </CustomizedButtons>
                </Grid>
                <Grid item xs={3}>
                  <CustomizedButtons type1 height1>
                    Delete
                  </CustomizedButtons>
                </Grid>
              </Grid>
            </Grid>
          </CustomizedCard>
        </Fade>
      </Modal>
      ) : (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isStudentModalOpened}
        onClose={handleCloseStudentModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isStudentModalOpened}>
          <CustomizedCard sx={modalStyle}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "600", textAlign: "center" }}
                >
                  Are you sure you’d like to delete this user?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  id="transition-modal-description"
                  variant="h7"
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  User first/last name. Course they’ll be removed from
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div style={{ padding: "10px" }}></div>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item xs={3}>
                  <CustomizedButtons type2 height1 onClick={handleCloseStudentModal}>
                    Cancel
                  </CustomizedButtons>
                </Grid>
                <Grid item xs={3}>
                  <CustomizedButtons type1 height1>
                    Delete
                  </CustomizedButtons>
                </Grid>
              </Grid>
            </Grid>
          </CustomizedCard>
        </Fade>
      </Modal>
      )}
    </>
  );
}
