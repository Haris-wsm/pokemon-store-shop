import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";

const Subscribe = () => {
  const [value, setValue] = React.useState("subscribe");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Typography className="text-md xs:text-xs sm:text-sm">
        MAILING LIST
      </Typography>
      <form className="w-full  mt-2">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <input
              type="email"
              required
              className="outline-none border-2 border-gray-500 px-2 py-3 rounded-md bg-inherit mt-2 text-white w-full text-md"
              placeholder="กรอกอีเมล"
            />
            <Typography className="text-gray-500 text-sm max-w-[200px] break-words mt-2 mx-2">
              We'll never share your email with anyone else.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              className="w-[80px] py-3 bg-background-light text-white "
              variant="contained"
              size="small"
            >
              ยืนยัน
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <FormControl className="mt-3">
            <RadioGroup
              row
              aria-labelledby="subscribe-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={value}
              className="text-md xs:text-xs sm:text-sm"
              onChange={handleChange}
            >
              <FormControlLabel
                value="subscribe"
                control={<Radio />}
                label="Subscribe"
              />
              <FormControlLabel
                value="unsubscribe"
                control={<Radio />}
                label="Unsubscribe"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </form>
    </>
  );
};

export default Subscribe;
