
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { groupSelector, fetchGroups } from './redux/slices/groupSlice';
import { fetchColors } from './redux/slices/colorSlice';
import Table from './components/Table';
import { getTableData } from './utils/DataUtils';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchColors());
  }, [dispatch]);

  const { groups, loading, hasError } = useSelector(groupSelector);

  const data = getTableData(groups);

  return (
    <div className='pure-form'>
      { loading && <label>Loading...</label>}
      { hasError && <label>Error loading data...</label>}
      { !loading && !hasError && <Table title="Group Table" data={data} /> }
    </div>
  );
}

export default App;
