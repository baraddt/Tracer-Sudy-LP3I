import React, { useState, useEffect } from 'react';
import axiosClient from '../../services/axiosClient';
import getRoleName from '../../services/roleCheck';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';

// Register all required elements
ChartJS.register(BarElement, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function Dashboard() {

  const [totalResponden, setTotalResponden] = useState([]);
  const [kondisi, setKondisi] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [userName, setUserName] = useState('');
  const [dataHorizontal, setDataHorizontal] = useState([]);
  const [dataVertical, setDataVertical] = useState([]);

  const fetchHorizontal = async () => {
    try {
      const response = await axiosClient.get('/dashboard/output_horizontal');
      setDataHorizontal(response.data.data);
      console.log("horiontal data:", response.data.data);

    } catch (error) {
      console.error("error feching data:", error.message);

    }
  };

  const fetchVertical = async () => {
    try {
      const response = await axiosClient.get('/dashboard/output_vertikal');
      setDataVertical(response.data.data);
      console.log("vertical data:", response.data.data);

    } catch (error) {
      console.error("error feching data:", error.message);

    }
  };


  const fetchResponden = async () => {
    try {
      const response = await axiosClient.get('/dashboard/total_responden');
      setTotalResponden(response.data.data)
      console.log("responden from API:", response.data.data);

    } catch (error) {
      console.error("error feching:", error.message);

    }
  };

  const fetchKondisi = async () => {
    try {
      const response = await axiosClient.get('/dashboard/data_kondisi');
      setKondisi(response.data)
      console.log("kondisi by API:", response.data);

    } catch (error) {
      console.error("error fehcing data:", error.message);

    }
  }

  useEffect(() => {
    fetchResponden();
    fetchKondisi();
    fetchHorizontal();
    fetchVertical();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.nama || 'Pengguna');
      setRoleName(getRoleName(user.role));
    }
  }, []);


  // State
  const dummyData = [
    { name: 'Sarjana Terapan Bisnis Digital' },
    { name: 'D3 Administrasi Bisnis' },
    { name: 'D3 Manajemen Informatika' },
    { name: 'D3 Akuntansi' },
    { name: 'D3 Hubungan Masyarakat' },
    { name: 'D3 Manajemen Informatika (Cirebon)' },
    { name: 'D3 Teknik Komputer' },
    { name: 'D3 Manajemen Pemasaran' },
    { name: 'D3 Manajemen Keuangan Perbankan' },
    { name: 'D3 Manajemen Informatika (Padang)' },
    { name: 'D3 Manajemen Perusahaan' },
    { name: 'D3 Manajemen Keuangan' },
    { name: 'D2 Administrasi Bisnis' },
    { name: 'D2 Komputerisasi Akuntansi' },
    { name: 'D2 Hubungan Masyarakat' },
    { name: 'D2 Manajemen Informatika' }
  ];

  // State
  const [prodis, setProdis] = useState([]);
  const [prodi, setProdi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProdi, setSelectedProdi] = useState('Pilih Program Study');
  const [chartData, setChartData] = useState({ datasets: [] });
  const [calculatedValues, setCalculatedValues] = useState({ selaras: 0, tidakSelaras: 0, jumlah: 0 });

  // Inisialisasi prodis
  const fetchGraphic = async () => {
    try {
      const response = await axiosClient.get('/dashboard/grafik');
      setProdi(response.data);  // Menyimpan data yang diterima ke state
      console.log("Data graphic:", response.data);

      // Ambil data prodi pertama
      const data = response.data.data[0];

      const tahunLulusan = new Date(data.tahun_lulusan).getFullYear();

      // Ambil data keselarasan
      const selaras = Object.values(data.keselarasan.selaras).map(val => parseInt(val, 10)); // Pastikan angka
      const tidakSelaras = Object.values(data.keselarasan.tidak_selaras).map(val => parseInt(val, 10));

      // Update chartData dengan data baru dari API
      setChartData({
        labels: [tahunLulusan],
        datasets: [
          {
            type: 'bar',
            data: selaras,
            backgroundColor: 'rgba(0, 191, 165, 0.6)',
            borderRadius: 5,
            barPercentage: 0.2,
            label: 'Selaras',
          },
          {
            type: 'line',
            data: selaras,
            backgroundColor: '#00426D',
            borderColor: '#00426D',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            label: 'Selaras',
          },
          {
            type: 'line',
            data: tidakSelaras,
            backgroundColor: '#E80000',
            borderColor: '#E80000',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            label: 'Tidak Selaras',
          },
        ],
      });

      // Hitung total untuk selaras dan tidak selaras
      const totalSelaras = selaras.reduce((a, b) => a + b, 0);  // Total langsung dalam angka
      const totalTidakSelaras = tidakSelaras.reduce((a, b) => a + b, 0);  // Total langsung dalam angka

      // Update nilai yang akan ditampilkan
      setCalculatedValues({
        selaras: totalSelaras, // Angka total selaras
        tidakSelaras: totalTidakSelaras, // Angka total tidak selaras
        jumlah: totalSelaras + totalTidakSelaras, // Jumlah total
      });

    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };



  useEffect(() => {
    fetchGraphic();
  }, []);


  // ini API data donut

  const [donutsData, setDonutsData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });

  const [options] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const index = tooltipItem.dataIndex;
            return `Tinggi: ${dataset.tinggi[index]}, Sama: ${dataset.sama[index]}, Rendah: ${dataset.rendah[index]}`;
          },
        },
      },
    },
  });

  const fetchChartData = async () => {
    try {
      const response = await axiosClient.get('/dashboard/data_cycle');
      const chartData = response.data.data;

      const labels = chartData.map((item) => item.prodi); // Labels = nama prodi
      const tinggi = chartData.map((item) => item.keselarasan.tinggi.jumlah);
      const sama = chartData.map((item) => item.keselarasan.sama.jumlah);
      const rendah = chartData.map((item) => item.keselarasan.rendah.jumlah);

      setDonutsData({
        labels,
        datasets: [
          {
            data: tinggi, // Data utama (tinggi)
            backgroundColor: ['#4CAF50', '#FF9800', '#F44336'], // Warna sesuai indeks
            hoverBackgroundColor: ['#388E3C', '#FB8C00', '#D32F2F'],
            tinggi, // Tambahkan data tinggi untuk tooltip
            sama, // Tambahkan data sama untuk tooltip
            rendah, // Tambahkan data rendah untuk tooltip
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);


  // useEffect(() => {
  //   setProdis(dummyData); // Memastikan data dummy dimasukkan ke dalam prodis
  // }, []);

  // Fungsi untuk menangani perubahan prodi yang dipilih
  const handleProdiChange = (prodiName) => {
    setSelectedProdi(prodiName);
    setShowModal(false); // Tutup modal setelah memilih prodi

    // Cari data yang sesuai dengan prodi yang dipilih
    const selectedProdiData = dummyData.find((prodi) => prodi.name === prodiName);

    // Update chartData dengan data prodi yang dipilih
    //   setChartData({
    //     labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    //     datasets: [
    //       {
    //         type: 'bar',
    //         data: selectedProdiData.selaras,
    //         backgroundColor: 'rgba(0, 191, 165, 0.6)',
    //         borderRadius: 5,
    //         barPercentage: 0.2,
    //         label: 'Jumlah Lulusan',
    //       },
    //       {
    //         type: 'line',
    //         data: selectedProdiData.selaras,
    //         backgroundColor: '#00426D',
    //         borderColor: '#00426D',
    //         borderWidth: 2,
    //         pointRadius: 0,
    //         fill: false,
    //         label: 'Selaras',
    //       },
    //       {
    //         type: 'line',
    //         data: selectedProdiData.tidakSelaras,
    //         backgroundColor: '#E80000',
    //         borderColor: '#E80000',
    //         borderWidth: 2,
    //         pointRadius: 0,
    //         fill: false,
    //         label: 'Tidak Selaras',
    //       },
    //     ],
    //   });
    // };
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

  // useEffect(() => {
  //   if (chartData.datasets.length > 0) {
  //     const selaras = chartData.datasets[1]?.data?.reduce((a, b) => a + b, 0) || 0;
  //     const tidakSelaras = chartData.datasets[2]?.data?.reduce((a, b) => a + b, 0) || 0;
  //     const jumlahLulusan = selaras + tidakSelaras;

  //     setCalculatedValues({ selaras, tidakSelaras, jumlah: jumlahLulusan });
  //   }
  // }, [chartData]);


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

  // const options = {
  //   cutout: '70%', // Membuat lubang di tengah
  //   plugins: {
  //     legend: {
  //       position: 'bottom',
  //       labels: {
  //         usePointStyle: true, // Membuat simbol bulat di legenda
  //         pointStyle: 'circle', // Bentuk bulat
  //       },
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: function (tooltipItem) {
  //           // Mengambil label panjang (fullLabels)
  //           const fullLabel =
  //             donugsData.fullLabels[tooltipItem.dataIndex];
  //           const value = tooltipItem.raw;
  //           return `${fullLabel}: ${value}%`; // Menampilkan nama lengkap dan nilai
  //         },
  //       },
  //     },
  //   },
  // };



  // dummy
  // const [dataVerticall, setDataVerticall] = useState([
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Sarjana Terapan Bisnis Digital",
  //     tinggiJumlah: 100,
  //     tinggiPersen: "100%",
  //     samaJumlah: 50,
  //     samaPersen: "100%",
  //     rendahJumlah: 30,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Administrasi Bisnis",
  //     tinggiJumlah: 110,
  //     tinggiPersen: "100%",
  //     samaJumlah: 85,
  //     samaPersen: "100%",
  //     rendahJumlah: 60,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Manajemen Informatika",
  //     tinggiJumlah: 120,
  //     tinggiPersen: "100%",
  //     samaJumlah: 80,
  //     samaPersen: "100%",
  //     rendahJumlah: 50,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Akuntansi",
  //     tinggiJumlah: 130,
  //     tinggiPersen: "100%",
  //     samaJumlah: 100,
  //     samaPersen: "100%",
  //     rendahJumlah: 70,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Hubungan Masyarakat",
  //     tinggiJumlah: 90,
  //     tinggiPersen: "100%",
  //     samaJumlah: 60,
  //     samaPersen: "100%",
  //     rendahJumlah: 45,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Manajemen Informatika (Cirebon)",
  //     tinggiJumlah: 80,
  //     tinggiPersen: "100%",
  //     samaJumlah: 70,
  //     samaPersen: "100%",
  //     rendahJumlah: 60,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Teknik Komputer",
  //     tinggiJumlah: 110,
  //     tinggiPersen: "100%",
  //     samaJumlah: 85,
  //     samaPersen: "100%",
  //     rendahJumlah: 60,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Manajemen Pemasaran",
  //     tinggiJumlah: 75,
  //     tinggiPersen: "100%",
  //     samaJumlah: 60,
  //     samaPersen: "100%",
  //     rendahJumlah: 55,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Manajemen Keuangan Perbankan",
  //     tinggiJumlah: 85,
  //     tinggiPersen: "100%",
  //     samaJumlah: 70,
  //     samaPersen: "100%",
  //     rendahJumlah: 40,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Manajemen Informatika (Padang)",
  //     tinggiJumlah: 90,
  //     tinggiPersen: "100%",
  //     samaJumlah: 85,
  //     samaPersen: "100%",
  //     rendahJumlah: 50,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Manajemen Perusahaan",
  //     tinggiJumlah: 95,
  //     tinggiPersen: "100%",
  //     samaJumlah: 70,
  //     samaPersen: "100%",
  //     rendahJumlah: 60,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D3",
  //     program: "Manajemen Keuangan",
  //     tinggiJumlah: 100,
  //     tinggiPersen: "100%",
  //     samaJumlah: 90,
  //     samaPersen: "100%",
  //     rendahJumlah: 70,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D2",
  //     program: "Administrasi Bisnis",
  //     tinggiJumlah: 60,
  //     tinggiPersen: "100%",
  //     samaJumlah: 40,
  //     samaPersen: "100%",
  //     rendahJumlah: 20,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D2",
  //     program: "Komputerisasi Akuntansi",
  //     tinggiJumlah: 65,
  //     tinggiPersen: "100%",
  //     samaJumlah: 55,
  //     samaPersen: "100%",
  //     rendahJumlah: 40,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D2",
  //     program: "Hubungan Masyarakat",
  //     tinggiJumlah: 50,
  //     tinggiPersen: "100%",
  //     samaJumlah: 40,
  //     samaPersen: "100%",
  //     rendahJumlah: 30,
  //     rendahPersen: "100%",
  //   },
  //   {
  //     tahun: "2020",
  //     jenjang: "D2",
  //     program: "Manajemen Informatika",
  //     tinggiJumlah: 55,
  //     tinggiPersen: "100%",
  //     samaJumlah: 45,
  //     samaPersen: "100%",
  //     rendahJumlah: 25,
  //     rendahPersen: "100%",
  //   },
  // ]);

  // const [dataHorizontal, setDataHorizontal] = useState([
  //   {
  //     tahun: "2019",
  //     jenjang: "D4",
  //     programStudy: "Sarjana Terapan Bisnis Digital",
  //     selarasJumlah: 20,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 25,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Administrasi Bisnis",
  //     selarasJumlah: 15,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 18,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Manajemen Informatika",
  //     selarasJumlah: 18,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 20,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Akuntansi",
  //     selarasJumlah: 12,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 14,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Hubungan Masyarakat",
  //     selarasJumlah: 10,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 11,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Manajemen Informatika (Cirebon)",
  //     selarasJumlah: 8,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 10,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Teknik Komputer",
  //     selarasJumlah: 14,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 16,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Manajemen Pemasaran",
  //     selarasJumlah: 13,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 15,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Manajemen Keuangan Perbankan",
  //     selarasJumlah: 11,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 12,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Manajemen Informatika (Padang)",
  //     selarasJumlah: 7,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 9,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Manajemen Perusahaan",
  //     selarasJumlah: 13,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 15,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D3",
  //     programStudy: "Manajemen Keuangan",
  //     selarasJumlah: 10,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 12,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D2",
  //     programStudy: "Administrasi Bisnis",
  //     selarasJumlah: 8,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 9,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D2",
  //     programStudy: "Komputerisasi Akuntansi",
  //     selarasJumlah: 7,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 8,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D2",
  //     programStudy: "Hubungan Masyarakat",
  //     selarasJumlah: 6,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 7,
  //     tidakSelarasPersentase: "100%",
  //   },
  //   {
  //     tahun: "2019",
  //     jenjang: "D2",
  //     programStudy: "Manajemen Informatika",
  //     selarasJumlah: 9,
  //     selarasPersentase: "100%",
  //     tidakSelarasJumlah: 10,
  //     tidakSelarasPersentase: "100%",
  //   },
  // ]);

  const tahunLulusan =
    [
      "2020",
      "2021",
      "2022",
      "2023",
      "2024"
    ];


  useEffect(() => {
    setFilteredHorizontal(dataHorizontal); // Set default horizontal
    setFilteredVertical(dataVertical); // Set default vertical
  }, [dataHorizontal, dataVertical]);

  // buat filter data table yg di horizontal chawchibe  
  const [filteredHorizontal, setFilteredHorizontal] = useState(dataHorizontal);
  const [filteredVertical, setFilteredVertical] = useState(dataVertical);
  const [selectedHorizontalYear, setSelectedHorizontalYear] = useState("");
  const [selectedVerticalYear, setSelectedVerticalYear] = useState("");
  const [isFilterHorizontalVisible, setIsFilterHorizontalVisible] = useState(false);
  const [isFilterVerticalVisible, setIsFilterVerticalVisible] = useState(false);



  const handleFilterHorizontalYear = (year) => {
    setSelectedHorizontalYear(year); // Menyimpan tahun yang dipilih untuk Horizontal
    if (year === "") {
      // Tampilkan semua data jika "Semua" dipilih
      setFilteredHorizontal(dataHorizontal);
    } else {
      // Filter berdasarkan tahun untuk dataHorizontal
      const filteredHorizontalData = dataHorizontal.filter(
        (item) => new Date(item.tahun_lulusan).getFullYear().toString() === year
      );
      setFilteredHorizontal(filteredHorizontalData);
    }
  };


  const handleFilterVerticalYear = (year) => {
    setSelectedVerticalYear(year); // Menyimpan tahun yang dipilih untuk Vertical
    if (year === "") {
      // Tampilkan semua data jika "Semua" dipilih
      setFilteredVertical(dataVertical);
    } else {
      // Filter berdasarkan tahun untuk dataVertical
      const filteredVerticalData = dataVertical.filter(
        (item) => new Date(item.tahun_lulusan).getFullYear().toString() === year
      );
      setFilteredVertical(filteredVerticalData);
    }
  };

  const toggleFilterVisibilityHorizontal = () => {
    setIsFilterHorizontalVisible((prev) => !prev);
  };

  const toggleFilterVisibilityVertical = () => {
    setIsFilterVerticalVisible((prev) => !prev);
  };

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className='d-flex flex-wrap gap-md-4 gap-sm-2 gap-2 justify-content-between p-sm-2 p-md-2 p-4'>
          <div className="card col-md-12 col-lg-3 col-sm-12 col-12 d-flex align-items-center shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="text-start">
                <span className='text-dark'>Welcome,</span>
                <h5 className='text-dark'>{roleName}</h5>
              </div>
              <img src="/vektor.png" alt="Profile" width="80" className="rounded" />
            </div>
          </div>
        </div>
        {/* Wrapper for all cards with gap */}
        <div className="d-flex flex-wrap gap-md-4 gap-sm-2 gap-2 justify-content-between p-sm-2 p-md-2 p-4">
          {/* Card Welcome Super Admin */}
          {/* <div className="card col-md-12 col-lg-3 col-sm-12 col-12 d-flex align-items-center shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="text-start">
                <span className='text-dark'>Welcome,</span>
                <h5 className='text-dark'>{roleName}</h5>
              </div>
              <img src="/vektor.png" alt="Profile" width="80" className="rounded" />
            </div>
          </div> */}

          {/* Card Total Responden */}
          <div className="card col-md-3 col-lg-2 col-sm-12 col-12 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0 text-dark">{totalResponden}</p>
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Responden</h6>
              </div>
            </div>
          </div>

          {/* Card Bekerja */}
          {kondisi.length > 0 &&
            kondisi.map((item) => (
              <div key={item._id} className="card col-md-2 col-sm-12 col-12 d-flex align-items-center justify-content-center p-3 shadow-sm">
                <div className="d-flex align-items-center">
                  <i className="bi bi-briefcase display-6 me-3"></i>
                  <div className="text-start">
                    <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Total Responden</h6>
                    <p className="mb-0 text-dark">{item.total}</p> {/* Menampilkan total responden */}
                    <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>{item.kondisi}</h6> {/* Menampilkan kondisi */}
                  </div>
                </div>
              </div>
            ))
          }

          {/* Card Wiraswasta */}
          {/* <div className="card col-md-3 col-lg-2 col-sm-12 col-12 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-workspace display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0 text-dark">{kondisi}</p>
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Wiraswasta</h6>
              </div>
            </div>
          </div> */}

          {/* Card Mencari Kerja */}
          {/* <div className="card col-md-3 col-lg-2 col-sm-12 col-12 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-plus display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Total Responden</h6>
                <p className="mb-0 text-dark">{kondisi}</p>
                <h6 className="mb-0 text-dark" style={{ fontSize: '14px' }}>Mencari Kerja</h6>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="d-row d-md-flex justify-content-center">
        {/* Info di Kiri */}
        <div
          className="d-flex bg-white p-2 rounded me-3 flex-column mb-3 mb-md-0"
          style={{ width: '370px', height: '400px' }}
        >
          <h6 className="text-dark">Program Study</h6>
          <div className="ms-4 p-2" style={{ height: '100%', maxWidth: '320px' }}>
            {donutsData.labels.length > 0 && (
              <Doughnut data={donutsData} options={options} height={350} width={350} />
            )}
          </div>
        </div>


        {/* Grapik di Kanan */}
        <div className="bg-white p-2 rounded" style={{ flex: 2, maxWidth: '900px', height: '100%' }}>
          <div className="d-flex justify-content-between">
            <h6 className="mt-2 text-dark">Keselarasan Horizontal</h6>
            <h6 className="mt-2 text-secondary text-opacity-75">
              {selectedProdi} <i className="btn btn-secondary bi bi-filter" onClick={() => setShowModal(true)}></i>
            </h6>
          </div>
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
          <Link to='/pdfHrz' state={{ dataHorizontal }}>
            <button className='bi bi-printer bg-info bg-opacity-10 border p-2 rounded text-info'> Generate Report</button>
          </Link>
        </div>

        <table className="table mt-4">
          <thead className="table">
            <tr>
              <th rowSpan="2" className="cstm-bg fw-semibold text-dark">
                <span onClick={toggleFilterVisibilityHorizontal} className='cstm-bg fw-semibold text-dark' style={{ cursor: "pointer" }}>
                  Tahun Lulusan <i className="bi bi-filter"></i>
                </span>

                {isFilterHorizontalVisible && (
                  <div className="mt-2 rounded">
                    <select
                      className="form-select form-select-sm w-auto mt-2 cstm-bg rounded"
                      onChange={(e) => handleFilterHorizontalYear(e.target.value)} // Filter untuk vertical
                      value={selectedHorizontalYear}
                    >
                      <option value="">Semua</option>
                      {tahunLulusan.map((tahun, index) => (
                        <option key={index} value={tahun}>
                          {tahun}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </th>
              <th rowSpan="2" className='cstm-bg fw-semibold text-dark'>Jenjang</th>
              <th rowSpan="2" className='cstm-bg fw-semibold text-dark text-truncate'>Program Studi</th>
              <th colSpan="4" className='cstm-bg text-center fw-semibold text-dark'>Keselarasan Horizontal</th>
            </tr>
            <tr>
              <th colSpan="2" className='cstm-bg text-center fw-semibold text-dark' style={{ fontSize: '14px' }}>Selaras</th>
              <th colSpan="2" className='cstm-bg text-center fw-semibold text-dark' style={{ fontSize: '14px' }}>Tidak Selaras</th>
            </tr>
            <tr>
              <th colSpan="3" className='cstm-bg'></th>
              <th className="cstm-bg text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="cstm-bg text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
              <th className="cstm-bg text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="cstm-bg text-center fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
            </tr>
          </thead>
          <tbody>
            {filteredHorizontal.length > 0 ? (
              filteredHorizontal.map((item, index) => (
                <tr key={index}>
                  <td className="text-dark">
                    {new Date(item.tahun_lulusan).getFullYear()}
                  </td>
                  <td className="text-dark">{item.jenjang}</td>
                  <td className="text-dark text-truncate">{item.prodi?.nama}</td>
                  <td className="text-center text-dark">{item.keselarasan.selaras?.jumlah}</td>
                  <td className="text-center text-dark">{item.keselarasan.selaras?.persentase}</td>
                  <td className="text-center text-dark">{item.keselarasan.tidak_selaras?.jumlah}</td>
                  <td className="text-center text-dark">{item.keselarasan.tidak_selaras?.persentase}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-dark">
                  Tidak ada data Table Keselarasan Horizontal.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 m-auto table-responsive-sm table-responsive-md row rounded bg-white p-3 align-items-center">
        <div className="d-flex justify-content-between">
          <h4 style={{ fontSize: '20px', color: '#666666' }}>Keselarasan Vertical</h4>
          <Link to='/pdfVrtc' state={{ dataVertical }}>
            <button className='bi bi-printer bg-info bg-opacity-10 border p-2 rounded text-info'> Generate Report</button>
          </Link>
        </div>

        <table className="table mt-4">
          <thead className="table">
            <tr>
              <th rowSpan="2" className="cstm-bg fw-semibold text-dark">
                <span onClick={toggleFilterVisibilityVertical} className='cstm-bg fw-semibold text-dark' style={{ cursor: "pointer" }}>
                  Tahun Lulusan <i className="bi bi-filter"></i>
                </span>

                {isFilterVerticalVisible && (
                  <div className="mt-2">
                    <select
                      className="form-select form-select-sm w-auto mt-2 cstm-bg"
                      onChange={(e) => handleFilterVerticalYear(e.target.value)} // Filter untuk vertical
                      value={selectedVerticalYear}
                    >
                      <option value="">Semua</option>
                      {tahunLulusan.map((tahun, index) => (
                        <option key={index} value={tahun}>
                          {tahun}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </th>
              <th rowSpan="2" className='cstm-bg fw-semibold text-dark'>Jenjang</th>
              <th rowSpan="2" className='cstm-bg fw-semibold text-dark text-truncate'>Program Studi</th>
              <th colSpan="6" className='cstm-bg text-center fw-semibold text-dark'>Keselarasan Vertical</th>
            </tr>
            <tr>
              <th colSpan="2" className="text-center cstm-bg fw-semibold text-dark" style={{ fontSize: '14px' }}>Tinggi</th>
              <th colSpan="2" className="text-center cstm-bg fw-semibold text-dark" style={{ fontSize: '14px' }}>Sama</th>
              <th colSpan="2" className="text-center cstm-bg fw-semibold text-dark" style={{ fontSize: '14px' }}>Rendah</th>
            </tr>
            <tr>
              <th colSpan="3" className='cstm-bg'></th>
              <th className="text-center cstm-bg fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center cstm-bg fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
              <th className="text-center cstm-bg fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center cstm-bg fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
              <th className="text-center cstm-bg fw-semibold text-dark" style={{ fontSize: '14px' }}>Jumlah</th>
              <th className="text-center cstm-bg fw-semibold text-dark" style={{ fontSize: '14px' }}>Persentase</th>
            </tr>
          </thead>
          <tbody>
            {filteredVertical.length > 0 ? (
              filteredVertical.map((item, index) => (
                <tr key={index}>
                  <td className="text-dark">
                    {new Date(item.tahun_lulusan).getFullYear()}
                  </td>
                  <td className="text-dark">{item.jenjang}</td>
                  <td className="text-dark text-truncate">{item.prodi?.nama}</td>
                  <td className="text-center text-dark">{item.keselarasan.tinggi?.jumlah}</td>
                  <td className="text-center text-dark">{item.keselarasan.tinggi?.persentase}</td>
                  <td className="text-center text-dark">{item.keselarasan.sama?.jumlah}</td>
                  <td className="text-center text-dark">{item.keselarasan.sama?.persentase}</td>
                  <td className="text-center text-dark">{item.keselarasan.rendah?.jumlah}</td>
                  <td className="text-center text-dark">{item.keselarasan.rendah?.persentase}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-dark">
                  Tidak ada data Table Keselarasan Horizontal.
                </td>
              </tr>
            )}
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
    </div >
  );
}