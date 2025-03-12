import { Card, Grid, MenuItem, TextField } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { RootState } from 'Store';
import { STORES } from 'utils/constants';

const MixedChart = () => {
  const { planningRowData } = useSelector((store: RootState) => store.product);
  const [selectedStore, setSelectedStore] = useState<string>(STORES[0].label);
  // const [storeData, setStoreData] = useState<{
  //   labels: string[];
  //   series: any[];
  // }>({ labels: [], series: [] });

  const [state, setState] = useState<{
    series: { name: string; type: 'line' | 'column'; data: number[] }[];
    options: ApexOptions;
  }>({ series: [], options: {} });
  // console.log('stored', storeData);

  const transformDataForStore = (storeName: string) => {
    const filteredData = planningRowData.filter((item: any) => item.store === storeName);

    const weeks = Array.from({ length: 52 }, (_, i) => `W${(i + 1).toString().padStart(2, '0')}`);

    const gmDollarsData = weeks.map((week) =>
      parseFloat(filteredData.reduce((sum: any, item: any) => sum + (item[`${week}_gmDollars`] || 0), 0).toFixed(2))
    );
    const gmPercentData = weeks.map((week) =>
      parseFloat(filteredData.reduce((sum: any, item: any) => sum + (item[`${week}_gmPercent`] || 0), 0).toFixed(2))
    );

    return {
      labels: weeks, // Use weeks as labels
      series: [
        { name: 'GM Dollars', type: 'column', data: gmDollarsData },
        { name: 'GM Percent', type: 'line', data: gmPercentData }
      ]
    };
  };

  useEffect(() => {
    if (selectedStore !== '') {
      const { labels, series } = transformDataForStore(selectedStore);
      console.log('labels', labels);
      console.log('series', series);

      // setStoreData({ labels, series });

      setState({
        series: series,
        options: {
          chart: {
            height: 600,
            type: 'line'
          },
          stroke: {
            width: [0, 4]
          },
          title: {
            text: 'Gross Margin',
            style: {
              fontSize: '18px',
              fontWeight: 800
            }
          },
          dataLabels: {
            enabled: false,
            enabledOnSeries: [1]
          },
          labels: labels,
          yaxis: [
            {
              title: {
                text: 'GM Dollars'
              },
              labels: {
                formatter: (value) => `$ ${value.toFixed(2)}`
              }
            },
            {
              opposite: true,
              title: {
                text: 'GM Percent'
              },
              labels: {
                formatter: (value) => `${value.toFixed(2)}%`
              }
            }
          ]
        }
      });
    }
  }, [selectedStore]);

  // console.log(labels);
  // console.log(series);

  return (
    <Grid container>
      <Grid xs={12} md={12} sx={{ p: 2 }}>
        <Card sx={{ p: 2 }}>
          <TextField
            select
            fullWidth
            label="Select Store"
            sx={{ maxWidth: '400px', mt: 2, mb: 4 }}
            value={selectedStore}
            onChange={(e: any) => {
              setSelectedStore(e.target.value);
            }}
          >
            {STORES.map((item: any, index: number) => {
              return (
                <MenuItem key={index} value={item.label}>
                  {item.label}
                </MenuItem>
              );
            })}
          </TextField>
          <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="line" height={600} />
          </div>
          <div id="html-dist"></div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MixedChart;
