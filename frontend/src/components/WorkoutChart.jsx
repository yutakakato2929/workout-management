import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

Chart.register(...registerables); // Chart.js の必要なモジュールを登録

const WorkoutChart = () => {
    const [chartData, setChartData] = useState(null);
    const [chartKey, setChartKey] = useState(0); // チャート更新用のキー

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/stats/')
            .then(response => {
                if (!response.data || !response.data.workout_counts_by_date) {
                    console.error('無効なデータ形式:', response.data);
                    return;
                }

                const data = response.data.workout_counts_by_date;
                if (data.length === 0) {
                    console.warn('データがありません');
                    setChartData(null);
                    return;
                }

                const labels = data.map(item => item.date);
                const counts = data.map(item => item.count);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: '日別トレーニング回数',
                            data: counts,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                // チャートを強制的にリフレッシュするために key を更新
                setChartKey(prevKey => prevKey + 1);
            })
            .catch(error => console.error('データ取得エラー:', error));
    }, []);

    return (
        <div>
            {chartData ? (
                <Bar key={chartKey} data={chartData} />
            ) : (
                <p>データがありません</p>
            )}
        </div>
    );
};

export default WorkoutChart;