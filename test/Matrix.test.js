import tape from 'tape';
import Matrix from '../src/Matrix';

tape('L.Matrix', (t) => {
  
  t.ok(L.matrix(1, 0, 0, 1, 0, 0) instanceof L.Matrix, 'factory');
  t.end();
});
