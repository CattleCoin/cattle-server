'use strict'

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'redeem_events', {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            blockNumber: {
                type: DataTypes.INTEGER(11)
            },
            transactionHash: {
                type: DataTypes.STRING(100)
            },
            address: {
                type: DataTypes.STRING(100)
            },
            amount: {
                type: DataTypes.STRING(100)
            },
            fee: {
                type: DataTypes.STRING(100)
            },
            updated_time: {
                type: DataTypes.INTEGER
            },
            created_time: {
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
