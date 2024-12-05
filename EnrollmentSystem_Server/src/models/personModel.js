class Person {
    constructor({ id, first_name, middle_name, last_name, email, password, contact_number, address, date_of_birth }) {
      this.id = id;  // changed person_id to id
      this.first_name = first_name;
      this.middle_name = middle_name;
      this.last_name = last_name;
      this.email = email;
      this.password = password;
      this.contact_number = contact_number;
      this.address = address;
      this.date_of_birth = date_of_birth;
    }
  
    static fromDatabase(row) {
      return new Person({
        id: row.id,  // changed person_id to id
        first_name: row.first_name,
        middle_name: row.middle_name,
        last_name: row.last_name,
        email: row.email,
        password: row.password,
        contact_number: row.contact_number,
        address: row.address,
        date_of_birth: row.date_of_birth,
      });
    }
  }
  
  export default Person;
  