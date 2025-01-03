import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddTopic1735853296497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'topics',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'likes',
            type: 'integer',
          },
          {
            name: 'privated',
            type: 'boolean',
          },
          {
            name: 'point',
            type: 'geography(POINT)', // SRID 4326 (WGS84 long/lat)
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'deleted',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'user_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
          }),
        ],
      }),
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('topics');
  }
}
