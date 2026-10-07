import type { JobType, Status } from '@/data/workOrders';

export type ArchivedOrder = {
  id: string;
  orderNumber: string;
  clientName: string;
  email: string;
  phone: string;
  jobLocation: string;
  jobLocationShort: string;
  jobType: JobType;
  status: Status;
  assignedTo: string;
  archivedOn: string;
  completedOn: string;
  orderDate: string;
  completionDate: string;
  lotNumber: string;
  inventory: string;
  description: string;
};

export const ARCHIVED_ORDERS: ArchivedOrder[] = [
  {
    id: '1',
    orderNumber: '004353',
    clientName: 'Autumn Phillips',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '612 Shadowmar Drive, New Orleans, LA 70115',
    jobLocationShort: '612 Shadowmar Drive, New Orleans,\nLA 70115',
    jobType: 'Service',
    status: 'Completed',
    assignedTo: 'Dennis Callis',
    archivedOn: 'Mar 21, 2025',
    completedOn: 'Mar 21, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  },
  {
    id: '2',
    orderNumber: '003423',
    clientName: 'Chris Glasser',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '1949 Linda Street, West Brunswick Twp, PA 19549',
    jobLocationShort: '1949 Linda Street, West Brunswick Twp,\nPA 19549',
    jobType: 'Installation',
    status: 'Completed',
    assignedTo: 'Joshua Jones',
    archivedOn: 'Mar 18, 2025',
    completedOn: 'Mar 21, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  },
  {
    id: '3',
    orderNumber: '004353',
    clientName: 'Autumn Phillips',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '612 Shadowmar Drive, New Orleans, LA 70115',
    jobLocationShort: '612 Shadowmar Drive, New Orleans,\nLA 70115',
    jobType: 'Service',
    status: 'On Hold',
    assignedTo: 'Imran khan',
    archivedOn: 'Mar 21, 2025',
    completedOn: 'Mar 21, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  },
  {
    id: '4',
    orderNumber: '004351',
    clientName: 'Bradley Lawlor',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '417 Bicetown Road, New York, NY 10016',
    jobLocationShort: '417 Bicetown Road, New York,\nNY 10016',
    jobType: 'Installation',
    status: 'In progress',
    assignedTo: 'Mohsin',
    archivedOn: 'Mar 28, 2025',
    completedOn: 'Mar 21, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  },
  {
    id: '5',
    orderNumber: '003423',
    clientName: 'Chris Glasser',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '1949 Linda Street, West Brunswick Twp, PA 19549',
    jobLocationShort: '1949 Linda Street, West Brunswick Twp,\nPA 19549',
    jobType: 'Installation',
    status: 'Completed',
    assignedTo: 'Joshua Jones',
    archivedOn: 'Mar 18, 2025',
    completedOn: 'Mar 21, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  },
  {
    id: '6',
    orderNumber: '004350',
    clientName: 'Kimberly Mastrangelo',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '4319 Wakefield Street, Philadelphia, PA 19126',
    jobLocationShort: '4319 Wakefield Street, Philadelphia,\nPA 19126',
    jobType: 'Service',
    status: 'Completed',
    assignedTo: 'Lorri Warf',
    archivedOn: 'Mar 30, 2025',
    completedOn: 'Mar 21, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  },
  {
    id: '7',
    orderNumber: '004352',
    clientName: 'Joshua Jones',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '2614 Sweetwood Drive, Arvada, CO 80002',
    jobLocationShort: '2614 Sweetwood Drive, Arvada,\nCO 80002',
    jobType: 'Service',
    status: 'On Hold',
    assignedTo: 'Kathy Pacheco',
    archivedOn: 'Mar 25, 2025',
    completedOn: 'Mar 21, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  },
];

export function getArchivedOrder(id: string) {
  return ARCHIVED_ORDERS.find((o) => o.id === id) ?? ARCHIVED_ORDERS[0];
}
