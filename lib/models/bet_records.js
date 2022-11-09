'use strict'

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'bet_record', {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            game_id: {
                type: DataTypes.INTEGER
            },
            game_number: {
                type: DataTypes.BIGINT
            },
            user_address: {
                type: DataTypes.STRING(100)
            },
            choice: {
                type: DataTypes.TINYINT,
                comment: '选的那个选项，或是 随机的值'
            },
            momey: {
                type: DataTypes.STRING(100)
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
                comment: 'win amount'
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
