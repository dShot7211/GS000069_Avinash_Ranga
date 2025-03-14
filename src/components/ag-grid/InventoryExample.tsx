import type { ColDef, SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ExcelExportModule, MasterDetailModule, MultiFilterModule, RowGroupingModule, SetFilterModule } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { type ChangeEvent, type FunctionComponent, useCallback, useMemo, useRef, useState } from 'react';

import styles from './InventoryExample.module.css';

import { ActionsCellRenderer } from './cell-renderers/ActionsCellRenderer';

import AddEditStore from 'pages/store/AddEditStore';
import { CityCellRenderer } from './cell-renderers/CityCellRenderer';
import { useSelector } from 'react-redux';
import { RootState } from 'Store';

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  ExcelExportModule,
  SetFilterModule,
  MultiFilterModule,
  MasterDetailModule,
  RowGroupingModule
]);

interface Props {
  gridTheme?: string;
  isDarkMode?: boolean;
}

export const InventoryExample: FunctionComponent<Props> = ({ gridTheme = 'ag-theme-quartz', isDarkMode }) => {
  const gridRef = useRef<AgGridReact>(null);
  const { stockRowData } = useSelector((store: RootState) => store.product);

  const [colDefs] = useState<ColDef[]>([
    {
      field: 'seqNo',
      headerName: 'S.No',
      rowDrag: true,
      cellRenderer: (params: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="ag-drag-icon"></span>
            <span>{params.value}</span>
          </div>
        );
      }
    },
    { field: 'label', headerName: 'Store', headerClass: 'header-sku' },

    {
      field: 'city',
      headerName: 'City',
      cellRenderer: CityCellRenderer,
      sortable: false
    },
    {
      field: 'state',
      headerName: 'State'
    },

    { field: 'actions', cellRenderer: ActionsCellRenderer, minWidth: 194 }
  ]);
  // console.log('stockRowData', stockRowData);

  const gridOptions = {
    icons: {
      rowDrag: '☰' // FontAwesome icon for row drag
    }
  };

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: false
    }),
    []
  );
  const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy>(
    () => ({
      type: 'fitGridWidth'
    }),
    []
  );
  const themeClass = isDarkMode ? `${gridTheme}-dark` : gridTheme;
  const [quickFilterText, setQuickFilterText] = useState<string>();
  const onFilterTextBoxChanged = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => setQuickFilterText(value), []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.exampleHeader}>
          <div className={styles.inputWrapper}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5014 7.00039C11.5014 7.59133 11.385 8.1765 11.1588 8.72246C10.9327 9.26843 10.6012 9.7645 10.1833 10.1824C9.76548 10.6002 9.2694 10.9317 8.72344 11.1578C8.17747 11.384 7.59231 11.5004 7.00136 11.5004C6.41041 11.5004 5.82525 11.384 5.27929 11.1578C4.73332 10.9317 4.23725 10.6002 3.81938 10.1824C3.40152 9.7645 3.07005 9.26843 2.8439 8.72246C2.61776 8.1765 2.50136 7.59133 2.50136 7.00039C2.50136 5.80691 2.97547 4.66232 3.81938 3.81841C4.6633 2.97449 5.80789 2.50039 7.00136 2.50039C8.19484 2.50039 9.33943 2.97449 10.1833 3.81841C11.0273 4.66232 11.5014 5.80691 11.5014 7.00039ZM10.6814 11.7404C9.47574 12.6764 7.95873 13.1177 6.43916 12.9745C4.91959 12.8314 3.51171 12.1145 2.50211 10.9698C1.49252 9.8251 0.957113 8.33868 1.0049 6.81314C1.05268 5.28759 1.68006 3.83759 2.75932 2.75834C3.83857 1.67908 5.28856 1.0517 6.81411 1.00392C8.33966 0.956136 9.82608 1.49154 10.9708 2.50114C12.1154 3.51073 12.8323 4.91862 12.9755 6.43819C13.1187 7.95775 12.6773 9.47476 11.7414 10.6804L14.5314 13.4704C14.605 13.539 14.6642 13.6218 14.7051 13.7138C14.7461 13.8058 14.7682 13.9052 14.77 14.0059C14.7717 14.1066 14.7532 14.2066 14.7155 14.3C14.6778 14.3934 14.6216 14.4782 14.5504 14.5494C14.4792 14.6206 14.3943 14.6768 14.301 14.7145C14.2076 14.7522 14.1075 14.7708 14.0068 14.769C13.9061 14.7672 13.8068 14.7452 13.7148 14.7042C13.6228 14.6632 13.54 14.6041 13.4714 14.5304L10.6814 11.7404Z"
                fill="currentColor"
              />
            </svg>

            <input type="text" id="filter-text-box" placeholder="Search product..." onInput={onFilterTextBoxChanged} />
          </div>
          <AddEditStore />
        </div>
        <div className={`${themeClass} ${styles.grid}`}>
          <AgGridReact
            theme="legacy"
            ref={gridRef}
            columnDefs={colDefs}
            rowData={stockRowData}
            defaultColDef={defaultColDef}
            rowHeight={50}
            rowDragManaged={true}
            suppressMoveWhenRowDragging={false}
            autoSizeStrategy={autoSizeStrategy}
            masterDetail
            quickFilterText={quickFilterText}
            detailRowAutoHeight
            gridOptions={gridOptions}
          />
        </div>
      </div>
    </div>
  );
};
