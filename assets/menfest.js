// Konfigurasi Supabase
const SUPABASE_URL = 'https://bpcryzfrjqonfyduncbc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwY3J5emZyanFvbmZ5ZHVuY2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MTIyNzEsImV4cCI6MjA3NjA4ODI3MX0.XSrJRCyovdI_vmPZvjVpeMM3rVCndN5YsKTgfpGHJok';

// Inisialisasi Supabase client (cek dulu apakah SDK tersedia)
var supabaseClient = null;
if (typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
	supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
	console.error('[menfest] Supabase SDK tidak ditemukan. Pastikan menambahkan <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js/dist/umd/supabase.min.js"></script> sebelum assets/menfest.js');
}

document.addEventListener('DOMContentLoaded', function() {
	// jika form ada dan supabaseClient tersedia, pasang listener
	const form = document.getElementById('menfestForm');
	if (!form) return;

	form.addEventListener('submit', async function(e) {
		e.preventDefault();

		// jika SDK tidak tersedia, beri tahu dan fallback ke submit normal (atau return)
		if (!supabaseClient) {
			console.error('[menfest] Supabase client belum siap. Form tidak akan dikirim via JS.');
			// fallback: biarkan form submit normal (hilangkan preventDefault jika mau navigasi)
			// Untuk saat ini hentikan handler agar tidak menghalangi submit default:
			form.removeEventListener('submit', arguments.callee);
			form.submit();
			return;
		}

		var nama = document.getElementById('nama').value.trim();
		var isi = document.getElementById('isi').value.trim();
		var successMsg = document.getElementById('successMsg');

		if (successMsg) successMsg.classList.add('d-none');

		if (!nama || !isi) {
			if (successMsg) {
				successMsg.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i> Nama dan isi harus diisi!';
				successMsg.classList.remove('d-none');
			}
			return;
		}

		console.log('Mengirim data ke Supabase:', { nama, isi });

		try {
			const { data, error } = await supabaseClient
				.from('data') // pastikan tabel 'menfest' ada di Supabase dengan kolom yang cocok
				.insert([
					{
						nama: nama,
						isi: isi
					}
				])
				.select();

			if (error) throw error;

			console.log('Data berhasil disimpan:', data);
			if (successMsg) {
				successMsg.innerHTML = '<i class="fas fa-check-circle me-2"></i> Menfest berhasil dikirim!';
				successMsg.classList.remove('d-none');
			}
			form.reset();

			setTimeout(function() {
				if (successMsg) successMsg.classList.add('d-none');
			}, 3000);
		} catch (err) {
			console.error('Gagal mengirim ke Supabase:', err);
			if (successMsg) {
				successMsg.innerHTML = '<i class="fas fa-times-circle me-2"></i> Gagal mengirim: ' + (err.message || err);
				successMsg.classList.remove('d-none');
				setTimeout(function() { successMsg.classList.add('d-none'); }, 4000);
			} else {
				alert('Gagal mengirim menfest: ' + (err.message || err));
			}
		}
	});
});