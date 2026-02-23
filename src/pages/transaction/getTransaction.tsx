import React, { useState, useEffect, } from "react";
import {
    CircularProgress,
    Grid,
    Stack,
    InputLabel,
    Paper,
    Typography
} from "@mui/material";
import { layoutPrivateStyle } from "../../style/layout/private-route";
import { DataTransactionById } from "../../store/store/type";
import { getDataTransactionById } from "../../api/dataTransaction";
import TableComponent from "../../components/table/tableComponent";
import { useAppSelector } from "../../store/hooks";

export function GetTransaction() {
    const [dataBind, setDataBind] = useState<DataTransactionById[]>([]);
    const [loading, setLoading] = useState(false);

    const id = useAppSelector((state) => state.auth.user?.accountId);

    console.log("Id", id)


    const fetchData = async (id: string) => {
        try {
            setLoading(true);

            const response = await getDataTransactionById(id);

            setDataBind(response.data ?? []);
            console.log('DATA', response.data)

        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id && id !== "") {
            fetchData(id);
        }
    }, [id]);

    const TableColumn = [
        {
            field: "transactionType", headerName: "Type", align: "center" as const, render: (row: any) => (
                <Typography
                    sx={{
                        backgroundColor:
                            row.transactionType === 0
                                ? "rgba(0, 0, 255, 0.1)"
                                : "rgba(0, 128, 0, 0.1)",
                        color:
                            row.transactionType === 0
                                ? "blue"
                                : "green",
                        borderRadius: "8px",
                        px: 1,
                        py: 0.5,
                        padding: "4px 12px",
                        fontSize: "0.9rem",
                        display: "inline-block",
                    }}
                >
                    {row.transactionType === 0
                        ? "Debit"
                        : row.transactionType === 1
                            ? "Credit"
                            : "-"}
                </Typography>
            ),
        },
        {
            field: "transactionStatus", headerName: "Status", align: "center" as const, render: (row: any) => {
                const status = Number(row.transactionStatus);

                let label = "-";
                let bgColor = "rgba(0,0,0,0.05)";
                let textColor = "gray";

                if (status === 0) {
                    label = "Pending";
                    bgColor = "rgba(255, 165, 0, 0.1)";
                    textColor = "orange";
                } else if (status === 1) {
                    label = "Success";
                    bgColor = "rgba(0, 128, 0, 0.1)";
                    textColor = "green";
                } else if (status === 2) {
                    label = "Failed";
                    bgColor = "rgba(255, 0, 0, 0.1)";
                    textColor = "red";
                }

                return (
                    <Typography
                        sx={{
                            backgroundColor: bgColor,
                            color: textColor,
                            borderRadius: "8px",
                            px: 1,
                            py: 0.5,
                            padding: "4px 12px",
                            fontSize: "0.9rem",
                            display: "inline-block",
                            fontWeight: 500,
                        }}
                    >
                        {label}
                    </Typography>
                );
            },
        },
        {
            field: "createdAt", headerName: "Tanggal", align: "center" as const, render: (row: any) => {
                if (!row.createdAt) return "-";

                const date = new Date(row.createdAt);

                const formatted = date.toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                });

                return formatted.replace(/\./g, ":");
            },
        },
        {
            field: "destinationAccount", headerName: "No Rekening", align: "center" as const,
        },
        {
            field: "amount", headerName: "Jumlah", align: "center" as const,
            renderCell: (row: any) => `Rp ${row.amount?.toLocaleString("id-ID")}`
        },
        { field: "description", headerName: "Deskripsi", align: "center" as const },
    ];

    return (
        <Stack sx={{
            ...layoutPrivateStyle.fixHeader,
            ...layoutPrivateStyle.backgroundColor,
        }}>
            <Grid container marginBottom={3}>
                <Grid xs={10.3}>
                    <InputLabel
                        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
                    >
                        History Transaksi
                    </InputLabel>
                </Grid>
            </Grid>
            <Paper sx={layoutPrivateStyle.backgroundCard}>

                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 10,
                        }}
                    >
                        <CircularProgress color="warning" />
                    </div>
                ) : (
                    <TableComponent
                        columns={TableColumn}
                        data={dataBind}
                        loading={loading}
                    />
                )}
            </Paper>
        </Stack>
    );
}
