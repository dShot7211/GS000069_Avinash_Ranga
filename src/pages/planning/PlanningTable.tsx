import { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Box } from '@mui/material';
import { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { SALESDATA, SKU, STORES } from 'utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'Store';

const generateCalendarColumns = () => {
  const columns: any = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  months.forEach((month, monthIndex) => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    columns.push({
      headerName: month,
      marryChildren: true,
      sortable: true, // ✅ Ensure sorting is enabled at the parent level
      children: weeks.map((week, weekIndex) => {
        const weekNum = monthIndex * 4 + weekIndex + 1;
        const weekKey = `W${weekNum.toString().padStart(2, '0')}`;

        return {
          headerName: week,
          sortable: true, // ✅ Ensure sorting is enabled at the week level
          children: [
            {
              headerName: 'Sales Units',
              field: `${weekKey}_salesUnits`,
              editable: true,
              type: 'numericColumn',
              sortable: true // ✅ Sorting enabled
            },
            {
              headerName: 'Sales Dollars',
              field: `${weekKey}_salesDollars`,
              sortable: true, // ✅ Sorting enabled
              valueFormatter: (params: any) => `$${params.value.toFixed(2)}`
            },
            {
              headerName: 'GM Dollars',
              field: `${weekKey}_gmDollars`,
              sortable: true, // ✅ Sorting enabled
              valueFormatter: (params: any) => `$${params.value.toFixed(2)}`
            },
            {
              headerName: 'GM %',
              field: `${weekKey}_gmPercent`,
              sortable: true, // ✅ Sorting enabled
              valueFormatter: (params: any) => `${params.value.toFixed(2)}%`,
              cellStyle: (params: any) => {
                const value = params.value;
                if (value >= 40) return { backgroundColor: 'green', color: 'white' };
                if (value >= 10) return { backgroundColor: 'yellow' };
                if (value > 5) return { backgroundColor: 'orange' };
                return { backgroundColor: 'red', color: 'white' };
              }
            }
          ]
        };
      })
    });
  });

  return columns;
};

type Store = {
  seqNo: number;
  id: string;
  label: string;
  city: string;
  state: string;
};

type SKU = {
  id: string;
  label: string;
  price: number;
  cost: number;
};

type PlanningEntry = {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
};

export const transformDataForAGGrid = (stores: Store[], skus: SKU[], planning: PlanningEntry[]) => {
  const planningMap: Record<string, Record<string, Record<string, { salesUnits: number }>>> = {};

  planning.forEach(({ store, sku, week, salesUnits }) => {
    if (!planningMap[store]) planningMap[store] = {};
    if (!planningMap[store][sku]) planningMap[store][sku] = {};
    planningMap[store][sku][week] = { salesUnits };
  });

  return stores.flatMap((store) =>
    skus.map((sku) => {
      const row: Record<string, any> = {
        store: store.label,
        sku: sku.label,
        price: sku.price,
        cost: sku.cost
      };

      for (let w = 1; w <= 52; w++) {
        const weekKey = `W${w.toString().padStart(2, '0')}`;
        const salesUnits = planningMap[store.id]?.[sku.id]?.[weekKey]?.salesUnits || 0;
        const salesDollars = salesUnits * sku.price;
        6669;
        const gmDollars = salesDollars - salesUnits * sku.cost;
        5609;
        const gmPercent = salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;

        // Flatten structure for AG Grid
        row[`${weekKey}_salesUnits`] = salesUnits;
        row[`${weekKey}_salesDollars`] = salesDollars;
        row[`${weekKey}_gmDollars`] = gmDollars;
        row[`${weekKey}_gmPercent`] = gmPercent;
      }

      return row;
    })
  );
};

const PlanningTable = () => {
  // const [rowData, setRowData] = useState(transformDataForAGGrid(STORES, SKU, SALESDATA));
  const { planningRowData } = useSelector((store: RootState) => store.product);
  // console.log('rowdat', rowData);

  const columnDefs = useMemo<(ColDef<any, any> | ColGroupDef<any>)[]>(() => {
    const baseColumns: ColDef<any, any>[] = [
      { headerName: 'Store', field: 'store', pinned: 'left', width: 180 },
      { headerName: 'SKU', field: 'sku', pinned: 'left', width: 180 },
      ...generateCalendarColumns()
    ];

    return [...baseColumns];
  }, []);
  return (
    <Box className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        theme="legacy"
        masterDetail
        rowHeight={50}
        rowData={planningRowData}
        detailRowAutoHeight
        columnDefs={columnDefs}
        defaultColDef={{
          resizable: true,
          unSortIcon: true,
          sortable: true
        }}
      />
    </Box>
  );
};

export default PlanningTable;
