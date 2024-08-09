export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserCookie = {
  id: string;
  name: string;
  email: string;
  token: string;
}

export type Event = {
  id: string;
  name: string;
  date: string;
  time: string;
  userId: string;
}