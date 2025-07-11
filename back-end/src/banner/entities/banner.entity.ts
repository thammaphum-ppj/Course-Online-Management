import { BaseEntity } from "src/entity/base.entity";
import { Column } from "typeorm";

export class Banner extends BaseEntity {
    @Column()
    nameImage: string;
}
