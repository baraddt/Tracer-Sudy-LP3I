import React from "react";

const LoadingBar = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#ffffff", // Background putih
    },
    text: {
      fontFamily: "Arial, sans-serif",
      fontSize: "24px",
      color: "#000000", // Warna teks hitam
      marginBottom: "20px",
    },
    barContainer: {
      width: "80%", // Lebar bar
      height: "20px", // Tinggi bar
      backgroundColor: "#e0e0e0", // Warna abu-abu
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    progress: {
      height: "100%",
      backgroundColor: "#00ff00", // Warna hijau
      width: "0%", // Awal animasi
      animation: "load 3s infinite", // Animasi berjalan
      borderRadius: "10px",
    },
    "@keyframes load": {
      "0%": {
        width: "0%",
      },
      "50%": {
        width: "50%",
      },
      "100%": {
        width: "100%",
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.text}>Loading...</h2>
      <div style={styles.barContainer}>
        <div style={styles.progress}></div>
      </div>
      {/* Tambahkan keyframes ke elemen <style> */}
      <style>
        {`
          @keyframes load {
            0% { width: 0%; }
            50% { width: 50%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingBar;
