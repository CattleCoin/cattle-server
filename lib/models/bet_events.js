'use strict'

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'bet_events', {
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
            prize_blockNumber: {
                type: DataTypes.INTEGER(11)
            },
            prize_transactionHash: {
                type: DataTypes.STRING(100)
            },
            game_number: {
                type: DataTypes.STRING(100)
            },
            address: {
                type: DataTypes.STRING(100)
            },
            choice: {
                type: DataTypes.STRING(100),
                comment: '选的那个选项，或是 随机的值'
            },
            banker_point: {
                type: DataTypes.STRING(100),
                comment: '庄家随机点数'
            },
            amount: {
                type: DataTypes.STRING(100),
                comment: '下注金额'
            },
            prize: {
                type: DataTypes.TINYINT
            },
            win: {
                type: DataTypes.TINYINT,
                comment: '0-lose 1-win'
            },
            win_amount: {
                type: DataTypes.STRING(100),
                comment: 'win/lose amount'
            },
            prize_time: {
                type: DataTypes.INTEGER
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
