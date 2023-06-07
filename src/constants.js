export const BASE_URL = 'http://localhost:5000';
export const ALLOWED_BORROW_SPAN = 15;
export const ALLOWED_BORROW_BOOKS = 6;
export const PENALTY_SPAN = 30;
export const LIBRARIAN = 'librarian';
export const MEMBER = 'member';
export const COMEDY = 'Comedy';
export const DRAMA = 'Drama';
export const THRILLER = 'Thriller';
export const SCYFY = 'SciFy';
export const ROMANTIC = 'Romantic';
export const XMAS = 'Xmas';
export const FEMALE = 'Female';
export const bookTags = {
  [COMEDY]: {
    style: 'is-info',
  },
  [DRAMA]: {
    style: 'is-warning',
  },
  [THRILLER]: {
    style: 'is-danger',
  },
  [SCYFY]: {
    style: 'is-success',
  },
  [ROMANTIC]: {
    style: 'is-link',
  },
  [XMAS]: {
    style: 'is-danger is-light',
  },
  [FEMALE]: {
    style: 'is-primary is-light',
  },
}