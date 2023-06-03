import { PENALTY_SPAN } from "../constants";

export const userActions = [
  {
    handler: 'handleUserEdit',
    name: 'Modify',
    description: 'Edit user data'
  },
  {
    handler: 'handleUserPenalty',
    name: 'Toogle penalty',
    description: `Add/remove penalty: ${PENALTY_SPAN} days`
  },
  {
    handler: 'handleUserDelete',
    name: 'Delete',
    description: 'Delete user data',
  },
];