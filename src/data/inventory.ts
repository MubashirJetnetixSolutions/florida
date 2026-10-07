export type InventoryItem = {
  id: string;
  itemId: string;
  itemName: string;
  lotNumber: string;
  quantity: number;
};

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: '1',
    itemId: '20796',
    itemName: 'Casement Window',
    lotNumber: 'EO-0058',
    quantity: 65,
  },
  {
    id: '2',
    itemId: '3398',
    itemName: 'Sliding Window',
    lotNumber: 'EO-0054',
    quantity: 90,
  },
  {
    id: '3',
    itemId: '4339',
    itemName: 'Double-Hung Window',
    lotNumber: 'EO-0053',
    quantity: 45,
  },
  {
    id: '4',
    itemId: '5120',
    itemName: 'Single-Hung Window',
    lotNumber: 'EO-0052',
    quantity: 38,
  },
  {
    id: '5',
    itemId: '6281',
    itemName: 'Awning Window',
    lotNumber: 'EO-0051',
    quantity: 52,
  },
  {
    id: '6',
    itemId: '7412',
    itemName: 'Fixed / Picture Window',
    lotNumber: 'EO-0050',
    quantity: 70,
  },
  {
    id: '7',
    itemId: '8590',
    itemName: 'Bay Window',
    lotNumber: 'EO-0049',
    quantity: 28,
  },
  {
    id: '8',
    itemId: '9633',
    itemName: 'Bow Window',
    lotNumber: 'EO-0048',
    quantity: 22,
  },
  {
    id: '9',
    itemId: '10744',
    itemName: 'Tilt & Turn Window',
    lotNumber: 'EO-0047',
    quantity: 41,
  },
  {
    id: '10',
    itemId: '11855',
    itemName: 'Louvered Window',
    lotNumber: 'EO-0046',
    quantity: 33,
  },
];
