import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const data = [
  {
    store: "Nashville Melody Music Store",
    sku: "Rugged Utility Jacket",
    week1: { salesUnits: 200, salesDollars: 8998, gmDollars: 8512, gmPercent: 94.6 },
    week2: { salesUnits: 0, salesDollars: 0, gmDollars: 8512, gmPercent: 94.6 },
  },
  {
    store: "Chicago Charm Boutique",
    sku: "Floral Chiffon Wrap Dress",
    week1: { salesUnits: 200, salesDollars: 29998, gmDollars: 27689, gmPercent: 54.3 },
    week2: { salesUnits: 0, salesDollars: 0, gmDollars: 27689, gmPercent: 54.3 },
  },
];

const getColor = (percent:any) => {
  if (percent >= 50) return "#4CAF50"; // Green
  if (percent >= 30) return "#FF9800"; // Orange
  return "#F44336"; // Red
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "bold",
}));

const PlanningPage = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "16px 0" }}>Data Viewer App</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Store</StyledTableCell>
              <StyledTableCell>SKU</StyledTableCell>
              <StyledTableCell colSpan={4}>Week 01</StyledTableCell>
              <StyledTableCell colSpan={4}>Week 02</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Sales Units</StyledTableCell>
              <StyledTableCell>Sales Dollars</StyledTableCell>
              <StyledTableCell>GM Dollars</StyledTableCell>
              <StyledTableCell>GM Percent</StyledTableCell>
              <StyledTableCell>Sales Units</StyledTableCell>
              <StyledTableCell>Sales Dollars</StyledTableCell>
              <StyledTableCell>GM Dollars</StyledTableCell>
              <StyledTableCell>GM Percent</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.store}</TableCell>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{row.week1.salesUnits}</TableCell>
                <TableCell>${row.week1.salesDollars.toLocaleString()}</TableCell>
                <TableCell>${row.week1.gmDollars.toLocaleString()}</TableCell>
                <TableCell style={{ backgroundColor: getColor(row.week1.gmPercent) }}>
                  {row.week1.gmPercent}%
                </TableCell>
                <TableCell>{row.week2.salesUnits}</TableCell>
                <TableCell>${row.week2.salesDollars.toLocaleString()}</TableCell>
                <TableCell>${row.week2.gmDollars.toLocaleString()}</TableCell>
                <TableCell style={{ backgroundColor: getColor(row.week2.gmPercent) }}>
                  {row.week2.gmPercent}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlanningPage;
