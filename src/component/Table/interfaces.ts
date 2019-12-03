import { ComponentType } from "react";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

import { IPlanet, IStar } from "../../api/transport";

export interface IColumn {
  additionalInfo?: string;
  name: string;
  isFilter?: boolean;
  onFilter?: (val: string) => void;
}

export interface IRow {
  label?: string;
  value?: string;
  onAction?: () => void;
  icon?: ComponentType<SvgIconProps>;
}

export interface IAction {
  label?: string;
  onAction: (val: string) => void;
  icon: ComponentType<SvgIconProps>;
}

export interface IPage {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export type Data = IPlanet | IStar;
