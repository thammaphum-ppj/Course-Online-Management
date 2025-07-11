import { PartialType } from "@nestjs/mapped-types";
import { CreateTeacherProfileDto } from "./create-teacher-profile.dto";

export class UpdateTeacherDto extends PartialType(CreateTeacherProfileDto) {}