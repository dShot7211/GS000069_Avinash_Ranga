import type { CustomCellRendererProps } from 'ag-grid-react';
import { type FunctionComponent } from 'react';

import styles from '../../components/ag-grid/cell-renderers/ActionsCellRenderer.module.css';
import { deleteFromSKU } from 'redux/productSlice';
import CommonDeleteDialog from 'components/commons/CommonDeleteDialog';
import AddEditSKU from './AddEditSKU';

export const SKUActionRenderer: FunctionComponent<CustomCellRendererProps> = ({ api, node }) => {
  // console.log('api', api);
  // console.log('node', node?.data);

  return (
    <div className={styles.buttonCell}>
      <CommonDeleteDialog delFunc={deleteFromSKU} id={node?.data?.id} />
      <AddEditSKU edit row={node?.data} />
    </div>
  );
};
