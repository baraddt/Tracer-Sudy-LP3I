export default function skala() {
    return (
        <div>
            {/* Form */}
            <form>

                {/* Tanggal Mulai & Tanggal Berakhir */}
                <div className="form-row d-flex">
                    <div className="form-group col-md-6 me-5">
                        <label className='mb-3'>Skala Kegiatan</label>
                        <select
                            name="skala_kegiatan"
                            // value={newSkala.skala_kegiatan}
                            // onChange={handleInputChange}
                            placeholder='Pilih Skala'
                            className="form-control mb-2"
                            required
                        >
                            <option value="" disabled>Pilih Skala</option>
                            <option value="Nasional">Nasional</option>
                            <option value="PSDKU">PSDKU</option>
                        </select>
                    </div>
                    <div className="form-group col-md-5 me-5">
                        <label className='mb-3'>Tahun Lulusan</label>
                        <select
                            name="tahun_lulusan"
                            // value={newSkala.tahun_lulusan}  // Pastikan ini memiliki nilai yang sesuai
                            // onChange={handleInputChange}    // Fungsi untuk menangani perubahan
                            className="form-control mb-2"
                            required
                        >
                            <option value="">Pilih Tahun Lulusan</option>

                            <option value="">Tahun belum tersedia</option>  // Menampilkan pesan jika tidak ada data

                        </select>
                    </div>
                </div>
                {/* Table */}
                <div className="mt-4">
                    <h5>Sasaran Responden</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nama Lembaga</th>
                                <th className='text-center'>Jenjang</th>
                                <th>Program Studi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {psdkuList.length > 0 ? (
                                psdkuList.map((psdku) => (
                                    <tr key={psdku._id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={newSkala.kampus.includes(psdku._id)} // Gunakan checked untuk status terpilih
                                                onChange={(e) => handleKampusChange(e, psdku._id)} // Panggil fungsi handleKampusChange
                                            /> {psdku.psdku}
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column text-center">
                                                {psdku.prodi.map((item, index) => (
                                                    <label key={index}>{item.jenjang?.jenjang}</label>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column">
                                                {Array.isArray(psdku.prodi) && psdku.prodi.map((prodiItem) => (
                                                    <label key={prodiItem._id}>
                                                        <input
                                                            type="checkbox"
                                                            checked={newSkala.prodi.includes(prodiItem._id)} // Gunakan checked untuk status terpilih
                                                            onChange={(e) => handleProdiChange(e, prodiItem._id)} // Panggil fungsi handleProdiChange
                                                        /> {prodiItem.nama}
                                                    </label>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Belum Menambahkan data PSDKU.
                                    </td>
                                </tr>
                            )} */}
                        </tbody>

                    </table>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    <div>
                        <button type="button" className="btn btn-primary mb-3">Simpan ke Draft</button>
                    </div>
                    <div>
                        {/* <Link to='/super_admin/tracerstudyadd'> */}
                        <button type="button" className="btn btn-danger mb-3 me-3">Sebelumnnya</button>
                        {/* </Link> */}
                        {/* <Link to='/super_admin/tracerstudy-bank-soal'> */}
                        <button type="submit" className="btn btn-success mb-3">Selanjutnya</button>
                        {/* </Link> */}
                    </div>
                </div>
            </form>
        </div>
    )
}