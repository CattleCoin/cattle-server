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
            address: {
                type: DataTypes.STRING(100)
            },
            transactionHash: {
                type: DataTypes.STRING(100)
            },
            from_address: {
                type: DataTypes.STRING(60)
            },
            to_address: {
                type: DataTypes.STRING(60)
            },
            amount: {
                type: DataTypes.STRING(100)
            },
            type: {
                type: DataTypes.TINYINT,
                defaultValue: 1
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
