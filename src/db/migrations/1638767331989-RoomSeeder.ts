import {MigrationInterface, QueryRunner} from "typeorm";
import { Room } from "src/room/entities/room.entity";

export class RoomSeeder1638767331989 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(
            queryRunner.manager.create(Room,Array(40).fill({"maks_bonus1" : 50000, "maks_bonus2" : 20000, "maks_bonus3" : 10000, "maks_bonus4" : 5000, "bet": 50,"multiple": "5"}))
        )
        await queryRunner.manager.save(
            queryRunner.manager.create(Room,Array(40).fill({"maks_bonus1" : 20000, "maks_bonus2" : 8000, "maks_bonus3" : 4000, "maks_bonus4" : 2000, "bet": 50,"multiple": "2"}))
        )
        await queryRunner.manager.save(
            queryRunner.manager.create(Room,Array(120).fill({"maks_bonus1" : 10000, "maks_bonus2" : 4000, "maks_bonus3" : 2000, "maks_bonus4" : 1000, "bet": 50,"multiple": "1"}))
        )
        await queryRunner.manager.save(
            queryRunner.manager.create(Room,Array(160).fill({"maks_bonus1" : 10000, "maks_bonus2" : 4000, "maks_bonus3" : 2000, "maks_bonus4" : 1000, "bet": 20,"multiple": "1"}))
        )
        await queryRunner.manager.save(
            queryRunner.manager.create(Room,Array(240).fill({"maks_bonus1" : 10000, "maks_bonus2" : 4000, "maks_bonus3" : 2000, "maks_bonus4" : 1000, "bet": 10,"multiple": "1"}))
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM room`);
    }

}
