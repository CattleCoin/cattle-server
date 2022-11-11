'use strict'

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'players', {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            address: {
                type: DataTypes.STRING(100)
            },
            pledge_amount: {
                type: DataTypes.STRING(100)
            },
            created_time: {
                type: DataTypes.INTEGER
            },
            updated_time: {
                type: DataTypes.INTEGER
            }

        }, {
            timestamps: false,
            freezeTableName: true,
            hooks: {
                beforeCreate: function(instances, options) {
                    instances.created_time = moment().unix()
                },
                beforeUpdate: function(instances, options) {
                    instances.updated_time = moment().unix()
                }
            }
        }
    )
}
