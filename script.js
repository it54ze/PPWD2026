// Nonaktifkan animasi otomatis jika sistem pengguna meminta reduced motion
jQuery.fx.off = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

$(function () {
    // 1. EFEK JQUERY 1: DROPDOWN NAVBAR (slideDown & slideUp)
    $('.dropdown')
        .on('mouseenter', function () {
            $(this).find('.dropdown-menu').stop(true, true).slideDown(200);
        })
        .on('mouseleave', function () {
            $(this).find('.dropdown-menu').stop(true, true).slideUp(200);
        });

    // 2. NAVIGASI TAB KATALOG LAPTOP & EFEK JQUERY 2 (fadeIn)
    $('.tab-panel').hide().first().show();
    $('.tab').on('click', function () {
        const target = $(this).data('target');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-panel').hide();
        $(target).fadeIn(300);
    });

    // 3. EFEK JQUERY 3: KARTU KATALOG LAPTOP (animate top)
    $('.menu-card')
        .css('position', 'relative')
        .on('mouseenter', function () {
            $(this).stop().animate({ top: '-6px' }, 150);
        })
        .on('mouseleave', function () {
            $(this).stop().animate({ top: '0px' }, 150);
        });

    // 4. FORM PESANAN CEPAT (Event focus/blur & Toast Notification)
    $('#formPesan .field')
        .on('focus', function () {
            $(this).addClass('is-focus').removeClass('is-error');
            $(this).siblings('.hint').stop(true, true).slideDown(150);
        })
        .on('blur', function () {
            $(this).removeClass('is-focus');
            $(this).siblings('.hint').stop(true, true).slideUp(150);
            if ($(this).hasClass('wajib')) {
                $(this).toggleClass('is-error', $(this).val().trim() === "");
            }
        });

    function tampilkanToast(pesan, tipe) {
        $('#toast')
            .stop(true, true)
            .removeClass('success error')
            .addClass(tipe)
            .text(pesan)
            .fadeIn(250)
            .delay(2500)
            .fadeOut(400);
    }

    $('#formPesan').on('submit', function (e) {
        e.preventDefault();
        const nama = $('#nama').val().trim();
        const laptop = $('#pilihLaptop').val();

        if (nama === "" || laptop === "") {
            $('.wajib').each(function () {
                $(this).toggleClass('is-error', $(this).val().trim() === "");
            });
            tampilkanToast('Lengkapi nama dan pilihan laptop terlebih dahulu!', 'error');
            return;
        }

        tampilkanToast('Pesanan ' + laptop + ' atas nama ' + nama + ' berhasil dikirim!', 'success');
        this.reset();
    });

    // 5. BACK TO TOP BUTTON (Event scroll & Smooth Scroll)
    const $btnTop = $('#backToTop');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $btnTop.fadeIn(200);
        } else {
            $btnTop.fadeOut(200);
        }
    });

    $btnTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // 6. FORM VALIDATION PLUGIN & CUSTOM METHOD (FORM MEMBER GARANSI)
    $.validator.addMethod('nomorHp', function (value, element) {
        return this.optional(element) || /^[0-9]{10,12}$/.test(value);
    }, 'Nomor HP harus 10-12 digit angka');

    $.validator.addMethod('hurufAngka', function (value, element) {
        return this.optional(element) || (/[A-Za-z]/.test(value) && /[0-9]/.test(value));
    }, 'Password harus mengandung kombinasi huruf dan angka');

    const validator = $('#formMember').validate({
        rules: {
            nama: { required: true, minlength: 3 },
            email: { required: true, email: true },
            hp: { required: true, nomorHp: true },
            usia: { required: true, digits: true, min: 17 },
            password: { required: true, minlength: 8, hurufAngka: true },
            konfirmasi: { required: true, equalTo: '#mPassword' }
        },
        messages: {
            nama: { required: 'Nama wajib diisi', minlength: 'Nama minimal 3 karakter' },
            email: { required: 'Email wajib diisi', email: 'Format email tidak valid' },
            hp: { required: 'Nomor HP wajib diisi' },
            usia: { required: 'Usia wajib diisi', digits: 'Usia harus angka', min: 'Usia minimal 17 tahun' },
            password: { required: 'Password wajib diisi', minlength: 'Password minimal 8 karakter' },
            konfirmasi: { required: 'Konfirmasi password wajib diisi', equalTo: 'Password konfirmasi tidak sama' }
        },
        errorElement: 'div',
        errorClass: 'pesan-error',
        highlight: function (el) {
            $(el).addClass('is-error').removeClass('is-valid');
        },
        unhighlight: function (el) {
            $(el).removeClass('is-error').addClass('is-valid');
        },
        submitHandler: function (form) {
            const nama = $('#mNama').val().trim();
            tampilkanToast('Selamat datang, ' + nama + '! Akun garansi berhasil dibuat.', 'success');
            $('#sukses').stop(true, true).slideDown(300).delay(3000).slideUp(300);
            form.reset();
            validator.resetForm();
            $('#formMember input').removeClass('is-error is-valid');
        }
    });

    // Smooth scroll untuk navigasi link internal
    $('a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href.length < 2) return;
        const $tujuan = $(href);
        if ($tujuan.length === 0) return;
        e.preventDefault();
        $('html, body').animate({ scrollTop: $tujuan.offset().top - 60 }, 500);
    });
});