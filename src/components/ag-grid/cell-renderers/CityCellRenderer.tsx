import type { CustomCellRendererProps } from 'ag-grid-react';
import { type FunctionComponent } from 'react';

import styles from './StockCellRenderer.module.css';

export const CityCellRenderer: FunctionComponent<CustomCellRendererProps> = ({ data: { city } }) => {
  return (
    <div className={styles.stock}>
      <span className={styles.stockText}>{city}</span>{' '}
    </div>
  );
};
