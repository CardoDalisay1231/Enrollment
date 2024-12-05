class Student {
  constructor({
    id,
    person_id,
    program_id,
    student_type,
    standing_year,
    semester,
    first_name,
    middle_name,
    last_name,
    email,
    contact_number,
    address,
    date_of_birth,
    program_name,
  }) {
    this.id = id;
    this.person_id = person_id;
    this.program_id = program_id;
    this.student_type = student_type;
    this.standing_year = standing_year;
    this.semester = semester;

    // Person-related fields
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.email = email;
    this.contact_number = contact_number;
    this.address = address;
    this.date_of_birth = date_of_birth;

    // Program-related field
    this.program_name = program_name;
  }

  static fromDatabase(row) {
    return new Student({
      id: row.id,
      person_id: row.person_id,
      program_id: row.program_id,
      student_type: row.student_type,
      standing_year: row.standing_year,
      semester: row.semester,
      first_name: row.first_name,
      middle_name: row.middle_name,
      last_name: row.last_name,
      email: row.email,
      contact_number: row.contact_number,
      address: row.address,
      date_of_birth: row.date_of_birth,
      program_name: row.program_name,
    });
  }
}

export default Student;
