export type JobType = 'Service' | 'Installation';
export type Status = 'Completed' | 'In progress' | 'On Hold';

export type WorkOrder = {
  id: string;
  orderNumber: string;
  clientName: string;
  email: string;
  phone: string;
  jobLocation: string;
  jobLocationShort: string;
  scheduledOn: string;
  orderDate: string;
  completionDate: string;
  assignedTo: string;
  jobType: JobType;
  status: Status;
  lotNumber: string;
  inventory: string;
  description: string;
};

export const WORK_ORDERS: WorkOrder[] = [
  {
    id: '1',
    orderNumber: '004353',
    clientName: 'Autumn Phillips',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '612 Shadowmar Drive, New Orleans, LA 70115',
    jobLocationShort: '612 Shadowmar Drive, New Orleans,\nLA 70115',
    scheduledOn: 'Mar 21, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    assignedTo: 'Dennis Callis',
    jobType: 'Service',
    status: 'Completed',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
  },
  {
    id: '2',
    orderNumber: '003423',
    clientName: 'Chris Glasser',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '1949 Linda Street, West Brunswick Twp, PA 19549',
    jobLocationShort: '1949 Linda Street, West Brunswick Twp,\nPA 19549',
    scheduledOn: 'Mar 18, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    assignedTo: 'Joshua Jones',
    jobType: 'Installation',
    status: 'In progress',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
  },
  {
    id: '3',
    orderNumber: '004350',
    clientName: 'Kimberly Mastrangelo',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '4319 Wakefield Street, Philadelphia, PA 19126',
    jobLocationShort: '4319 Wakefield Street, Philadelphia,\nPA 19126',
    scheduledOn: 'Mar 30, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    assignedTo: 'Lorri Warf',
    jobType: 'Service',
    status: 'On Hold',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
  },
  {
    id: '4',
    orderNumber: '004351',
    clientName: 'Bradley Lawlor',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '417 Linden Road, Bronx, NY 10469',
    jobLocationShort: '417 Linden Road, Bronx,\nNY 10469',
    scheduledOn: 'Mar 23, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    assignedTo: 'Kathy Pacheco',
    jobType: 'Installation',
    status: 'In progress',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
  },
  {
    id: '5',
    orderNumber: '004360',
    clientName: 'Olivia Gleeson',
    email: 'yourmai1123@gmail.com',
    phone: '+123 456 789 00',
    jobLocation: '2168 Linden Street, West Brunswick Twp, PA 19547',
    jobLocationShort: '2168 Linden Street, West Brunswick Twp,\nPA 19547',
    scheduledOn: 'Mar 25, 2025',
    orderDate: '16-Jan-2026',
    completionDate: '20-Jan-2026',
    assignedTo: 'Joshua Jones',
    jobType: 'Service',
    status: 'Completed',
    lotNumber: '#70SDF4F8',
    inventory: '#56821',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
  },
];

export function getWorkOrder(id: string) {
  return WORK_ORDERS.find((o) => o.id === id) ?? WORK_ORDERS[0];
}
