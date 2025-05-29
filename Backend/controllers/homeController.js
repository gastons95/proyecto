module.exports = {
    home: (req, res) => {
        res.render('home',{
            title:'Bienvenido',
            user: req.session?.user || null
         });
    
    }
};