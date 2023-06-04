import Table from '../components/layout/Table';
import { useLibrary } from '../library/Library';

const headers = [
  { name: 'Title' },
  { name: 'Author', abbr: 'Aut' },
  { name: 'Genre', abbr: 'Gnr'},
  { name: 'Availability', abbr: 'Av'},
];

export default function Books() {
  const [state] = useLibrary();
  const { books } = state;

  return(
    <>
      <h2 className='title is-4'>Booooks list</h2>
      <Table list={books} headers={headers} />
    </>
  );
}