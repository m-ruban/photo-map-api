import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserIdIntoImage1735810397923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'image_id');
    await queryRunner.dropColumn('users', 'avatar');
    await queryRunner.addColumn(
      'images',
      new TableColumn({
        name: 'user_id',
        type: 'integer',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('images', 'user_id');
  }
}
