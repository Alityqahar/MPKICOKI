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

// Helper: toggle state submitting untuk mencegah double submit dan tunjukkan spinner
function setSubmittingState(form, isSubmitting) {
	// form: <form> element
	if (!form) return;
	var btn = form.querySelector('button[type="submit"]');
	if (!btn) return;

	if (isSubmitting) {
		// jika sudah submitting, return false untuk menandakan request tidak dilanjut
		if (form.dataset.submitting === '1') return false;
		form.dataset.submitting = '1';
		// simpan html asli jika belum disimpan
		if (!btn.dataset.origHtml) btn.dataset.origHtml = btn.innerHTML;
		btn.disabled = true;
		btn.setAttribute('aria-busy', 'true');
		btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Mengirim...';
		return true;
	} else {
		delete form.dataset.submitting;
		btn.disabled = false;
		btn.removeAttribute('aria-busy');
		if (btn.dataset.origHtml) {
			btn.innerHTML = btn.dataset.origHtml;
			delete btn.dataset.origHtml;
		}
		return true;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	// jika form ada dan supabaseClient tersedia, pasang listener
	const form = document.getElementById('menfestForm');
	if (!form) return;

	form.addEventListener('submit', async function(e) {
		e.preventDefault();

		// Cegah double submit: jika sudah dalam proses, abaikan klik berikutnya
		if (form.dataset.submitting === '1') {
			console.warn('[menfest] submit ditolak karena masih memproses request sebelumnya.');
			return;
		}

		// Aktifkan state submitting (tampilkan spinner + disable tombol)
		setSubmittingState(form, true);

		// jika SDK tidak tersedia, beri tahu dan fallback ke submit normal (atau return)
		if (!supabaseClient) {
			console.error('[menfest] Supabase client belum siap. Form tidak akan dikirim via JS.');
			// fallback: biarkan form submit normal (hilangkan preventDefault jika mau navigasi)
			// Untuk saat ini hentikan handler agar tidak menghalangi submit default:
			setSubmittingState(form, false);
			form.removeEventListener('submit', arguments.callee);
			form.submit();
			return;
		}

		var nama = document.getElementById('nama').value.trim();
		var isi = document.getElementById('isi').value.trim();
		var successMsg = document.getElementById('successMsg');

		if (successMsg) successMsg.classList.add('d-none');

		if (!nama || !isi) {
			// reset submitting state karena validasi gagal
			setSubmittingState(form, false);
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

			// reset tombol setelah sukses
			setSubmittingState(form, false);

			setTimeout(function() {
				if (successMsg) successMsg.classList.add('d-none');
			}, 3000);
		} catch (err) {
			console.error('Gagal mengirim ke Supabase:', err);
			// reset tombol juga saat error
			setSubmittingState(form, false);
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
