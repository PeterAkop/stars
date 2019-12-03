import React, { FC, useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";

import { getStar, IStar, IStarResponse } from "../../../api/transport";
import { stars } from "./simpleCache";
import { useStyles } from "./style";

interface IGeneralProps {
  starId: string;
}

export const General: FC<IGeneralProps> = props => {
  const { starId } = props;
  const [data, setData] = useState<IStar>();

  useEffect(() => {
    const cachedStar = stars.get(starId);
    if (cachedStar) {
      setData(cachedStar);
    } else {
      getStar(starId).then((res: IStarResponse) => {
        const { data } = res;
        stars.set(starId, data);
        setData(data);
      });
    }
  }, [starId]);

  const classes = useStyles();

  const content = useMemo(() => {
    return data
      ? Object.entries(data).map(([key, value]) => {
          if (!key.includes("_")) {
            return (
              <div
                key={`${key}-${value}-general`}
                className={classes.infoWrapper}
              >
                <Typography
                  className={classes.key}
                  key={`${key}-${value}-key`}
                  variant="h6"
                  component="h6"
                >
                  {`${key.charAt(0).toUpperCase() + key.slice(1)} :`}
                </Typography>
                <Typography
                  className={classes.value}
                  key={`${key}-${value}-value`}
                  component="p"
                >
                  {value ? value : "-"}
                </Typography>
              </div>
            );
          }
        })
      : null;
  }, [data]);

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.title} title={"General Info"} />
      <CardContent>
        {data && <div className={classes.wrapper}>{content}</div>}
      </CardContent>
    </Card>
  );
};
