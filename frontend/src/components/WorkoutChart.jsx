import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const WorkoutChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/stats/')
            .then(response => {
                const data = response.data.workout_counts_by_date;
                const labels = data.map(item => item.date);
                const counts = data.map(item => item.count);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: '日別トレーニング回数',
                            data: counts,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                });
            })
            .catch(error => console.error('データ取得エラー:', error));
    }, []);

    if (!chartData) return <p>Loading...</p>;

    return <Bar data={chartData} />;
};

export default WorkoutChart;