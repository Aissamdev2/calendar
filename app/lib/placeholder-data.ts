import { SUBJECTS_COLORS, SUBJECTS_BG_COLORS, SUBJECTS_BORDER_COLORS  } from "./utils";

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    year: '1',
    role: 'user',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'Admin',
    year: '1',
    role: 'admin',
    email: 'admin@nextmail.com',
    password: '123456',
  },
];

const events = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User event',
    description: 'This is the description for the user event',
    subject: 1,
    date: '2024-12-6',
    time: '10:00:00',
    userId: '410544b2-4001-4271-9855-fec4b6a6442a',
    subjectId: '410544b2-4001-4271-9855-fec4b6a6442c',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'Admin event',
    description: 'This is the description for the admin event',
    subject: 1,
    date: '2024-12-6',
    time: '10:00:00',
    userId: '410544b2-4001-4271-9855-fec4b6a6442b',
    subjectId: '410544b2-4001-4271-9855-fec4b6a6442d',
  },
];

const subjects = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442c',
    name: 'Other',
    color: '#ff0000',
    bgColor: '#330000',
    borderColor: '#aa0000',
    userId: '410544b2-4001-4271-9855-fec4b6a6442a',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442d',
    name: 'Other',
    color: '#ff0000',
    bgColor: '#330000',
    borderColor: '#aa0000',
    userId: '410544b2-4001-4271-9855-fec4b6a6442b',
  }
]

export { users, events, subjects }