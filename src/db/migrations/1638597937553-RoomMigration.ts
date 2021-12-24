import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class RoomMigration1638597937553 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'room',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        isNullable : true
                    },
                    {
                        name: 'bonus1',
                        type: 'decimal(14,2)',
                        isNullable : true,
                        unsigned: true
                    },
                    {
                        name: 'bonus2',
                        type: 'decimal(14,2)',
                        isNullable : true,
                        unsigned: true
                    },
                    {
                        name: 'bonus3',
                        type: 'decimal(14,2)',
                        isNullable : true,
                        unsigned: true
                    },
                    {
                        name: 'bonus4',
                        type: 'decimal(14,2)',
                        isNullable : true,
                        unsigned: true
                    },
                    {
                        name: 'maks_bonus1',
                        type: 'int',
                    },
                    {
                        name: 'maks_bonus2',
                        type: 'int',
                    },
                    {
                        name: 'maks_bonus3',
                        type: 'int',
                    },
                    {
                        name: 'maks_bonus4',
                        type: 'int',
                    },
                    {
                        name: 'royal_flush',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'straight_flush',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'five_kind',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'four_kind',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'full_house',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'flush',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'straight',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'three_kind',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'two_pair',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'ace_pair',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'royal_flush_rule',
                        type: 'int',
                        default: '500'
                    },
                    {
                        name: 'five_kind_rule',
                        type: 'int',
                        default: '250'
                    },
                    {
                        name: 'straight_flush_rule',
                        type: 'int',
                        default: '250'
                    },
                    {
                        name: 'four_kind_rule',
                        type: 'int',
                        default: '50'
                    },
                    {
                        name: 'full_house_rule',
                        type: 'int',
                        default: '7'
                    },
                    {
                        name: 'flush_rule',
                        type: 'int',
                        default: '5'
                    },
                    {
                        name: 'straight_rule',
                        type: 'int',
                        default: '3'
                    },
                    {
                        name: 'three_kind_rule',
                        type: 'int',
                        default: '2'
                    },
                    {
                        name: 'two_pair_rule',
                        type: 'int',
                        default: '1'
                    },
                    {
                        name: 'ace_pair_rule',
                        type: 'int',
                        default: '1'
                    },
                    {
                        name: 'bet',
                        type: 'int'
                    },
                    {
                        name: 'multiple',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'updated_at',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP'
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE room');
    }

}
