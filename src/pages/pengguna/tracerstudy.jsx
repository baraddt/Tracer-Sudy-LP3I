import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';


export default function () {

    return (
        <div className="container mt-4">
            {/* Selesai */}
            <div className="bg-light mt-4 p-2">
                <span className="border rounded bg-success bg-opacity-25 p-1" style={{ color: '#0AB39C' }}><i className="bi bi-circle-fill me-2"></i>Selesai</span>
                <div className="d-flex row gap-5 justify-content-center mt-4">

                    {/* Card Tracer */}
                    <div className="card col-md-3 col-9 col-sm-8 d-flex justify-content-center p-2 shadow-sm">
                        <img src="/bannertraser.jpg" alt=""/>
                        <span className="mt-3">Politeknik LP3I Tasikmalaya</span>
                        <span className="mt-3">Tracer Study Alumni</span>
                        <span className="mt-3 text-danger">10-10-2020 - 11-02-2019</span>
                        <span className="text-secondary mt-3">* Skala Kegiatan</span>
                        <span className="">PSDKU</span>
                        <span className="text-secondary mt-3">* Tahun Lulusan</span>
                        <span>2014 - 2015</span>
                        <Link to='/pengguna/trackrecord'>
                            <div className='text-center'>
                                <button className="btn btn-primary mt-3 col-md-12 col-12 col-sm-12">Preview</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}