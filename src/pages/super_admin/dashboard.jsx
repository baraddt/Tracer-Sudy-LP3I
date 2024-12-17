import React, { useState, useEffect } from 'react';
import getRoleName from '../../services/roleCheck';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';

// Register all required elements
ChartJS.register(BarElement, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function Dashboard() {

  const [roleName, setRoleName] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Ambil data user dari localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData); // Urai JSON menjadi objek
      setUserName(user.nama || 'Pengguna'); // Pastikan ada fallback jika nama tidak tersedia
      setRoleName(getRoleName(user.role)); // Ambil role
    }
  }, []);

  const dummyData = [
    { name: 'Sarjana Terapan Bisnis Digital', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D3 Administrasi Bisnis', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D3 Manajemen Informatika', label: 'Jumlah Lulusan', selaras: [79, 60, 35, 45, 60, 76], tidakSelaras: [20, 23, 25, 30, 40, 30] },
    { name: 'D3 Akuntansi', label: 'Jumlah Lulusan', selaras: [80, 70, 65, 75, 85, 90], tidakSelaras: [30, 35, 40, 50, 60, 70] },
    { name: 'D3 Hubungan Masyarakat', label: 'Jumlah Lulusan', selaras: [60, 50, 40, 55, 65, 70], tidakSelaras: [15, 18, 20, 25, 30, 35] },
    { name: 'D3 Manajemen Informatika (Cirebon)', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D3 Teknik Komputer', label: 'Jumlah Lulusan', selaras: [45, 42, 39, 40, 60, 55], tidakSelaras: [10, 12, 15, 18, 20, 25] },
    { name: 'D3 Manajemen Pemasaran', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D3 Manajemen Keuangan Perbankan', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D3 Manajemen Informatika (Padang)', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D3 Manajemen Perusahaan', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D3 Manajemen Keuangan', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D2 Administrasi Bisnis', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D2 Komputerisasi Akuntansi', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D2 Hubungan Masyarakat', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] },
    { name: 'D2 Manajemen Informatika', label: 'Jumlah Lulusan', selaras: [0, 0, 0, 0, 0, 0], tidakSelaras: [0, 0, 0, 0, 0, 0] }
  ];

  // State
  const [prodis, setProdis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProdi, setSelectedProdi] = useState('Pilih Program Study');
  const [chartData, setChartData] = useState({ datasets: [] });
  const [calculatedValues, setCalculatedValues] = useState({ selaras: 0, tidakSelaras: 0, jumlah: 0 });

  // Inisialisasi prodis
  useEffect(() => {
    setProdis(dummyData); // Memastikan data dummy dimasukkan ke dalam prodis
  }, []);

  // Fungsi untuk menangani perubahan prodi yang dipilih
  const handleProdiChange = (prodiName) => {
    setSelectedProdi(prodiName);
    setShowModal(false); // Tutup modal setelah memilih prodi

    // Cari data yang sesuai dengan prodi yang dipilih
    const selectedProdiData = dummyData.find((prodi) => prodi.name === prodiName);

    // Update chartData dengan data prodi yang dipilih
    setChartData({
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          type: 'bar',
          data: selectedProdiData.selaras,
          backgroundColor: 'rgba(0, 191, 165, 0.6)',
          borderRadius: 5,
          barPercentage: 0.2,
          label: 'Jumlah Lulusan',
        },
        {
          type: 'line',
          data: selectedProdiData.selaras,
          backgroundColor: '#00426D',
          borderColor: '#00426D',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          label: 'Selaras',
        },
        {
          type: 'line',
          data: selectedProdiData.tidakSelaras,
          backgroundColor: '#E80000',
          borderColor: '#E80000',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          label: 'Tidak Selaras',
        },
      ],
    });
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
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

  useEffect(() => {
    if (chartData.datasets.length > 0) {
      const selaras = chartData.datasets[1]?.data?.reduce((a, b) => a + b, 0) || 0;
      const tidakSelaras = chartData.datasets[2]?.data?.reduce((a, b) => a + b, 0) || 0;
      const jumlahLulusan = selaras + tidakSelaras;

      setCalculatedValues({ selaras, tidakSelaras, jumlah: jumlahLulusan });
    }
  }, [chartData]);


  const donugsData = {
    labels: ['AB', 'HM', 'KA', 'MI', 'ABI', 'BD', 'LN'], // Label singkat untuk legenda
    fullLabels: [
      'Administrasi Bisnis',
      'Hubungan Masyarakat',
      'Kompetensi Akuntansi',
      'Manajemen Informatika',
      'Administrasi Bisnis Internasional',
      'Bisnis Digital',
      'Logistik Negara'
    ], // Label penuh untuk tooltip
    datasets: [
      {
        data: [10, 15, 25, 5, 10, 12, 15],
        backgroundColor: [
          '#00c49f', // Administrasi Bisnis
          '#4f4fbc', // Hubungan Masyarakat
          '#005f7f', // Kompetensi Akuntansi
          '#ffc000', // Manajemen Informatika
          '#ff6361', // Administrasi Bisnis Internasional
          '#c2c2c2', // Bisnis Digital
          '#3b3b3b' // Logistik Negara
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
  };

  const options = {
    cutout: '70%', // Membuat lubang di tengah
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true, // Membuat simbol bulat di legenda
          pointStyle: 'circle', // Bentuk bulat
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // Mengambil label panjang (fullLabels)
            const fullLabel =
              donugsData.fullLabels[tooltipItem.dataIndex];
            const value = tooltipItem.raw;
            return `${fullLabel}: ${value}%`; // Menampilkan nama lengkap dan nilai
          },
        },
      },
    },
  };

  const [data, setData] = useState([
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Sarjana Terapan Bisnis Digital",
      tinggiJumlah: 100,
      tinggiPersen: "100%",
      samaJumlah: 50,
      samaPersen: "100%",
      rendahJumlah: 30,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Administrasi Bisnis",
      tinggiJumlah: 110,
      tinggiPersen: "100%",
      samaJumlah: 85,
      samaPersen: "100%",
      rendahJumlah: 60,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Manajemen Informatika",
      tinggiJumlah: 120,
      tinggiPersen: "100%",
      samaJumlah: 80,
      samaPersen: "100%",
      rendahJumlah: 50,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Akuntansi",
      tinggiJumlah: 130,
      tinggiPersen: "100%",
      samaJumlah: 100,
      samaPersen: "100%",
      rendahJumlah: 70,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Hubungan Masyarakat",
      tinggiJumlah: 90,
      tinggiPersen: "100%",
      samaJumlah: 60,
      samaPersen: "100%",
      rendahJumlah: 45,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Manajemen Informatika (Cirebon)",
      tinggiJumlah: 80,
      tinggiPersen: "100%",
      samaJumlah: 70,
      samaPersen: "100%",
      rendahJumlah: 60,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Teknik Komputer",
      tinggiJumlah: 110,
      tinggiPersen: "100%",
      samaJumlah: 85,
      samaPersen: "100%",
      rendahJumlah: 60,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Manajemen Pemasaran",
      tinggiJumlah: 75,
      tinggiPersen: "100%",
      samaJumlah: 60,
      samaPersen: "100%",
      rendahJumlah: 55,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Manajemen Keuangan Perbankan",
      tinggiJumlah: 85,
      tinggiPersen: "100%",
      samaJumlah: 70,
      samaPersen: "100%",
      rendahJumlah: 40,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Manajemen Informatika (Padang)",
      tinggiJumlah: 90,
      tinggiPersen: "100%",
      samaJumlah: 85,
      samaPersen: "100%",
      rendahJumlah: 50,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Manajemen Perusahaan",
      tinggiJumlah: 95,
      tinggiPersen: "100%",
      samaJumlah: 70,
      samaPersen: "100%",
      rendahJumlah: 60,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D3",
      program: "Manajemen Keuangan",
      tinggiJumlah: 100,
      tinggiPersen: "100%",
      samaJumlah: 90,
      samaPersen: "100%",
      rendahJumlah: 70,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D2",
      program: "Administrasi Bisnis",
      tinggiJumlah: 60,
      tinggiPersen: "100%",
      samaJumlah: 40,
      samaPersen: "100%",
      rendahJumlah: 20,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D2",
      program: "Komputerisasi Akuntansi",
      tinggiJumlah: 65,
      tinggiPersen: "100%",
      samaJumlah: 55,
      samaPersen: "100%",
      rendahJumlah: 40,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D2",
      program: "Hubungan Masyarakat",
      tinggiJumlah: 50,
      tinggiPersen: "100%",
      samaJumlah: 40,
      samaPersen: "100%",
      rendahJumlah: 30,
      rendahPersen: "100%",
    },
    {
      tahun: "2020",
      jenjang: "D2",
      program: "Manajemen Informatika",
      tinggiJumlah: 55,
      tinggiPersen: "100%",
      samaJumlah: 45,
      samaPersen: "100%",
      rendahJumlah: 25,
      rendahPersen: "100%",
    },
  ]);

  const [dataHorizontal, setDataHorizontal] = useState([
    {
      tahun: "2019",
      jenjang: "D4",
      programStudy: "Sarjana Terapan Bisnis Digital",
      selarasJumlah: 20,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 25,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Administrasi Bisnis",
      selarasJumlah: 15,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 18,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Manajemen Informatika",
      selarasJumlah: 18,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 20,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Akuntansi",
      selarasJumlah: 12,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 14,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Hubungan Masyarakat",
      selarasJumlah: 10,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 11,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Manajemen Informatika (Cirebon)",
      selarasJumlah: 8,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 10,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Teknik Komputer",
      selarasJumlah: 14,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 16,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Manajemen Pemasaran",
      selarasJumlah: 13,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 15,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Manajemen Keuangan Perbankan",
      selarasJumlah: 11,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 12,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Manajemen Informatika (Padang)",
      selarasJumlah: 7,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 9,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Manajemen Perusahaan",
      selarasJumlah: 13,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 15,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D3",
      programStudy: "Manajemen Keuangan",
      selarasJumlah: 10,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 12,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D2",
      programStudy: "Administrasi Bisnis",
      selarasJumlah: 8,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 9,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D2",
      programStudy: "Komputerisasi Akuntansi",
      selarasJumlah: 7,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 8,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D2",
      programStudy: "Hubungan Masyarakat",
      selarasJumlah: 6,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 7,
      tidakSelarasPersentase: "100%",
    },
    {
      tahun: "2019",
      jenjang: "D2",
      programStudy: "Manajemen Informatika",
      selarasJumlah: 9,
      selarasPersentase: "100%",
      tidakSelarasJumlah: 10,
      tidakSelarasPersentase: "100%",
    },
  ]);



  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        {/* Wrapper for all cards with gap */}
        <div className="d-flex flex-wrap gap-2 gap-sm-2 gap-md-4 justify-content-between">
          {/* Card Welcome Super Admin */}
          <div className="card col-md-3 col-sm-12 col-12 d-flex align-items-center shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="text-start">
                <span className='text-dark'>Welcome,</span>
                <h5 className='text-dark'>{roleName}</h5>
              </div>
              <img src="/vektor.png" alt="Profile" width="80" className="rounded" />
            </div>
          </div>

          {/* Card Total Responden */}
          <div className="card col-md-2 col-sm-12 col-12 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0 text-dark">100</p>
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Responden</h6>
              </div>
            </div>
          </div>

          {/* Card Bekerja */}
          <div className="card col-md-2 col-sm-12 col-12 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-briefcase display-6 me-3"></i>
              <div className="text-start">
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0 text-dark">45</p>
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Bekerja</h6>
              </div>
            </div>
          </div>

          {/* Card Wiraswasta */}
          <div className="card col-md-2 col-sm-12 col-12 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-workspace display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0 text-dark">45</p>
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Wiraswasta</h6>
              </div>
            </div>
          </div>

          {/* Card Mencari Kerja */}
          <div className="card col-md-2 col-sm-12 col-12 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-plus display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0 text-dark">10</p>
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Mencari Kerja</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-row d-md-flex justify-content-center">
        {/* Info di Kiri */}
        <div
          className="d-flex bg-white p-2 rounded me-3 flex-column mb-3 mb-md-0" style={{ width: '370px', height: '400px' }}>
          <h6 className='text-dark'>Program Study</h6>
          <div className='ms-4 p-2' style={{ height: '100%', maxWidth: '320px' }}> {/* Wadah untuk diagram */}
            <Doughnut
              data={donugsData}
              options={options}
              height={350}
              width={350}
            />
          </div>
        </div>

        {/* Grapik di Kanan */}
        <div className="bg-white p-2 rounded" style={{ flex: 2, maxWidth: '900px', height: '100%' }}>
          <h6 className="mt-2 text-start text-dark">Keselarasan Horizontal</h6>
          <h6 className="mt-2 text-end text-secondary text-opacity-75">
            {selectedProdi} <i className="btn btn-secondary bi bi-filter" onClick={() => setShowModal(true)}></i>
          </h6>
          <div className='d-flex justify-content-between align-items-center mt-2'>
            <div className='text-center ms-5'>
              <span className='text-dark'>{calculatedValues.selaras}</span>
              <h6 className='text-dark' style={{ fontSize: '15px' }}>Selaras</h6>
            </div>
            <div className='text-center'>
              <span className='text-dark'>{calculatedValues.tidakSelaras}</span>
              <h6 className='text-dark' style={{ fontSize: '15px' }}>Tidak Selaras</h6>
            </div>
            <div className='text-center me-5'>
              <span className='text-success'>{calculatedValues.jumlah}</span>
              <h6 className='text-dark' style={{ fontSize: '15px' }}>Jumlah</h6>
            </div>
          </div>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="mt-4 m-auto table-responsive-sm table-responsive-md row rounded bg-white p-3 align-items-center">
        <div className="d-flex justify-content-between">
          <h4 style={{ fontSize: '20px', color: '#666666' }}>Keselarasan Horizontal</h4>
          <Link to='/pdf'>
            <button className='bi bi-printer bg-info bg-opacity-10 border p-2 rounded text-info'> Generate Report</button>
          </Link>
        </div>

        <table className="table mt-4">
          <thead className="table table-secondary">
            <tr>
              <th rowSpan="2" className='fw-semibold text-dark text-truncate'>Tahun Lulusan</th>
              <th rowSpan="2" className='fw-semibold text-dark'>Jenjang</th>
              <th rowSpan="2" className='fw-semibold text-dark text-truncate'>Program Studi</th>
              <th colSpan="4" className='text-center fw-semibold text-dark'>Keselarasan Horizontal</th>
            </tr>
            <tr>
              <th colSpan="2" className='text-center fw-semibold text-dark' style={{ fontSize: '14px' }}>Selaras</th>
              <th colSpan="2" className='text-center fw-semibold text-dark' style={{ fontSize: '14px' }}>Tidak Selaras</th>
            </tr>
            <tr>
              <th colSpan="3"></th>
              <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
              <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
            </tr>
          </thead>
          <tbody>
            {dataHorizontal.map((item, index) => (
              <tr key={index}>
                <td className="text-dark">{item.tahun}</td>
                <td className="text-dark">{item.jenjang}</td>
                <td className="text-dark text-truncate">{item.programStudy}</td>
                <td className="text-center text-dark">{item.selarasJumlah}</td>
                <td className="text-center text-dark">{item.selarasPersentase}</td>
                <td className="text-center text-dark">{item.tidakSelarasJumlah}</td>
                <td className="text-center text-dark">{item.tidakSelarasPersentase}</td>
              </tr>
            ))}
            {/* <tr>
              <td colSpan="8" className="text-center">
                Tidak ada data Table Keselarasan Horizontal.
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <div className="mt-4 m-auto table-responsive-sm table-responsive-md row rounded bg-white p-3 align-items-center">
        <div className="d-flex justify-content-between">
          <h4 style={{ fontSize: '20px', color: '#666666' }}>Keselarasan Vertical</h4>
          <button className='bi bi-printer bg-info bg-opacity-10 border p-2 rounded text-info'> Generate Report</button>
        </div>

        <table className="table mt-4">
          <thead className="table-secondary">
            <tr>
              <th rowSpan="2" className='fw-semibold text-dark text-truncate'>Tahun Lulusan</th>
              <th rowSpan="2" className='fw-semibold text-dark'>Jenjang</th>
              <th rowSpan="2" className='fw-semibold text-dark text-truncate'>Program Studi</th>
              <th colSpan="6" className='text-center fw-semibold text-dark'>Keselarasan Vertical</th>
            </tr>
            <tr>
              <th colSpan="2" className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Tinggi</th>
              <th colSpan="2" className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Sama</th>
              <th colSpan="2" className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Rendah</th>
            </tr>
            <tr>
              <th colSpan="3"></th>
              <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
              <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
              <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="text-dark">{item.tahun}</td>
                <td className="text-dark">{item.jenjang}</td>
                <td className="text-dark text-truncate">{item.program}</td>
                <td className="text-center text-dark">{item.tinggiJumlah}</td>
                <td className="text-center text-dark">{item.tinggiPersen}</td>
                <td className="text-center text-dark">{item.samaJumlah}</td>
                <td className="text-center text-dark">{item.samaPersen}</td>
                <td className="text-center text-dark">{item.rendahJumlah}</td>
                <td className="text-center text-dark">{item.rendahPersen}</td>
              </tr>
            ))}
            {/* <tr>
              <td colSpan="10" className="text-center">
                Tidak ada data Table Keselarasan Vertical.
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      {/* Modal untuk memilih prodi */}
      <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} id="filterModal" tabIndex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="filterModalLabel">Pilih Program Studi</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              {/* Tampilkan daftar prodi langsung */}
              <select
                className="form-select"
                value={selectedProdi}
                onChange={(e) => handleProdiChange(e.target.value)}
              >
                <option value="">Pilih Program Study</option>
                {prodis.map((prodi) => (
                  <option key={prodi.name} value={prodi.name}>
                    {prodi.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
