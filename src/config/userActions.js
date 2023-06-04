import { PENALTY_SPAN, LIBRARIAN } from "../constants";

const userActions = [
  {
    handler: 'handleUserEdit',
    name: 'Modify',
    description: 'Edit user data',
  },
  {
    handler: 'handleUserPenalty',
    name: 'Toogle penalty',
    description: `Add/Remove penalty: ${PENALTY_SPAN} days`,
    unableOn: LIBRARIAN,
  },
  {
    handler: 'handleUserDelete',
    name: 'Delete',
    description: 'Delete user data',
    unableOn: LIBRARIAN,
  },
];

export const getUserActions = ({ type }) => userActions.filter(({ unableOn }) => unableOn !== type);