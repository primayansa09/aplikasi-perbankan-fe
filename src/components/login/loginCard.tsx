import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Grid
} from "@mui/material";
import { layoutPrivateStyle } from "../../style/layout/private-route";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Link } from "react-router-dom";

interface LoginCardProps {
  email: string;
  password: string;
  errors: { email?: string; password?: string };
  error?: string | null;
  loading?: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({
  email,
  password,
  errors,
  error,
  loading = false,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        width: 360,
        mx: "auto",
        borderRadius: 3,
        bgcolor: layoutPrivateStyle.backgroundColor,
        boxShadow: "0px 0px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        mb={3}
        fontWeight={600}
        color="black"
      >
        Login
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} mb={1}>
          <TextField
            label="Email"
            name="Email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            fullWidth
            size="small"
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            fullWidth
            size="small"
            error={Boolean(errors.password)}
            helperText={errors.password}
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

        {error && (
          <Grid xs={12}>
            <Typography color="error" textAlign="center" variant="body2">
              {error}
            </Typography>
          </Grid>
        )}

        <Grid xs={12} display='flex' justifyContent="center" mt={3} mb={5}>
          <Button
            variant="contained"
            fullWidth
            onClick={onSubmit}
            disabled={loading}
            sx={{
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: layoutPrivateStyle.buttonSubmit,
            }}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </Grid>
      </Grid>
      <Typography
        component={Link}
        to="/add-account"
        sx={{
          cursor: "pointer",
          textDecoration: "none",
          color: "black",
          fontSize: 14,
          textAlign: "center"
        }}
      >
        Create Akun ?
      </Typography>
    </Paper>
  );
};

export default LoginCard;
