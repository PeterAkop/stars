import React, { FC, useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";

import {
  getAlternateNames,
  IAlternateNamesResponse,
  IAlternateName
} from "../../../api/transport";
import { alternateNames } from "./simpleCache";
import { useStyles } from "./style";

interface IAlternateNamesProps {
  starId: string;
}

export const AlternateNames: FC<IAlternateNamesProps> = props => {
  const { starId } = props;
  const [data, setData] = useState<IAlternateName[]>([]);

  useEffect(() => {
    const cachedNames = alternateNames.get(starId);
    if (cachedNames) {
      setData(cachedNames);
    } else {
      getAlternateNames(starId).then((res: IAlternateNamesResponse) => {
        const { data } = res;
        alternateNames.set(starId, data._embedded.alternateNames);
        setData(data._embedded.alternateNames);
      });
    }
  }, [starId]);

  const classes = useStyles();

  const content = useMemo(
    () =>
      data.map((an: IAlternateName) => (
        <Typography key={an.name}>{an.name}</Typography>
      )),
    [data]
  );

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.title} title={"Alternate Names"} />
      <CardContent>
        <div className={classes.wrapper}>{content}</div>
      </CardContent>
    </Card>
  );
};
