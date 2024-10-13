import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Subscription1727893795549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subscriptions',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'owner_user_id',
            type: 'integer',
          },
          {
            name: 'subscribed_user_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['owner_user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
          }),
          new TableForeignKey({
            columnNames: ['subscribed_user_id'],
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
    await queryRunner.dropTable('subscriptions');
  }
}
