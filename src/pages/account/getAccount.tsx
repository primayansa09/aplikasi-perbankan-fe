import { useState, useEffect, } from "react";
import {
    CircularProgress,
    Grid,
    Stack,
    InputLabel,
    Paper,
} from "@mui/material";
import { layoutPrivateStyle } from "../../style/layout/private-route";
import { DataAccountById} from "../../store/store/type";
import { getDataAccountById } from "../../api/dataAccount";
import TableComponent from "../../components/table/tableComponent";
import { useAppSelector } from "../../store/hooks";

export function GetDataAccount() {
    const [dataBind, setDataBind] = useState<DataAccountById | null>(null);
    const [loading, setLoading] = useState(false);

    const id = useAppSelector((state) => state.auth.user?.id);

    const fetchData = async (id: string) => {
        try {
            setLoading(true);

            const response = await getDataAccountById(id);

            if (response.status === 200 && response.data) {
                setDataBind(response.data);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);


    const TableColumn = [
        { field: "fullName", headerName: "Name", align: "center" as const },
        { field: "email", headerName: "Email", align: "center" as const },
        { field: "account", headerName: "No Rekening", align: "center" as const },
        {
            field: "amount", headerName: "Saldo", align: "center" as const,
            render: (row: any) => `Rp ${row.amount?.toLocaleString("id-ID")}`
        },
    ];

    return (
        <Stack
            sx={{
                ...layoutPrivateStyle.fixHeader,
                ...layoutPrivateStyle.backgroundGeneral,
            }}
        >
            <Grid container spacing={2} marginBottom={3}>
                <Grid xs={10.3}>
                    <InputLabel
                        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
                    >
                        Data Rekening
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
                        data={dataBind ? [dataBind] : []}
                        loading={loading}
                    />
                )}
            </Paper>
        </Stack>
    );
}
