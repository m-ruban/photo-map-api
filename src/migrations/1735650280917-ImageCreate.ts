import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ImageCreate1735650280917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'origin_path',
            type: 'varchar',
          },
          {
            name: 'path_xs',
            type: 'varchar',
          },
          {
            name: 'path_s',
            type: 'varchar',
          },
          {
            name: 'path_m',
            type: 'varchar',
          },
          {
            name: 'path_l',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'topic_id',
            type: 'integer',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
