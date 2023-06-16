export default function Dropdown({ actions, handlers }) {
  return (
    <div className='dropdown-menu' id='dropdown-menu' role='menu'>
      <div className='dropdown-content py-0'>
        <div className='list has-overflow-ellipsis' style={{ width: '240px' }}>
          {actions.map((action, i) => <div className='list-item'key={i + '-' + action.handler} >
            <div className='list-item-content' onClick={() => handlers[action.handler](action.params)}>
              <div className='list-item-title'>{action.name}</div>
              <div className='list-item-description'>{action.description}</div>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
}