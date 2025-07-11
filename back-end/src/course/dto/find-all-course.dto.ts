export class FindAllCourseDto {
  orderById?: 'DESC' | 'ASC';
  limit?: string;
  courseName;
  orders?: 'true' | 'false';
  images?: 'true' | 'false';
  categorys?: 'true' | 'false';
}
