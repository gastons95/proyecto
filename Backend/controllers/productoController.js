module.exports = {
    producto: (req, res) => {
        res.render('products/producto'); 
    },
    productDetail: (req, res) => {
        const productId = req.params.id;
        res.render('products/productDetail', { productId });
    },
    productCart: (req, res) => {
        res.render('products/productCart');
    }
};