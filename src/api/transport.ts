import axios from "axios";

const transport = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000
});

export interface IPlanet {
  name: string;
  radius: number;
  age: number;
  temperature: number;
  mass: number;
  discoveryMethod: string;
  description: string;
  discoveryDate: string;
  _links: {
    self: { href: string };
    star: { href: string };
    planet: { href: string };
  };
}

export interface IAlternateName {
  name: string;
  _links: {
    self: { href: string };
    star: { href: string };
    alternateName: { href: string; templated: boolean };
  };
}

export interface IStar {
  name: string;
  radius: number;
  age: number;
  temperature: number;
  mass: number;
  distance: number;
  numberOfPlanets: number;
  _links: {
    self: { href: string };
    star: { href: string };
    planets: { href: string };
    additionalNames: { href: string };
  };
}

export interface IPage {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface IStarsResponse {
  data: {
    _embedded: {
      stars: IStar[];
    };
    _links: {
      first: { href: string };
      self: { href: string };
      next: { href: string };
      last: { href: string };
      profile: { href: string };
      search: { href: string };
    };
    page: IPage;
  };
}

export interface IPlanetResponse {
  data: {
    _embedded: {
      planets: IPlanet[];
    };
    _links: {
      self: { href: string };
    };
  };
}

export interface IAlternateNamesResponse {
  data: {
    _embedded: {
      alternateNames: IAlternateName[];
    };
    _links: {
      self: { href: string };
    };
  };
}
export interface IStarResponse {
  data: IStar
}

export const getStars = (page: number, size: number): Promise<IStarsResponse> =>
  transport.get(`/stars?page=${page}&size=${size}`);
export const getStarsByPlantesNumber = (
  plantesNumber: number,
  page: number,
  size: number
): Promise<IStarsResponse> =>
  transport.get(
    `/stars/search/findByNumberOfPlanetsGreaterThan?numberOfPlanets=${plantesNumber}&page=${page}&size=${size}`
  );
export const getStar = (id: string): Promise<IStarResponse> =>
  transport.get(`/stars/${id}`);
export const getStarsPlanet = (id: string): Promise<IPlanetResponse> =>
  transport.get(`/stars/${id}/planets`);
export const getAlternateNames = (
  id: string
): Promise<IAlternateNamesResponse> =>
  transport.get(`/stars/${id}/additionalNames`);
