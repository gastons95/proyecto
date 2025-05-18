module.exports = {
    home: (req, res) => {
        res.render('index',{
            title:'Bienvenido',
            user: req.session?.user || null
         });
    
    }
};