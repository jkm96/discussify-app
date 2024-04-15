const userTableColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'EMAIL', uid: 'email', sortable: true },
  { name: 'USERNAME', uid: 'username', sortable: true },
  { name: 'IS ACTIVE', uid: 'isActive', sortable: true },
  { name: 'IS SUBSCRIBED', uid: 'isSubscribed', sortable: true },
  { name: 'IS EMAIL VERIFIED', uid: 'isEmailVerified', sortable: true },
  { name: 'CREATED AT', uid: 'createdAt', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];
const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'InActive', uid: 'inactive' },
  { name: 'Confirmed', uid: 'confirmed' },
  { name: 'UnConfirmed', uid: 'unconfirmed' },
];

export { userTableColumns, statusOptions };

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}