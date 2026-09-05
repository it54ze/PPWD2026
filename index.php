<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Profil Saya</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<header class="header">
<h1>Dimas Luthfi Salim</h1>
<p>Mahasiswa Sistem Informasi Universitas Tanjungpura</p>
</header>

<nav class="nav">
<a href="#tentang">Tentang</a>
<a href="#jadwal">Jadwal</a>
<a href="#kontak">Kontak</a>
</nav>

<main class="konten">
<section id="tentang">
<h2>Tentang Saya</h2>
<p>Halo! Saya Dimas, mahasiswa yang sedang belajar membuat web
dengan HTML dan CSS. Saya suka desain karena bisa membuat
halaman yang tadinya polos menjadi menarik.</p>
<p>Cita-cita saya menjadi seorang web developer.</p>
</section>

<section id="jadwal">
<h2>Jadwal Pelajaran Favorit</h2>
<table>
<tr><th>Hari</th><th>Mata Pelajaran</th><th>Jam</th></tr>
<tr><td>Senin</td><td>Pemrograman Web</td><td>07.00 – 09.30</td></tr>
<tr><td>Rabu</td><td>Basis Data</td><td>08.00 – 10.30</td></tr>
<tr><td>Jumat</td><td>Desain Grafis</td><td>07.45 – 09.15</td></tr>
</table>
</section>

<section id="kontak">
<h2>Formulir Kontak</h2>
<form>
<label for="nama">Nama</label>
<input type="text" id="nama" placeholder="Tulis nama Anda">
<label for="email">Email</label>
<input type="email" id="email" placeholder="[email protected]">
<label for="pesan">Pesan</label>
<textarea id="pesan" rows="4" placeholder="Tulis pesan..."></textarea>
<button type="submit">Kirim Pesan</button>
</form>
</section>
</main>

<footer class="footer">
<p>&copy; 2026 Dimas Luthfi Salim. Dibuat dengan HTML &amp; CSS.</p>
</footer>

</body>
</html>