export type Client = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  activeOrders: number;
  completedOrders: number;
  createdOn: string;
};

export const CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Autumn Phillips',
    address: '3274 Doe Meadow Drive, Annapolis Junction, MD 20701',
    email: 'Daniel_hamilton@aol.com',
    phone: '(917) 339-6416',
    activeOrders: 4,
    completedOrders: 12,
    createdOn: 'Mar 21, 2025',
  },
  {
    id: '2',
    name: 'Chris Glasser',
    address: '1949 Linda Street, West Brunswick Twp, PA 19549',
    email: 'Daniel_hamilton@aol.com',
    phone: '(917) 339-6416',
    activeOrders: 2,
    completedOrders: 8,
    createdOn: 'Mar 18, 2025',
  },
  {
    id: '3',
    name: 'Bradley Lawlor',
    address: '417 Bicetown Road, New York, NY 10016',
    email: 'Daniel_hamilton@aol.com',
    phone: '(917) 339-6416',
    activeOrders: 6,
    completedOrders: 15,
    createdOn: 'Mar 28, 2025',
  },
  {
    id: '4',
    name: 'Kimberly Mastrangelo',
    address: '4319 Wakefield Street, Philadelphia, PA 19126',
    email: 'Daniel_hamilton@aol.com',
    phone: '(917) 339-6416',
    activeOrders: 1,
    completedOrders: 22,
    createdOn: 'Mar 30, 2025',
  },
  {
    id: '5',
    name: 'Joshua Jones',
    address: '2614 Sweetwood Drive, Arvada, CO 80002',
    email: 'Daniel_hamilton@aol.com',
    phone: '(917) 339-6416',
    activeOrders: 3,
    completedOrders: 9,
    createdOn: 'Mar 25, 2025',
  },
  {
    id: '6',
    name: 'Dennis Callis',
    address: '612 Shadowmar Drive, New Orleans, LA 70115',
    email: 'something@gmail.com',
    phone: '(215) 424-7763',
    activeOrders: 5,
    completedOrders: 18,
    createdOn: 'Mar 21, 2025',
  },
  {
    id: '7',
    name: 'Lorri Warf',
    address: '889 Oak Ridge Lane, Tampa, FL 33602',
    email: 'lorri.warf@email.com',
    phone: '(813) 555-0142',
    activeOrders: 0,
    completedOrders: 31,
    createdOn: 'Mar 18, 2025',
  },
];

export function getClient(id: string) {
  return CLIENTS.find((c) => c.id === id) ?? CLIENTS[0];
}
