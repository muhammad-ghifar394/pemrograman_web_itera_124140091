import argparse
import sys
from datetime import date

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models



def setup_models(dbsession):
    """Menambahkan data awal mahasiswa dan mata kuliah."""

    # Data awal mahasiswa
    daftar_mahasiswa = [
        {
            'nim': '12345',
            'nama': 'Budi Santoso',
            'jurusan': 'Teknik Informatika',
            'tanggal_lahir': date(2000, 5, 15),
            'alamat': 'Jl. Merdeka No. 123, Bandung'
        },
        {
            'nim': '54321',
            'nama': 'Siti Aminah',
            'jurusan': 'Sistem Informasi',
            'tanggal_lahir': date(2001, 8, 22),
            'alamat': 'Jl. Mawar No. 45, Jakarta'
        }
    ]

    for data in daftar_mahasiswa:
        existing = dbsession.query(models.Mahasiswa).filter_by(
            nim=data['nim']
        ).first()

        if existing is None:
            dbsession.add(models.Mahasiswa(**data))

    # Data awal mata kuliah
    daftar_matakuliah = [
        {
            'kode_mk': 'IF2110',
            'nama_mk': 'Pemrograman Web',
            'sks': 3,
            'semester': 3
        },
        {
            'kode_mk': 'IF3140',
            'nama_mk': 'Basis Data',
            'sks': 4,
            'semester': 5
        },
        {
            'kode_mk': 'IF2210',
            'nama_mk': 'Struktur Data',
            'sks': 3,
            'semester': 3
        }
    ]

    for data in daftar_matakuliah:
        existing = dbsession.query(models.Matakuliah).filter_by(
            kode_mk=data['kode_mk']
        ).first()

        if existing is None:
            dbsession.add(models.Matakuliah(**data))


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
            print("Berhasil melakukan seeding mahasiswa dan mata kuliah!")
    except OperationalError:
        print("Pyramid gagal terhubung ke database SQL.")
        print("Pastikan service PostgreSQL berjalan dan connection string di development.ini benar.")


if __name__ == '__main__':
    main()