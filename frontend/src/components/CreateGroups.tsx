import { DoneOutlineRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const CreateGroups = () => {
  return (
    <div className="cg-container">
      <div className="cg-box">
        <input placeholder="Enter name of the group" />
        <IconButton>
          <DoneOutlineRounded />
        </IconButton>
      </div>
    </div>
  );
};
export default CreateGroups;
