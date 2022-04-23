import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
  table: {
    borderRadius: 12,
  },
  head: {
    backgroundColor: theme.palette.common.red,
  },
  body: {
    fontSize: 14,
    fontWeight: 500,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

// function createData(orderid, date, services, amount) {
//   return { orderid, date, services, amount };
// }

const rows = [
  {
    orderid: "29271",
    date: "02 February, 2020 - 05:30",
    services: "Wash + Blowdry + Nail Polish + Threading",
    amount: "Rs. 1500",
  },
  {
    orderid: "29223",
    date: "02 February, 2020 - 05:30",
    services: "Party Makeup, Eyelashes, Nail Paint, with Blowdry",
    amount: "Rs. 4000",
  },
  {
    orderid: "29230",
    date: "02 February, 2020 - 05:30",
    services: "Bridal Makeup & Hairstyle (Dupatta and Jewellry Set...",
    amount: "Rs. 23530",
  },
  {
    orderid: "29220",
    date: "02 February, 2020 - 05:30",
    services: "60 min scrub + 60 min massage",
    amount: "Rs. 3100",
  },
  {
    orderid: "29196",
    date: "02 February, 2020 - 05:30",
    services: "Janssen Whitening Facial with Polisher , Eyebrows...",
    amount: "Rs. 3700",
  },
  {
    orderid: "29180",
    date: "02 February, 2020 - 05:30",
    services: "Face Polisher , Face Polisher + Cleanser",
    amount: "Rs. 2900",
  },
  {
    orderid: "29163",
    date: "02 February, 2020 - 05:30",
    services: "Classic Manicure , Classic Mani Pedi.",
    amount: "Rs. 3950",
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    borderRadius: 12,
    marginTop: 18,
  },
});
export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <section className="schedule-history">
      <div className="container">
        <TableContainer>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Order ID</StyledTableCell>
                <StyledTableCell>Date & Time</StyledTableCell>
                <StyledTableCell>Services</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>{row.orderid}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>{row.services}</StyledTableCell>
                  <StyledTableCell>{row.amount}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
}
