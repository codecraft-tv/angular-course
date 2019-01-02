interface Human {
  firstName: string;
  lastName: string;
  name?: Function;
  isLate?(time: Date): Function;
}

class Person implements Human {
  constructor(public firstName, public lastName) {
  }

  public name() {
    return `${this.firstName} ${this.lastName}`;
  }

  protected whoAreYou() {
    return `Hi i'm ${this.name()}`;
  }
}

class Student extends Person {
  constructor(public firstName, public lastName, public course) {
    super(firstName, lastName);
  }

  whoAreYou() {
    return `${super.whoAreYou()} and i'm studying ${this.course}`;
  }
}

let asim = new Student("Asim", "Hussain", "typescript");
console.log(asim.whoAreYou());