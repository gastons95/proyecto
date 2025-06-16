const db = require('../../database/models');
const path = require('path');

module.exports = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email']
            });

            const response = {
                count: users.length,
                users: users.map(user => ({
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`, // Combina nombre y apellido
                    email: user.email,
                    detail: `/api/users/${user.id}`
                }))
            };

            return res.json(response);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id, {
                attributes: ['id', 'firstName', 'lastName', 'email', 'image'] // campos reales
            });

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const userDetail = {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                avatar: `${req.protocol}://${req.get('host')}/users/${user.image}`
            };

            return res.json(userDetail);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};