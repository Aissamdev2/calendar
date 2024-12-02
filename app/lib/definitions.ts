export type User = {
  id: string;
  name: string;
  year: string;
  role: string;
  email: string;
  password: string;
};

export type UserCookie = {
  id: string;
  token: string;
}

export type Event = {
  id: string;
  name: string;
  description?: string;
  date: string;
  time?: string;
  userId: string;
  subjectid: string;
}

export type Subject = {
  id: string;
  name: string;
  color: string;
  bordercolor: string;
  bgcolor: string;
  userId: string;
}

export type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
}

export type VerifySession = {
  error: string | null;
  session: UserCookie | null;
}