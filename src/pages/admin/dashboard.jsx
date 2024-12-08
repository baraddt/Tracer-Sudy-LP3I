import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';

// Register all required elements
ChartJS.register(BarElement, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function Dashboard() {

  const chartData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    // labels: ['2019'],
    datasets: [
      {
        type: 'bar',
        data: [159, 140, 160, 130, 180, 165],
        // data: [159],

        backgroundColor: 'rgba(0, 191, 165, 0.6)',
        borderRadius: 5,
        barPercentage: 0.2,
        label: 'Jumlah Lulusan',
      },
      {
        type: 'line',
        data: [79, 60, 35, 45, 60, 76],
        // data: [79],
        backgroundColor: '#00426D',
        borderColor: '#00426D',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        label: 'Selaras',
      },
      {
        type: 'line',
        data: [20, 23, 25, 30, 40, 30],
        // data: [20],
        backgroundColor: '#E80000',
        borderColor: '#E80000',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        label: 'Tidak Selaras',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 300,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true, // Mengubah label menjadi bulat
          pointStyle: 'circle', // Menentukan bentuk menjadi bulat
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 200,
        ticks: {
          stepSize: 40,
        },
      },
    },
  };

  const [dataValues, setDataValues] = useState(() => {
    const selaras = chartData.datasets[1].data.reduce((a, b) => a + b, 0);
    const tidakSelaras = chartData.datasets[2].data.reduce((a, b) => a + b, 0);
    const jumlahLulusan = selaras + tidakSelaras;

    return { selaras, tidakSelaras, jumlah: jumlahLulusan };
  });

  const donugsData = {
    labels: [
      'Administrasi Bisnis',
      'Hubungan Masyarakat',
      'Kompetensi Akuntansi',
      'Manajemen Informatika',
      'Administrasi Bisnis Internasional',
      'Bisnis Digital',
      'Logistik Negara'
    ],
    datasets: [
      {
        data: [20, 15, 25, 5, 10, 12, 15],
        backgroundColor: [
          '#00c49f',  // Administrasi Bisnis
          '#4f4fbc',  // Hubungan Masyarakat
          '#005f7f',  // Kompetensi Akuntansi
          '#ffc000',  // Manajemen Informatika
          '#ff6361',  // Administrasi Bisnis Internasional
          '#c2c2c2',  // Bisnis Digital
          '#3b3b3b'   // Logistik Negara
        ],
        hoverBackgroundColor: [
          '#00c49f',
          '#4f4fbc',
          '#005f7f',
          '#ffc000',
          '#ff6361',
          '#c2c2c2',
          '#3b3b3b'
        ],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    cutout: '70%', // untuk membuat donat dengan lubang di tengah
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          paddingRight: 12,
          usePointStyle: true, // Mengubah label menjadi bulat
          pointStyle: 'circle', // Menentukan bentuk menjadi bulat
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="container-fluid pt-4 pb-4 ps-5 pe-5 mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        {/* Wrapper for all cards with gap */}
        <div className="d-flex flex-wrap gap-4 justify-content-between">
          {/* Card Welcome Super Admin */}
          <div className="card col-md-3 d-flex align-items-center shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="text-start">
                <span>Welcome,</span>
                <h5>Admin</h5>
              </div>
              <img src="/vektor.png" alt="Profile" width="80" className="rounded" />
            </div>
          </div>

          {/* Card Total Responden */}
          <div className="card col-md-2 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0">100</p>
                <h6 className="mb-0" style={{ fontSize: '14px' }}>Responden</h6>
              </div>
            </div>
          </div>

          {/* Card Bekerja */}
          <div className="card col-md-2 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-briefcase display-6 me-3"></i>
              <div className="text-start">
                <h6 className="mb-0" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0">45</p>
                <h6 className="mb-0" style={{ fontSize: '14px' }}>Bekerja</h6>
              </div>
            </div>
          </div>

          {/* Card Wiraswasta */}
          <div className="card col-md-2 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-workspace display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0">45</p>
                <h6 className="mb-0" style={{ fontSize: '14px' }}>Wiraswasta</h6>
              </div>
            </div>
          </div>

          {/* Card Mencari Kerja */}
          <div className="card col-md-2 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-plus display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0">10</p>
                <h6 className="mb-0" style={{ fontSize: '14px' }}>Mencari Kerja</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {/* Info di Kiri */}
        <div
          className="d-flex bg-white p-2 rounded me-3 flex-column" style={{ width: '300px', height: '400px' }}>
          <h6>Program Study</h6>
          <div style={{ height: '100%', maxWidth: '300px' }}> {/* Wadah untuk diagram */}
            <Doughnut
              data={donugsData}
              options={options} // Menggunakan opsi yang telah disesuaikan
              height={350} // Mengatur tinggi diagram menjadi lebih kecil
              width={350}  // Mengatur lebar diagram menjadi lebih kecil
            />
          </div>
        </div>

        {/* Grapik di Kanan */}
        <div className="bg-white p-2 rounded" style={{ flex: 2, maxWidth: '800px', height: '100%' }}>
          <h6 className="mt-2 text-start">Keselarasan Horizontal</h6>
          <h6 className="mt-2 text-end text-secondary text-opacity-75">Manajement Informatika <i className='bi bi-filter'></i></h6>
          <div className='d-flex justify-content-between align-items-center mt-2'>
            <div className='text-center ms-5'>
              <span>{dataValues.selaras}</span>
              <h6 style={{ fontSize: '15px' }}>Selaras</h6>
            </div>
            <div className='text-center'>
              <span>{dataValues.tidakSelaras}</span>
              <h6 style={{ fontSize: '15px' }}>Tidak Selaras</h6>
            </div>
            <div className='text-center me-5'>
              <span className='text-success'>{dataValues.jumlah}</span>
              <h6 style={{ fontSize: '15px' }}>Jumlah</h6>
            </div>
          </div>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="mt-4 m-auto row rounded bg-white p-3 align-items-center">
        <div className="d-flex justify-content-between">
          <h4 style={{ fontSize: '20px' }}>Keselarasan Horizontal</h4>
          <button className='bi bi-printer bg-info bg-opacity-10 border p-2 rounded text-info'> Generate Report</button>
        </div>

        <table className="table mt-4">
          <thead className="table-secondary">
            <tr>
              <th rowSpan="2" className='fw-semibold'>Tahun Lulusan</th>
              <th rowSpan="2" className='fw-semibold'>Jenjang</th>
              <th rowSpan="2" className='fw-semibold'>Program Studi</th>
              <th colSpan="4" className='text-center fw-semibold'>Keselarasan Horizontal</th>
            </tr>
            <tr>
              <th colSpan="2" className='text-center fw-semibold' style={{ fontSize: '14px' }}>Selaras</th>
              <th colSpan="2" className='text-center fw-semibold' style={{ fontSize: '14px' }}>Tidak Selaras</th>
            </tr>
            <tr>
              <th colSpan="3"></th>
              <th className="text-center fw-semibold" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center fw-semibold" style={{ fontSize: '14px' }}>Persentase</th>
              <th className="text-center fw-semibold" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center fw-semibold" style={{ fontSize: '14px' }}>Persentase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2019</td>
              <td>D3</td>
              <td>Manajement Informatika</td>
              <td className='text-center'>18</td>
              <td className='text-center'>20%</td>
              <td className='text-center'>20</td>
              <td className='text-center'>40%</td>
            </tr>
            <tr>
              <td>2019</td>
              <td>D3</td>
              <td>Administrasi Bisnis</td>
              <td className='text-center'>18</td>
              <td className='text-center'>20%</td>
              <td className='text-center'>20</td>
              <td className='text-center'>40%</td>
            </tr>
            <tr>
              <td>2019</td>
              <td>D3</td>
              <td>Manajement Pemasaran</td>
              <td className='text-center'>18</td>
              <td className='text-center'>20%</td>
              <td className='text-center'>20</td>
              <td className='text-center'>40%</td>
            </tr>
            <tr>
              <td>2019</td>
              <td>D3</td>
              <td>Manajement Keuangan Perbankan</td>
              <td className='text-center'>18</td>
              <td className='text-center'>20%</td>
              <td className='text-center'>20</td>
              <td className='text-center'>40%</td>
            </tr>
            {/* <tr>
              <td colSpan="8" className="text-center">
                Tidak ada data Table Keselarasan Horizontal.
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <div className="mt-4 m-auto row rounded bg-white p-3 align-items-center">
        <div className="d-flex justify-content-between">
          <h4 style={{ fontSize: '20px' }}>Keselarasan Vertical</h4>
          <button className='bi bi-printer bg-info bg-opacity-10 border p-2 rounded text-info'> Generate Report</button>
        </div>

        <table className="table mt-4">
          <thead className="table-secondary">
            <tr>
              <th rowSpan="2" className='fw-semibold'>Tahun Lulusan</th>
              <th rowSpan="2" className='fw-semibold'>Jenjang</th>
              <th rowSpan="2" className='fw-semibold'>Program Studi</th>
              <th colSpan="6" className='text-center fw-semibold'>Keselarasan Vertical</th>
            </tr>
            <tr>
              <th colSpan="2" className="text-center fw-semibold" style={{ fontSize: '14px' }}>Tinggi</th>
              <th colSpan="2" className="text-center fw-semibold" style={{ fontSize: '14px' }}>Sama</th>
              <th colSpan="2" className="text-center fw-semibold" style={{ fontSize: '14px' }}>Rendah</th>
            </tr>
            <tr>
              <th colSpan="3"></th>
              <th className="text-center fw-semibold" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center fw-semibold" style={{ fontSize: '14px' }}>Persentase</th>
              <th className="text-center fw-semibold" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center fw-semibold" style={{ fontSize: '14px' }}>Persentase</th>
              <th className="text-center fw-semibold" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center fw-semibold" style={{ fontSize: '14px' }}>Persentase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2020</td>
              <td>D3</td>
              <td>Manajement Informatika</td>
              <td className="text-center">120</td>
              <td className="text-center">60%</td>
              <td className="text-center">80</td>
              <td className="text-center">40%</td>
              <td className="text-center">50</td>
              <td className="text-center">25%</td>
            </tr>
            <tr>
              <td>2020</td>
              <td>D3</td>
              <td>Administrasi Bisnis</td>
              <td className="text-center">120</td>
              <td className="text-center">60%</td>
              <td className="text-center">80</td>
              <td className="text-center">40%</td>
              <td className="text-center">50</td>
              <td className="text-center">25%</td>
            </tr>
            <tr>
              <td>2020</td>
              <td>D3</td>
              <td>Manajement Pemasaran</td>
              <td className="text-center">120</td>
              <td className="text-center">60%</td>
              <td className="text-center">80</td>
              <td className="text-center">40%</td>
              <td className="text-center">50</td>
              <td className="text-center">25%</td>
            </tr>
            <tr>
              <td>2020</td>
              <td>D3</td>
              <td>Manajement Keuangan Perbangkan</td>
              <td className="text-center">120</td>
              <td className="text-center">60%</td>
              <td className="text-center">80</td>
              <td className="text-center">40%</td>
              <td className="text-center">50</td>
              <td className="text-center">25%</td>
            </tr>
            {/* <tr>
              <td colSpan="10" className="text-center">
                Tidak ada data Table Keselarasan Vertical.
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
