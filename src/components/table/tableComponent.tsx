import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface TableColumn {
  field: string;
  headerName: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: any) => React.ReactNode; // custom renderer per kolom
}

interface TableComponentProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  loading = false,
}) => {
  return (
    <TableContainer sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 720 }} size="small" aria-label="dynamic table">
        {/* HEAD */}
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                align={col.align ?? "left"}
                sx={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                Loading data...
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((row, idx) => (
              <TableRow key={idx} sx={{ "&:last-child td": { border: 0 } }}>
                {columns.map((col) => (
                  <TableCell key={col.field} align={col.align ?? "left"}>
                    {col.render ? col.render(row) : row[col.field] ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                No Data Available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;