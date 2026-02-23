import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import {
  Button,
  Grid,
  Stack,
  TextField,
  InputLabel,
  Paper,
} from "@mui/material";
import { layoutPrivateStyle } from "../../style/layout/private-route";
import { DataTransactionPayload } from "../../store/store/type";
import { createTransaction } from "../../api/dataTransaction";
import ModalAlert from "../../components/modal/modal";
import { z } from "zod";
import { useAppSelector } from "../../store/hooks";

const storeSchema = z.object({
  sourceAccount: z.string().min(1, "No Rekening tidak boleh kosong").max(13),
  destinationAccount: z.string().min(1, "No Rekening tidak boleh kosong").max(13),
  amount: z.string().min(1, "Jumlah Uang tidak boleh kosong"),
  description: z.string().min(1, "deskripsi tidak boleh kosong")
});

export function Transfer() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const sourceAccount = useAppSelector((state) => state.auth.user?.account);
  console.log('account', sourceAccount)

  const [formDataTransaction, setFormDataTransaction] = useState<DataTransactionPayload>({
    sourceAccount: "",
    destinationAccount: "",
    amount: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    sourceAccount: false,
    destinationAccount: false,
    amount: false,
    description: false,
  });

  const [errorAmount, setErrorAmount] = useState({
    amount: "",
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ sourceAccount: false, destinationAccount: false, amount: false, description: false });

    const result = storeSchema.safeParse(formDataTransaction);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err: any) => {
        if (err.path[0] === "sourceAccount") fieldErrors.sourceAccount = true;
        if (err.path[0] === "destinationAccount") fieldErrors.destinationAccount = true;
        if (err.path[0] === "amount") fieldErrors.amount = true;
        if (err.path[0] == "description") fieldErrors.description = true;
      });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return;
    }

    const dataJson = {
      sourceAccount: formDataTransaction.sourceAccount,
      destinationAccount: formDataTransaction.destinationAccount,
      amount: convertToNumber(formDataTransaction.amount),
      description: formDataTransaction.description
    };

    console.log("Data dikirim:", dataJson.amount);

    try {
      const responseCreate = await createTransaction(dataJson);

      if (responseCreate.status === 200) {
        setModalTitle("Success");
        setModalContent("Dana berhasil di transfer");

        setFormDataTransaction({
          sourceAccount: formDataTransaction.sourceAccount,
          destinationAccount: "",
          amount: "",
          description: ""
        });

      } else {
        setModalTitle("FAILED!!");
        setModalContent("Terjadi kesalahan saat mengirim data.");
      }

      setOpenModal(true);
    } catch (error) {
      console.error("Error saat mengirim data:", error);
      setModalTitle("FAILED!!");
      setOpenModal(true);
    }
  };

  useEffect(() => {
    setFormDataTransaction({
      sourceAccount: "",
      destinationAccount: "",
      amount: "",
      description: ""
    });
  }, []);

  useEffect(() => {
    if (sourceAccount) {
      setFormDataTransaction((prev) => ({
        ...prev,
        sourceAccount: sourceAccount
      }));
    }
  }, [sourceAccount])

  const validateAmount = (value: any) => {
    if (!value) return "Jumlah uang tidak boleh kosong";

    const regex = /^(\d{1,3}(\.\d{3})*|\d+)(\,\d{0,2})?$/;

    if (!regex.test(value)) {
      return "Format uang tidak valid (contoh: 1.000,50)";
    }

    return "";
  };

  const convertToNumber = (value: any) => {
    return parseFloat(
      value.replace(/\./g, "").replace(",", ".")
    );
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Transfer
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
                No Rekening
                <span style={{ color: "red" }}>*</span>
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDataTransaction.sourceAccount}
              helperText={errors.sourceAccount ? "Nomor Rekening harus 10–13 digit" : ""}
              FormHelperTextProps={{
                sx: { color: "red" },
              }}
              InputProps={{
                readOnly: true
              }}
              onChange={(e) =>
                setFormDataTransaction({
                  ...formDataTransaction,
                  sourceAccount: e.target.value
                })
              }
            />
          </Grid>
          <Grid direction="column" container xs={6}>
            <Grid>
              <InputLabel
                sx={{
                  ...layoutPrivateStyle.manageSubTitle,
                }}
              >
                No Rekening Tujuan
                <span style={{ color: "red" }}>*</span>
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDataTransaction.destinationAccount}
              helperText={errors.destinationAccount ? "Nomor Rekening harus 10–13 digit" : ""}
              FormHelperTextProps={{
                sx: { color: "red" },
              }}
              onChange={(e) => {
                const value = e.target.value;

                // Hanya izinkan angka (0–9)
                if (/^\d*$/.test(value)) {
                  // Batasi maksimal 13 digit
                  if (value.length <= 13) {
                    setFormDataTransaction({
                      ...formDataTransaction,
                      destinationAccount: value,
                    });

                    // Validasi: panjang harus antara 10–13 digit
                    if (value.length >= 10 && value.length <= 13) {
                      setErrors((prev) => ({ ...prev, destinationAccount: false }));
                    } else {
                      setErrors((prev) => ({ ...prev, destinationAccount: true }));
                    }
                  }
                }
              }}
            />
          </Grid>
          <Grid direction="column" container xs={12} mt={1}>
            <Grid>
              <InputLabel
                sx={{
                  ...layoutPrivateStyle.manageSubTitle,
                }}
              >
                Jumlah Uang
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDataTransaction.amount}
              error={errors.amount}
              helperText={errors.amount || ""}
              inputProps={{ inputMode: "decimal" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    RP
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                const value = e.target.value;

                setFormDataTransaction({
                  ...formDataTransaction,
                  amount: value,
                });
                const errorMessage = validateAmount(value);

                setErrorAmount((prev) => ({
                  ...prev,
                  amount: errorMessage,
                }));
              }}
            />
          </Grid>
          <Grid direction="column" container xs={12} mt={1}>
            <Grid>
              <InputLabel
                sx={{
                  ...layoutPrivateStyle.manageSubTitle,
                }}
              >
                Deskripsi
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "600px" }}
              multiline
              rows={10}
              InputProps={{
                sx: {
                  height: 200,
                  padding: "0 8px",
                  alignItems: "flex-start",
                },
              }}
              value={formDataTransaction.description}
              onChange={(e) =>
                setFormDataTransaction({
                  ...formDataTransaction,
                  description: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent={"flex-end"}
          alignItems={"center"}
          marginTop={2}
        >
          <Grid xs={1}>
            <Button
              variant="contained"
              sx={{ ...layoutPrivateStyle.buttonSubmit, width: "100%" }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <ModalAlert
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            if (modalTitle === "Success") navigate("/menu/transfer");
          }}
          title={modalTitle}
          message={modalContent}
        />
      </Paper>
    </Stack>
  );
}
