
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
    HTTPConflict,
)
from ..models import Matakuliah


# 1. READ ALL: Menampilkan seluruh mata kuliah
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    dbsession = request.dbsession

    matakuliahs = dbsession.query(Matakuliah).order_by(
        Matakuliah.id.asc()
    ).all()

    return {
        'matakuliahs': [m.to_dict() for m in matakuliahs]
    }


# 2. READ ONE: Menampilkan detail mata kuliah berdasarkan ID
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']

    matakuliah = dbsession.query(Matakuliah).filter_by(
        id=matakuliah_id
    ).first()

    if matakuliah is None:
        return HTTPNotFound(json_body={
            'error': f'Mata kuliah dengan ID {matakuliah_id} tidak ditemukan'
        })

    return {'matakuliah': matakuliah.to_dict()}


# 3. CREATE: Menambahkan mata kuliah baru
@view_config(
    route_name='matakuliah_add',
    request_method='POST',
    renderer='json'
)
def matakuliah_add(request):
    try:
        json_data = request.json_body

        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']

        for field in required_fields:
            if field not in json_data or json_data[field] is None or json_data[field] == '':
                return HTTPBadRequest(json_body={
                    'error': f'Field {field} wajib diisi!'
                })

        try:
            sks = int(json_data['sks'])
            semester = int(json_data['semester'])
        except (ValueError, TypeError):
            return HTTPBadRequest(json_body={
                'error': 'SKS dan semester harus berupa angka!'
            })

        if sks <= 0 or semester <= 0:
            return HTTPBadRequest(json_body={
                'error': 'SKS dan semester harus lebih dari 0!'
            })

        dbsession = request.dbsession

        existing = dbsession.query(Matakuliah).filter_by(
            kode_mk=json_data['kode_mk']
        ).first()

        if existing:
            return HTTPConflict(json_body={
                'error': 'Kode mata kuliah sudah digunakan!'
            })

        matakuliah = Matakuliah(
            kode_mk=json_data['kode_mk'],
            nama_mk=json_data['nama_mk'],
            sks=sks,
            semester=semester
        )

        dbsession.add(matakuliah)
        dbsession.flush()

        return {
            'success': True,
            'matakuliah': matakuliah.to_dict()
        }

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 4. UPDATE: Mengubah mata kuliah berdasarkan ID
@view_config(
    route_name='matakuliah_update',
    request_method='PUT',
    renderer='json'
)
def matakuliah_update(request):
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']

    matakuliah = dbsession.query(Matakuliah).filter_by(
        id=matakuliah_id
    ).first()

    if matakuliah is None:
        return HTTPNotFound(json_body={
            'error': f'Mata kuliah dengan ID {matakuliah_id} tidak ditemukan'
        })

    try:
        json_data = request.json_body

        if 'kode_mk' in json_data:
            if not json_data['kode_mk']:
                return HTTPBadRequest(json_body={
                    'error': 'Kode mata kuliah tidak boleh kosong!'
                })

            existing = dbsession.query(Matakuliah).filter(
                Matakuliah.kode_mk == json_data['kode_mk'],
                Matakuliah.id != matakuliah_id
            ).first()

            if existing:
                return HTTPConflict(json_body={
                    'error': 'Kode mata kuliah sudah digunakan!'
                })

            matakuliah.kode_mk = json_data['kode_mk']

        if 'nama_mk' in json_data:
            if not json_data['nama_mk']:
                return HTTPBadRequest(json_body={
                    'error': 'Nama mata kuliah tidak boleh kosong!'
                })
            matakuliah.nama_mk = json_data['nama_mk']

        for field in ['sks', 'semester']:
            if field in json_data:
                try:
                    value = int(json_data[field])
                except (ValueError, TypeError):
                    return HTTPBadRequest(json_body={
                        'error': f'{field} harus berupa angka!'
                    })

                if value <= 0:
                    return HTTPBadRequest(json_body={
                        'error': f'{field} harus lebih dari 0!'
                    })

                setattr(matakuliah, field, value)

        return {
            'success': True,
            'matakuliah': matakuliah.to_dict()
        }

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 5. DELETE: Menghapus mata kuliah berdasarkan ID
@view_config(
    route_name='matakuliah_delete',
    request_method='DELETE',
    renderer='json'
)
def matakuliah_delete(request):
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']

    matakuliah = dbsession.query(Matakuliah).filter_by(
        id=matakuliah_id
    ).first()

    if matakuliah is None:
        return HTTPNotFound(json_body={
            'error': f'Mata kuliah dengan ID {matakuliah_id} tidak ditemukan'
        })

    dbsession.delete(matakuliah)

    return {
        'success': True,
        'message': f'Mata kuliah dengan ID {matakuliah_id} berhasil dihapus'
    }
