import React, { FC, useEffect, useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, AppBar } from "@material-ui/core";
import { Visibility as EyeIcon } from "@material-ui/icons";

import {
  getStars,
  getStarsByPlantesNumber,
  IStarsResponse,
  IStar,
  IPlanet
} from "../../api/transport";
import Table from "../Table";
import { IColumn, IAction, IPage, Data } from "../Table/interfaces";
import Preview from "../../component/Preview";
import { Plantes, General, AlternateNames } from "./component";
import { useStyles } from "./style";

const initPagination = {
  size: 20,
  totalElements: 10,
  totalPages: 10,
  number: 0
};

const formData = (stars: IStar[]): IData[] =>
  stars.map((star: IStar) => ({
    ...star,
    id: star._links.self.href.split("stars/")[1]
  }));

export interface IData extends IStar {
  id: string;
}

const Stars: FC = () => {
  const [data, setData] = useState<IData[] | IPlanet[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState();
  const [pending, setPending] = useState(false);
  const [planetsNumber, setPlanetsNumber] = useState();
  const [pagination, setPagination] = useState<IPage>(initPagination);

  useEffect(() => {
    setPending(true);
    if (planetsNumber) {
      getStarsByPlantesNumber(
        planetsNumber,
        pagination.number,
        pagination.size
      ).then((res: IStarsResponse) => {
        const { data } = res;
        setPagination(data.page);
        setData(formData(data._embedded.stars));
        setPending(false);
      });
    } else {
      getStars(pagination.number, pagination.size).then(
        (res: IStarsResponse) => {
          const { data } = res;
          setPagination(data.page);
          setData(formData(data._embedded.stars));
          setPending(false);
        }
      );
    }
  }, [planetsNumber]);

  const queyStars = useCallback(
    (page: number, oldData: Data[], updateData: (data: Data[]) => void) => {
      setPending(true);
      if (planetsNumber) {
        getStarsByPlantesNumber(
          planetsNumber,
          pagination.number,
          pagination.size
        ).then((res: IStarsResponse) => {
          const { data } = res;
          setPagination(data.page);
          updateData([...oldData, ...formData(data._embedded.stars)]);
          setPending(false);
        });
      } else {
        getStars(page, pagination.size).then((res: IStarsResponse) => {
          const { data } = res;
          setPagination(data.page);
          updateData([...oldData, ...formData(data._embedded.stars)]);
          setPending(false);
        });
      }
    },
    [pagination]
  );

  const columns: IColumn[] = [
    {
      name: "name",
      isFilter: true,
      onFilter: (val: string) => {
        console.log(val, " @@@ filter");
      }
    },
    { name: "distance", additionalInfo: "(ly)" },
    { name: "mass" },
    { name: "age" },
    {
      name: "numberOfPlanets",
      isFilter: true,
      onFilter: (val: string) => {
        setPlanetsNumber(val);
      }
    },
    { name: "radius", additionalInfo: "(km)" },
    { name: "temperature" }
  ];

  const actions: IAction[] = [
    {
      label: "click to view details",
      icon: EyeIcon,
      onAction: (val: string) => {
        setOpenDialog(true);
        setId(val);
      }
    }
  ];
  const handleDialogClose = () => setOpenDialog(false);

  const classes = useStyles();

  const details = useMemo(
    () => (
      <Preview
        open={openDialog}
        handleClose={handleDialogClose}
        content={
          <>
            {id && <General starId={id} />}
            {id && <AlternateNames starId={id} />}
            {id && <Plantes starId={id} />}
          </>
        }
        title={"Star Details"}
      />
    ),
    [id, openDialog]
  );

  return (
    <Card className={classes.card}>
      {details}
      <CardHeader
        className={classes.title}
        title={<AppBar className={classes.header}>Stars</AppBar>}
      />
      <CardContent>
        <Table
          queryData={queyStars}
          pagination={pagination}
          columns={columns}
          data={data}
          actions={actions}
          label={"stars"}
          pending={pending}
        />
      </CardContent>
    </Card>
  );
};

export default Stars;
