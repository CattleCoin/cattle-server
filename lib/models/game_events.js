'use strict'

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'game_events', {
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
            game_number: {
                type: DataTypes.INTEGER,
                comment: '编号'
            },
            address: {
                type: DataTypes.STRING(100)
            },
            duration: {
                type: DataTypes.INTEGER
            },
            end_time: {
                type: DataTypes.INTEGER,
                comment: '区块链时间'
            },
            name: {
                type: DataTypes.STRING(100)
            },
            cover: {
                type: DataTypes.STRING(100)
            },
            status: {
                type: DataTypes.TINYINT
            },
            game_type: {
                type: DataTypes.TINYINT
            },
            description: {
                type: DataTypes.STRING(255)
            },
            game_player_count: {
                type: DataTypes.INTEGER
            },
            game_player_a_count: {
                type: DataTypes.INTEGER
            },
            game_player_b_count: {
                type: DataTypes.INTEGER
            },
            game_bet_amount: {
                type: DataTypes.STRING(100),
                comment: '所有押注金额'
            },
            game_bet_a_amount: {
                type: DataTypes.STRING(100),
                comment: '系统类型，时押a的总金额'
            },
            game_bet_b_amount: {
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
