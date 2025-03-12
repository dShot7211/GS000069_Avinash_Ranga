import type { CustomCellRendererProps } from 'ag-grid-react';
import { type FunctionComponent } from 'react';

import styles from './ActionsCellRenderer.module.css';
import CommonDeleteDialog from 'components/commons/CommonDeleteDialog';
import AddEditStore from 'pages/store/AddEditStore';
import { deleteFromStore } from 'redux/productSlice';

export const ActionsCellRenderer: FunctionComponent<CustomCellRendererProps> = ({ api, node }) => {
  // console.log('api', api);
  // console.log('node', node?.data);

  return (
    <div className={styles.buttonCell}>
      <CommonDeleteDialog delFunc={deleteFromStore} id={node?.data?.id} />
      <AddEditStore edit row={node?.data} />
    </div>
  );
};
