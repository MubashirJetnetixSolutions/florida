export type AppUser = {
  id: string;
  userId: string;
  displayId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  status: 'Active' | 'Inactive';
  joinedOn: string;
  assignedOrders: number;
  completedOrders: number;
  inProgressOrders: number;
  onHoldOrders: number;
  createdOn: string;
  avatar: string;
};

export const USERS: AppUser[] = [
  {
    id: '1',
    userId: '004353',
    displayId: '7OSDF4F8',
    name: 'Autumn Phillips',
    email: 'Daniel_hamilton@aol.com',
    phone: '(215) 424-7763',
    address: '3274 Doe Meadow Drive, Annapolis Junction, MD 20701',
    role: 'Administrator',
    status: 'Active',
    joinedOn: '20-10-2024',
    assignedOrders: 24,
    completedOrders: 3,
    inProgressOrders: 10,
    onHoldOrders: 5,
    createdOn: 'Mar 21, 2025',
    avatar: '/user.png',
  },
  {
    id: '2',
    userId: '003423',
    displayId: '7OSDF4F9',
    name: 'Chris Glasser',
    email: 'Daniel_hamilton@aol.com',
    phone: '(215) 424-7763',
    address: '1949 Linda Street, West Brunswick Twp, PA 19549',
    role: 'Field Tech',
    status: 'Active',
    joinedOn: '12-08-2024',
    assignedOrders: 6,
    completedOrders: 1,
    inProgressOrders: 3,
    onHoldOrders: 2,
    createdOn: 'Mar 18, 2025',
    avatar: '/user.png',
  },
  {
    id: '3',
    userId: '004353',
    displayId: '7OSDF4FA',
    name: 'Autumn Phillips',
    email: 'Daniel_hamilton@aol.com',
    phone: '(215) 424-7763',
    address: '612 Shadowmar Drive, New Orleans, LA 70115',
    role: 'Manager',
    status: 'Active',
    joinedOn: '05-03-2024',
    assignedOrders: 25,
    completedOrders: 7,
    inProgressOrders: 8,
    onHoldOrders: 4,
    createdOn: 'Mar 21, 2025',
    avatar: '/user.png',
  },
  {
    id: '4',
    userId: '004351',
    displayId: '7OSDF4FB',
    name: 'Bradley Lawlor',
    email: 'Daniel_hamilton@aol.com',
    phone: '(215) 424-7763',
    address: '417 Bicetown Road, New York, NY 10016',
    role: 'Field Tech',
    status: 'Active',
    joinedOn: '01-11-2024',
    assignedOrders: 12,
    completedOrders: 5,
    inProgressOrders: 4,
    onHoldOrders: 1,
    createdOn: 'Mar 28, 2025',
    avatar: '/user.png',
  },
  {
    id: '5',
    userId: '003423',
    displayId: '7OSDF4FC',
    name: 'Chris Glasser',
    email: 'Daniel_hamilton@aol.com',
    phone: '(215) 424-7763',
    address: '2614 Sweetwood Drive, Arvada, CO 80002',
    role: 'Administrator',
    status: 'Active',
    joinedOn: '18-09-2024',
    assignedOrders: 35,
    completedOrders: 12,
    inProgressOrders: 15,
    onHoldOrders: 6,
    createdOn: 'Mar 18, 2025',
    avatar: '/user.png',
  },
  {
    id: '6',
    userId: '004350',
    displayId: '7OSDF4FD',
    name: 'Kimberly Mastrangelo',
    email: 'Daniel_hamilton@aol.com',
    phone: '(215) 424-7763',
    address: '4319 Wakefield Street, Philadelphia, PA 19126',
    role: 'Coordinator',
    status: 'Active',
    joinedOn: '22-07-2024',
    assignedOrders: 18,
    completedOrders: 9,
    inProgressOrders: 6,
    onHoldOrders: 3,
    createdOn: 'Mar 30, 2025',
    avatar: '/user.png',
  },
  {
    id: '7',
    userId: '004352',
    displayId: '7OSDF4FE',
    name: 'Dennis Callis',
    email: 'something@gmail.com',
    phone: '231-2324-2324',
    address: '3274 Doe Meadow Drive, Annapolis Junction, MD 20701',
    role: 'Administrator',
    status: 'Active',
    joinedOn: '20-10-2024',
    assignedOrders: 20,
    completedOrders: 20,
    inProgressOrders: 20,
    onHoldOrders: 20,
    createdOn: 'Mar 21, 2025',
    avatar: '/user.png',
  },
];

export function getUser(id: string) {
  return USERS.find((u) => u.id === id) ?? USERS[6];
}
