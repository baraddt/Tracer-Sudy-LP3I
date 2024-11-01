import React from 'react';

export default function Dashboard() {
  return (
    <div className="container-fluid p-4">
      {/* Header Section */}
      <div className="row mb-4">
        {/* Wrapper for all cards with gap */}
        <div className="d-flex flex-wrap gap-4 justify-content-between">
          <div className="card col-md-2 d-flex align-items-center shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="text-start">
                <span>Welcome,</span>
                <h5>Super Admin</h5>
              </div>
              <img src="/vektor.png" alt="Profile" width="80" className="rounded" />
            </div>
          </div>

          <div className="card col-md-2 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0">Total Responden</h6>
                <p className="mb-0" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>192.28</p>
                <small className="text-muted">Responden</small>
              </div>
            </div>
          </div>
          <div className="card col-md-2 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-briefcase display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0">Total Responden</h6>
                <p className="mb-0" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>192.28</p>
                <small className="text-muted">Bekerja</small>
              </div>
            </div>
          </div>
          <div className="card col-md-2 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-workspace display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0">Total Responden</h6>
                <p className="mb-0" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>192.28</p>
                <small className="text-muted">Wiraswasta</small>
              </div>
            </div>
          </div>
          <div className="card col-md-2 d-flex align-items-center justify-content-center p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-plus display-6 me-3" style={{ fontSize: '2rem' }}></i>
              <div className="text-start">
                <h6 className="mb-0">Total Responden</h6>
                <p className="mb-0" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>192.28</p>
                <small className="text-muted">Mencari Kerja</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        {/* Info di Kiri */}
        <div
          className="d-flex justify-content-between bg-white p-2 rounded me-3"
          style={{ flex: 1.3 }} // Mengatur proporsi ukuran Info
        >
          <div className="me-5">
            <h4>Program Study</h4>
          </div>

        </div>

        {/* About di Kanan */}
        <div className="bg-white p-2 rounded" style={{ flex: 2 }}>
          <h4 className="mt-2">About</h4>
          <h6
            className="text-secondary"
            style={{ lineHeight: "1.6", marginBottom: "1rem" }}
          >
            Politeknik LP3I merupakan perguruan tinggi vokasi yang fokus mencetak lulusan siap kerja.
            Sejak berdiri pada tahun 1989, LP3I berkomitmen menghubungkan dunia pendidikan dengan industri.
            Kampus ini tersebar di berbagai kota besar di Indonesia, menawarkan program studi di bidang bisnis, teknologi, dan keuangan.

            <br /><br />

            Keunggulan LP3I terletak pada pendekatan "Link and Match" antara teori dan praktik.
            Mahasiswa tidak hanya belajar di kelas tetapi juga mengikuti magang di perusahaan mitra.
            Hal ini memberi pengalaman langsung dan mempersiapkan mereka menghadapi kebutuhan dunia kerja.

            <br /><br />

            Selain itu, LP3I menekankan pengembangan soft skills seperti komunikasi dan etika profesional.
            Kompetensi ini sangat penting bagi mahasiswa agar siap bersaing di lingkungan kerja yang dinamis.
            Dengan demikian, lulusan LP3I memiliki daya saing yang tinggi di pasar tenaga kerja.
          </h6>

        </div>
      </div>
    </div>
  );
}
