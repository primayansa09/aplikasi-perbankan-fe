import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Grid,
  Stack,
  TextField,
  InputLabel,
  Paper,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { layoutPrivateStyle } from "../../style/layout/private-route";
import { DataInsertPayload } from "../../store/store/type";
import { createAccount } from "../../api/dataAccount";
import ModalAlert from "../../components/modal/modal";
import { z } from "zod";

export const storeSchema = z.object({
  fullName: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .regex(/[A-Z]/, "Password harus mengandung huruf kapital")
    .regex(/[0-9]/, "Password harus mengandung angka")
    .regex(/[^A-Za-z0-9]/, "Password harus mengandung simbol"),
});

export function AddAccount() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [formDataAccount, setFormDataAccount] = useState<DataInsertPayload>({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    password: false
  });

  const handleSubmit = async () => {
    setErrors({ fullName: false, email: false, password: false });

    const result = storeSchema.safeParse(formDataAccount);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === "fullName") fieldErrors.fullName = true;
        if (err.path[0] === "email") fieldErrors.email = true;
        if (err.path[0] === "password") fieldErrors.password = true;
      });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return;
    }

    const dataJson = {
      fullName: formDataAccount.fullName,
      email: formDataAccount.email,
      password: formDataAccount.password,
    };

    try {
      const responseCreate = await createAccount(dataJson);

      if (responseCreate.status === 200) {
        setModalTitle("Success");
        setModalContent("Rekening berhasil dibuat");
      } else {
        setModalTitle("FAILED!!");
        setModalContent("Terjadi kesalahan saat menyimpan data.");
      }

      setOpenModal(true);
    } catch (error) {
      console.error("Error saat menyimpan data:", error);
      setModalTitle("FAILED!!");
      setOpenModal(true);
    }
  };

  useEffect(() => {
    setFormDataAccount({
      fullName: "",
      email: "",
      password: "",
    });
  }, []);

  const clickCancel = () => {
    navigate("/login", { replace: true });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: "100%",
          mx: "auto",
          borderRadius: 3,
          bgcolor: layoutPrivateStyle.backgroundColor,
          boxShadow: "0px 0px 10px rgba(0,0,0,0)",
        }}
      >
        <Stack>
          <InputLabel
            sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
          >
            Add Account
          </InputLabel>
          <Paper style={{ padding: 16 }}>
            <Grid
              container
              style={{ marginTop: "5px" }}
              justifyContent="space-between"
            >
              <Grid direction="column" container xs={5.9}>
                <Grid>
                  <InputLabel
                    sx={{
                      ...layoutPrivateStyle.manageSubTitle,
                    }}
                  >
                    Full Name
                  </InputLabel>
                </Grid>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={formDataAccount.fullName}
                  error={errors.fullName}
                  helperText={
                    errors.fullName ? "Nama tidak boleh kosong" : ""
                  }
                  onChange={(e) =>
                    setFormDataAccount({
                      ...formDataAccount,
                      fullName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid direction="column" container xs={5.9}>
                <Grid>
                  <InputLabel
                    sx={{
                      ...layoutPrivateStyle.manageSubTitle,
                    }}
                  >
                    Email
                  </InputLabel>
                </Grid>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={formDataAccount.email}
                  error={errors.email}
                  helperText={
                    errors.email ? "Email tidak boleh kosong" : ""
                  }
                  onChange={(e) =>
                    setFormDataAccount({
                      ...formDataAccount,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid direction="column" container xs={12} mt={1}>
                <Grid>
                  <InputLabel
                    sx={{
                      ...layoutPrivateStyle.manageSubTitle,
                    }}
                  >
                    Password
                  </InputLabel>
                </Grid>
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formDataAccount.password}
                  onChange={(e) =>
                    setFormDataAccount({
                      ...formDataAccount,
                      password: e.target.value,
                    })
                  }
                  fullWidth
                  size="small"
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? "Password minimal 6 karakter, mengandung kapital, angka, dan simbol"
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              justifyContent={"flex-end"}
              alignItems={"center"}
              mt={2}
            >
              <Grid item xs={6} sm={2}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ ...layoutPrivateStyle.buttonSubmit, width: "100%" }}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ ...layoutPrivateStyle.buttonCancel, width: "100%" }}
                  onClick={clickCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            <ModalAlert
              open={openModal}
              onClose={() => {
                setOpenModal(false);
                if (modalTitle === "Success") navigate("/login");
              }}
              title={modalTitle}
              message={modalContent}
            />
          </Paper>
        </Stack>
      </Paper>
    </Box>
  );
}
