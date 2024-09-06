'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CandlestickDataPoint {
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface LineChartData {
  labels: string[];
  data: number[];
}

interface BarChartData {
  labels: string[];
  data: number[];
}

interface PieChartData {
  labels: string[];
  data: number[];
}

export default function Dashboard() {
  const [candlestickData, setCandlestickData] = useState<CandlestickDataPoint[]>([]);
  const [lineChartData, setLineChartData] = useState<LineChartData>({ labels: [], data: [] });
  const [barChartData, setBarChartData] = useState<BarChartData>({ labels: [], data: [] });
  const [pieChartData, setPieChartData] = useState<PieChartData>({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [candlestickRes, lineRes, barRes, pieRes] = await Promise.all([
          axios.get<{ data: CandlestickDataPoint[] }>('http://127.0.0.1:8000/api/candlestick-data/'),
          axios.get<LineChartData>('http://127.0.0.1:8000/api/line-chart-data/'),
          axios.get<BarChartData>('http://127.0.0.1:8000/api/bar-chart-data/'),
          axios.get<PieChartData>('http://127.0.0.1:8000/api/pie-chart-data/'),
        ]);

        // Log the API responses
        console.log('data');
        console.log('Candlestick Data:', candlestickRes.data);
        console.log('Line Chart Data:', lineRes.data);
        console.log('Bar Chart Data:', barRes.data);
        console.log('Pie Chart Data:', pieRes.data);

        // Set state with API data
        setCandlestickData(candlestickRes.data.data);
        setLineChartData(lineRes.data);
        setBarChartData(barRes.data);
        setPieChartData(pieRes.data);

      } catch (err) {
        console.error('API Fetch Error:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const candlestickSeries = [{
    data: candlestickData.map(item => ({
      x: new Date(item.x),
      y: [item.open, item.high, item.low, item.close],
    })),
  }];

  const candlestickOptions = {
    chart: { type: 'candlestick' },
    xaxis: { type: 'datetime' },
    yaxis: { tooltip: { enabled: true } },
  };

  const lineChartFormattedData = lineChartData.labels.map((label, index) => ({
    label,
    value: lineChartData.data[index],
  }));

  const barChartFormattedData = barChartData.labels.map((label, index) => ({
    label,
    value: barChartData.data[index],
  }));

  const pieChartFormattedData = pieChartData.labels.map((label, index) => ({
    name: label,
    value: pieChartData.data[index],
  }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      <p style={{ fontSize: 'x-large', fontWeight: 'bold' }}>Dashboard</p>
      </div>
      <div style={{ fontSize: 'medium', fontWeight: 'bold' , display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {/* Line Chart */}
        <div style={{ marginTop:"3rem",marginBottom: "3rem"}}>
          <h2>Line Chart</h2>
          <br></br>
          <ResponsiveContainer width={400} height={300}>
            <LineChart data={lineChartFormattedData}>
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={{ marginTop:"3rem",marginBottom: "3rem"}}>
          <h2>Bar Chart</h2>
          <br></br>
          <ResponsiveContainer width={400} height={300}>
            <BarChart data={barChartFormattedData}>
              <Bar dataKey="value" fill="#82ca9d" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div>
          <h2>Pie Chart</h2>
          <br></br>
          <ResponsiveContainer width={400} height={300}>
            <PieChart>
              <Pie
                data={pieChartFormattedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Candlestick Chart */}
        <div>
          <h2>Candlestick Chart</h2>
          <br></br>
          <ApexChart
            options={candlestickOptions}
            series={candlestickSeries}
            type="candlestick"
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>


  );
}
