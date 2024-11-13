export const authMiddleware = (req, res, next) => {
    const token = req.session.token;

    if (token) {
        // Jika ada token, arahkan pengguna ke halaman courses jika mencoba mengakses login atau register
        if (req.path === '/login' || req.path === '/register') {
            return res.redirect('/courses');
        }
    } else {
        // Jika tidak ada token, arahkan pengguna ke halaman login jika mencoba mengakses halaman selain login atau register
        if (req.path !== '/login' && req.path !== '/register') {
            return res.redirect('/login');
        }
    }

    // Lanjutkan ke middleware berikutnya atau rute yang diminta
    next();
};