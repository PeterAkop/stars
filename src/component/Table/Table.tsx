import React, { FC, useEffect, useMemo, useState, ChangeEvent } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TablePagination
} from "@material-ui/core";

import { IColumn, IAction, IPage, Data } from "./interfaces";
import { Column, Row } from "./component";
import Spinner from "../Spinner";
import { useStyles } from "./style";

interface ISimpleTableProps {
  columns: IColumn[];
  queryData?: (
    page: number,
    oldData: Data[],
    updateData: (data: Data[]) => void
  ) => void;
  pagination?: IPage;
  label: string;
  data: Data[];
  actions?: IAction[];
  pending?: boolean;
  pageRows?: number;
  rowsPerPageOptions?: number[];
}

const SimpleTable: FC<ISimpleTableProps> = props => {
  const {
    columns,
    data,
    actions,
    label,
    pagination,
    queryData,
    pending,
    pageRows = 10,
    rowsPerPageOptions = [10, 20, 30]
  } = props;

  const [innerData, setInnerData] = useState<Data[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageRows);

  useEffect(() => setInnerData(data), [data]);

  const tableCoulumns = useMemo(
    () => (
      <TableRow>
        {columns.map((col: IColumn) => (
          <Column
            additionalInfo={col.additionalInfo}
            key={`${col.name}-${label}`}
            name={col.name}
            isFilter={col.isFilter}
            onFilter={col.onFilter}
          />
        ))}
        {actions &&
          actions.map((ac: IAction) => (
            <Column key={`filler-${ac.label}-${label}`} name={""} />
          ))}
      </TableRow>
    ),
    [columns, label, actions]
  );

  const tableRows = useMemo(() => {
    return innerData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((ro: Data, index: number) => (
        <TableRow key={`row-${index}-${label}`}>
          {columns.map((col: IColumn, index: number) => (
            <Row
              key={`cell-${index}-${label}`}
              // @ts-ignore
              value={ro[col.name]}
            />
          ))}
          {actions &&
            actions.map((ac: IAction, index: number) => {
              // @ts-ignore
              const handleAction = () => ac.onAction(ro.id);
              return (
                <Row
                  label={ac.label}
                  key={`action-${index}-${label}`}
                  icon={ac.icon}
                  onAction={handleAction}
                />
              );
            })}
        </TableRow>
      ));
  }, [innerData, columns, actions, label, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    if (
      (newPage + 1) * rowsPerPage > innerData.length &&
      queryData &&
      pagination
    ) {
      queryData(pagination.number + 1, innerData, setInnerData);
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {pending ? (
        <Spinner />
      ) : (
        <>
          <div className={classes.tableWrapper}>
            <Table stickyHeader={true}>
              <TableHead>{tableCoulumns}</TableHead>
              <TableBody>{tableRows}</TableBody>
            </Table>
          </div>
          {pagination && (
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={pagination.totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </>
      )}
    </Paper>
  );
};

export default SimpleTable;
