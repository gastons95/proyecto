module.exports = {
    producto: (req, res) => {
        res.render('producto'); 
    },
    productDetail: (req, res) => {
        const productId = req.params.id;
        res.render('productDetail', { productId });
    },
    productCart: (req, res) => {
        res.render('productCar');
    }
};