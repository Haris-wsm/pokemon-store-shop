import React, { useState } from "react";
import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  List,
  ListItem,
  NativeSelect,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Link from "next/link";

import { validationSchema as constactSchema } from "@/utils/validation/contactForm";

const LabelWrapper = styled(Box)(({ theme }) => ({}));
const LabelField = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
  },
}));
const FormContainer = styled(Box)(({ theme }) => ({}));
const FormWrapper = styled(Box)(({ theme }) => ({
  marginBottom: "1em",
}));

const selecteIssues = [
  "คำถามทั่วไป",
  "ปัญหาการชำระเงิน",
  "ปัญหาออเดอร์",
  "บริการ Support",
];

const ContactUs = () => {
  const [selected, setSelected] = useState(selecteIssues[0]);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setSelected(value);
  };

  const [uploadImages, setUploadImages] = useState([]);

  const handleUpload = (e) => {
    setUploadImages(Array.from(e.target.files));
    e.target.files = null;
  };

  const handelRemoveFile = (index) => {
    uploadImages.splice(index, 1);
    setUploadImages(uploadImages.filter((_, i) => i !== index));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(constactSchema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="pb-10" onSubmit={handleSubmit(onSubmit)}>
      <Box className="container-wrapper">
        <Box className="xs:w-[100%] md:w-4/5 lg:w-4/5 mx-auto px-5 md-px-0">
          <NavbarBreadcrumb />
          <Typography className="text-3xl font-semibold mt-5 mb-2">
            CONTACT FORM
          </Typography>
          <Box className="mb-7">
            <Divider className="relative" />
            <Divider className="absolute bg-black w-[5%]" />
          </Box>

          <FormContainer className="w-[300px] md:w-[700px] mx-auto">
            <FormWrapper>
              <LabelWrapper className="flex gap-2">
                <LabelField>ชื่อ</LabelField>
                <Typography className="text-red-500 text-2xl">*</Typography>
              </LabelWrapper>
              <TextField
                placeholder="Name"
                size="small"
                fullWidth
                {...register("username")}
                error={errors.username}
                helperText={errors.username?.message}
              />
            </FormWrapper>
            <FormWrapper>
              <LabelWrapper className="flex gap-2">
                <LabelField>อีเมล</LabelField>
                <Typography className="text-red-500 text-2xl">*</Typography>
              </LabelWrapper>
              <TextField
                size="small"
                placeholder="Email"
                fullWidth
                {...register("email")}
                error={errors.email}
                helperText={errors.email?.message}
              />
            </FormWrapper>
            <FormWrapper>
              <LabelWrapper className="flex gap-2">
                <LabelField className="mb-2">รูปแบบการส่ง</LabelField>
              </LabelWrapper>
              <NativeSelect
                value={selected}
                onChange={handleSelectChange}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
                fullWidth
                className="my-2"
              >
                {selecteIssues.map((issue, i) => (
                  <option value={issue} key={i}>
                    {issue}
                  </option>
                ))}
              </NativeSelect>
            </FormWrapper>

            <FormWrapper>
              <LabelWrapper className="flex gap-2">
                <LabelField>หัวเรื่อง</LabelField>
                <Typography className="text-red-500 text-2xl">*</Typography>
              </LabelWrapper>
              <TextField
                size="small"
                placeholder="Subject"
                fullWidth
                {...register("title")}
                error={errors.title}
                helperText={errors.title?.message}
              />
            </FormWrapper>
            <FormWrapper>
              <LabelWrapper className="flex gap-2">
                <LabelField>ข้อความ</LabelField>
                <Typography className="text-red-500 text-2xl">*</Typography>
              </LabelWrapper>
              <TextField
                size="small"
                placeholder="Message"
                multiline
                minRows={10}
                maxRows={20}
                fullWidth
                {...register("message")}
                error={errors.message}
                helperText={errors.message?.message}
              />
            </FormWrapper>
            <FormWrapper>
              <Button
                variant="contained"
                size="small"
                component="label"
                startIcon={<AddIcon />}
                className="text-white bg-gray-500 hover:bg-gray-600"
              >
                Select Files
                <input hidden multiple type="file" onChange={handleUpload} />
              </Button>
              <Box>
                <List>
                  {Array.from(uploadImages).map((image, i) => (
                    <ListItem key={i}>
                      <Box className="my-auto">
                        <Tooltip title="Remove">
                          <HighlightOffIcon
                            className="text-md cursor-pointer"
                            onClick={() => handelRemoveFile(i)}
                          />
                        </Tooltip>
                        <Typography className="inline-block ml-5 text-sm min-w-[500px]">
                          {image.name}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </FormWrapper>
            <FormWrapper>
              <FormControl error={true}>
                <FormControlLabel
                  {...register("policy")}
                  onChange={(e) => setAcceptedPolicy(e.target.checked)}
                  control={<Checkbox />}
                  label={
                    <Box className="flex gap-2">
                      <Typography className="text-sm">
                        I agree with the
                      </Typography>
                      <Link
                        href="/privacy-policy"
                        className="underline text-sm text-blue-700 hover:text-blue-900"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </Link>
                      <Typography className="text-sm text-red-500">
                        *
                      </Typography>
                    </Box>
                  }
                />

                <FormHelperText> {errors?.policy?.message}</FormHelperText>
              </FormControl>
            </FormWrapper>
            <FormWrapper className="mb-20">
              <Button
                size="small"
                variant="contained"
                className="text-white bg-gray-500 hover:bg-gray-600"
                fullWidth
                type="submit"
              >
                Send Message
              </Button>
            </FormWrapper>
          </FormContainer>
        </Box>
      </Box>
    </form>
  );
};

export default ContactUs;
