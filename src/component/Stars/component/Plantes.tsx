import React, { FC, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";

import {
  getStarsPlanet,
  IPlanetResponse,
  IPlanet
} from "../../../api/transport";
import Table from "../../Table";
import { planets } from "./simpleCache";
import { IColumn } from "../../Table/interfaces";
import { useStyles } from "./style";

interface IPlantesProps {
  starId: string;
}

export const Plantes: FC<IPlantesProps> = props => {
  const { starId } = props;
  const [data, setData] = useState<IPlanet[]>([]);

  useEffect(() => {
    const cachedPlanet = planets.get(starId);
    if (cachedPlanet) {
      setData(cachedPlanet);
    } else {
      getStarsPlanet(starId).then((res: IPlanetResponse) => {
        const { data } = res;
        planets.set(starId, data._embedded.planets);
        setData(data._embedded.planets);
      });
    }
  }, [starId]);

  const columns: IColumn[] = [
    { name: "name" },
    { name: "distance" },
    { name: "mass" },
    { name: "age" },
    { name: "temperature" },
    { name: "discoveryMethod" },
    { name: "description" },
    { name: "radius", additionalInfo: "(km)" },
    { name: "discoveryDate" }
  ];

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.title} title={"Plantes"} />
      <CardContent>
        <Table columns={columns} data={data} label={"plantes"} />
      </CardContent>
    </Card>
  );
};
