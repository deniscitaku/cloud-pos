import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import {makeStyles} from "@material-ui/core";
import {resolveField} from "../../services/utils";

const useStyles = makeStyles(() => ({
    root: {
        fontSize: '0.6rem',
        padding: 1
    }
}));

export default function BasicTable({data, columns}) {

    const classes = useStyles();

    return (
        <TableContainer style={{
            marginTop: "2.4em"
        }}>
            <Table aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        {columns.map(x => (
                            <TableCell className={classes.root} align={x.align ? x.align : "left"}>{x.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.title}>
                            {columns.map(col => (
                                <TableCell className={classes.root} component="th" scope="row"
                                           align={col.align ? col.align : "left"}>
                                    {resolveField(row, col.field)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}