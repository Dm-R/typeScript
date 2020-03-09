/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
const output = document.querySelector('.output');

// Arrays

// eslint-disable-next-line no-unused-vars
const arr: number[][] = [[1, 7], [2], [3]]; // correct
// let arr: number[] = [[1], [2]] - Error

// Literal object
const obj : {age: number, name: string, getAge: () => number} = {
  age: 30,
  name: 'User',
  getAge():number {
    return this.age;
  },
};
// or create a type
type User = {age: number, name: string, getAge?: () => number};// include '?' - sign before ':' to make the property optional
const user: User = {
  age: 25,
  name: 'AnotherUser',
};

// Functions

// let func: (param: type) => typeOfReturningValue;
let dblFunc: (param: number) => number; // variable for function
function double(par: number): number { // function
  return par * 2;
}
// eslint-disable-next-line prefer-const
dblFunc = double;// asssigment
// Specify types for parameters and returning result
const square = (param: number):number => param * param;
// if function doesn't return anything
// use :void after brackets
const printStr = (str: string): void => {
  // eslint-disable-next-line no-console
  console.log(str);
};
// different types of parametrs
const conc = (str: string, num: number = 0): string => str + num;// with default value of num // return joined parameters as a string

// Classes

class Employee {
    readonly id: number; // readonly

    private age: number; // for internal use only and will not get 'private' properties in classes that inherit from this class

    public name: string; // we can exclude this line for short version of the constructor

    protected job: string; // we'll get 'protected' properties in classes that inherit from this class

    public salary: number;

    constructor(name: string) {
      this.name = name;
    }
    // short
    // constructor(public name: string) {
    //    will create a public field 'name' inside the object
    // }

    // class' methods

    public setAge(age: number) { // public method, the public keyword is optional
      this.age = age;
    }

    // getAge()...
    setJob(job: string): void {
      this.job = job;
    }

    getJob(): string {
      return this.job;
    }

    printName(): void {
      // console.log(this.name);
    }

    getAge(): number {
      return this.age;
    }

    getSalary(): number {
      return this.salary;
    }

    private someMethod() { // for internal use only
      // code
    }
}
// create an instance of the class
const empl = new Employee('Jon');
empl.printName();

// inheritance
// create a class that inherits the Employee class (above)

class MidLevelEmployee extends Employee {
    public department: string;

    constructor(name: string, department: string) {
      super(name); // constructor of Employee class
      this.department = department;
    }

    // methods
    public printName() {
      super.printName();
      // eslint-disable-next-line no-console
      console.log(`(Department - ${this.department})`);
    }

    // we can override the parent's methods but we can't change the type the method returs
    /* getSalary(): string { error the type must be 'string'
        return `${this.salary}`
    } */
    // correct
    getSalary(): number { // correct type
      return (this.salary / 100) * 87;
    }

    /* we don't have private properties of parent's class
    getAge(): number {
        return this.age; ! error
    } */
    // but we have protected properties of the parent's class
    logJob(): string { // we can use getJob() method of parent's class instid
      return this.job;
    }
}
// make an instance of the MidLevelEmployee
const MidEmpl: MidLevelEmployee = new MidLevelEmployee('Tom', 'Mobile');
// let's set and get 'job' property (difinited in parent class)
MidEmpl.setJob('Employee');
// let job = MidEmpl.logJob();

// Converting types
const MidEmpl2: Employee = new MidLevelEmployee('Tom', 'Mobile');
// console.log(MidEmpl2.department); !Error
// console.log((<MidLevelEmployee>MidEmpl2).department); !correct

// Abstract classes

abstract class Car {
     // fields
     protected model: string;

     year: number;

     getYear(): number {
       return this.year;
     }

     setModel(model: string): void {
       this.model = model;
     }

    // abstract method
    abstract logInfo(): void; // we have to assign all 'abstract' methods in classes that inherit this class
}

class Audi extends Car {
     public color: string;

     constructor(color: string) {
       super();
       this.color = color;
     }

     logInfo(): void { // assign logInfo method
       output.innerHTML += (`Model - ${this.model}, Year - ${this.year}`);
     }

     changeColor(color: string) : void {
       this.color = color;
     }
}
const audi = new Audi('black');
audi.year = 2020;
audi.setModel('Audi TT');
audi.logInfo();

// audi.model = 'Model'; ! Error 'model' property is protected

// if we specify class name as a parameter type for any function and then pass
// instance of class that inherits this class into the function, then we will be able to access only to properties that
// defined in parent's class
const show = (elmt: Car): void => {
  // console.log(elmt.changeColor('red'); Error: Property 'changeColor' does not exist on type 'Car'
  output.innerHTML += `</br>${elmt.year}`;
};
show(audi);

// Interfaces

interface IGetInfo {
    firstName: string;
    age: number;
    lastName: string;
    getFirsName(): string;
    getLastName(): string;
    getFullName(): string;
    getAge(): number;
    getFullInfo(): string;
}

// implement IGetInfo
// we have to use all properties of the Interface our class implements
// we also can have other properties inside our class
class Person implements IGetInfo {
    job: string; // another property

    firstName: string;

    lastName: string;

    age: number;

    constructor(firstName: string, lastName: string, age: number) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
    }

    getFirsName(): string {
      return this.firstName;
    }

    getLastName(): string {
      return this.lastName;
    }

    getFullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    getAge(): number {
      return this.age;
    }

    getFullInfo(): string {
      return `${this.firstName} ${this.lastName} ${this.age} years old.`;
    }
}
const logInfo = (someObj: IGetInfo): void => {
  // inside the function we can access only to properties of the 'someObj' that exist in interface
  // someObj.job - Property 'job' does not exist on type 'IGetInfo'.
  output.innerHTML += `</br>${someObj.getFullInfo()}`;
};
const person = new Person('Tom', 'Last', 33);
logInfo(person);

// Type assertion

const someVar: any = 'string';
const anotherVar: string | number = 'string';

// 1)

const len = (<string>someVar).length;
const anotherLen = (<string>anotherVar).length;
// 2)
const anitherLen2 = (anotherVar as string).length;
const len2 = (someVar as string).length;

// Interfaces of Arrays

interface IDictionary {
    [index: string]: string[];
}

const seasons: IDictionary = {
  spring: ['March', 'April', 'May'],
  summer: ['June', 'July', 'August'],
  autumn: ['September', 'October', 'November'],
  winter: ['December', 'January', 'February'],
};

const summerMonths = seasons.summer;
output.innerHTML += `</br>${summerMonths}`;
