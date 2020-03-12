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

// OOP TASK USE TYPE-SCRIPT

class EventManager {

  public listeners: Map<string, Array<any>> = new Map();

  constructor(events: string) {
    // eslint-disable-next-line no-restricted-syntax
    const eventsArray = events.split('');
    for (let event of eventsArray) {
      this.listeners.set(event, []);
    }
  }

  subscribe(event: string, listener_s: Array<any> | Object) {
    // eslint-disable-next-line no-restricted-syntax
    if (listener_s instanceof Array) {
      for (const listener of listener_s) {
        this.listeners.get(event).push(listener);
      }
    } else {
      this.listeners.get(event).push(listener_s);
    }
    
  }

  unsubscribe(event: string, listener: any) {
    const listeners = this.listeners.get(event).filter((curent: any) => curent !== listener);
    this.listeners.set(event, listeners);
  }

  notify(event: string, data?: null | Project[]) {
    this.listeners.get(event).forEach((listener) => {
      if (listener instanceof Boss) {
        listener.update(data);
      } else {
        listener.update();
      }
    });
  }
}

class Company {

  private employedDevs: number = 0;
  private dismissedDevs: number = 0;
  private doneProjects = 0;
  private departments: Department[] = [];
  private newProjects: Project[] = [];
  private boss: Boss;
  public eventManager: EventManager;

  constructor(manager: EventManager) {
    this.eventManager = manager;
  }

  unsubscribe(event: string, listener: any) {
    this.eventManager.unsubscribe(event, listener);
  }

  setBoss(boss: Boss) {
    this.boss = boss;
    this.boss.setCompany(this);
    this.departments.forEach((dep) => {
      dep.setBoss(boss);
      this.boss.addDepartment(dep);
    });
    this.eventManager.subscribe('generate', this.boss);
  }

  generateNewProjects() {
    // it's better to pass countNewProj as a parameter into the method instead of creating it inside the method
    const countNewProj = Math.floor((Math.random() * 4) + 1);
    for (let i = 0; i < countNewProj; i += 1) {
      this.newProjects.push(new Project(this.boss));
    }
    this.eventManager.subscribe('inc_day', this.newProjects);
    this.eventManager.notify('generate', this.newProjects);
    this.newProjects = [];
  }

  incDay() {
    this.eventManager.notify('inc_day', null);
  }

  incEmployedDevs() {
    this.employedDevs += 1;
  }

  addDepartment(dep: Department) {
    this.departments.push(dep);
    this.boss.addDepartment(dep);
    dep.setBoss(this.boss);
    this.eventManager.subscribe('inc_day', dep);
  }

  getEmployedDevs() {
    return this.employedDevs;
  }

  incDismissedDevs() {
    return this.dismissedDevs;
  }

  incDoneProjects() {
    this.doneProjects += 1;
  }

  getDoneProjects() {
    return this.doneProjects;
  }
}

class Boss {

  private projsInDevelopment: Map<Project, Developer[]> = new Map();
  public remainingProjects: Project[] = [];
  private departments: Department[] = [];
  public projectsToTest: Project[] = [];
  private company: Company;

  setCompany(company: Company) {
    this.company = company;
  }

  joinDevToProj(dev: Developer, proj: Project) {
    proj.stopWaiting();
    if (this.projsInDevelopment.has(proj)) {
      this.projsInDevelopment.get(proj).push(dev);
    }else {
      this.projsInDevelopment.set(proj, [dev]);
    }
  }

  incDismissedDevs() {
    this.company.incDismissedDevs();
  }

  removeProject(proj: Project) {
    let devs = this.projsInDevelopment.get(proj);
    devs.forEach((dev) => dev.setFree());
    this.projsInDevelopment.delete(proj);
    this.company.unsubscribe('inc_day', proj);
    this.company.incDoneProjects();
  }

  addDepartment(dep: Department) {
    this.departments.push(dep);
  }

  addRemainingProjs(projects: Project[]) {
    projects.forEach((proj) => proj.wait());
    this.remainingProjects = this.remainingProjects.concat(projects);
  }

  update(projects: Project[]) {
    if (this.remainingProjects) {
      this.employDevs();
      this.distrProjects(this.remainingProjects);
      this.remainingProjects = [];
    }
    let projs = projects.concat(this.projectsToTest);
    this.projectsToTest = [];
    this.distrProjects(projs);
  }

  distrProjects(projectsToDistr: Project[]) {
    this.departments.forEach((dep) => {
      let projects = projectsToDistr.filter((proj) => proj.getType() === dep.getName());
      dep.distributeByDevs(projectsToDistr);
    })
  } 

  addProjectToTest(project: Project) {
    this.projectsToTest.push(project);
  }

  employDevs() {
    this.departments.forEach((dep) => {
      let projects = this.remainingProjects.filter((rProj) => rProj.getType() === dep.getName());
      projects.forEach((proj) => dep.addDeveloper());
      this.company.incEmployedDevs();
    })
  }

}

class Project {
  private boss: Boss;
  private complexity: number = Math.floor(Math.random() * 3 + 1);
  private type: string = Math.floor(Math.random() * 2 + 1) == 1 ? 'web' : 'mobile';
  private daysOfDevelopment: number = 0;
  private countDevs: number = 0;
  private waiting: boolean = true;

  constructor(boss: Boss) {
    this.boss = boss;
  }
 
  wait() {
    this.waiting = true;
  }

  stopWaiting() {
    this.waiting = false;
  }

  isWaiting(): boolean {
    return this.waiting;
  }

  getComplexity(): number {
    return this.complexity;
  }

  getType(): string {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }

  incCountDevelopers() {
    this.countDevs += 1;
  }

  getCountDevelopers(): number {
    return this.countDevs;
  }

  getTimeToDo(): number {
    return Math.ceil(this.complexity / this.countDevs);
  }

  update() {
    if (!this.isWaiting()) {
      this.daysOfDevelopment += 1;
      if (!(this.getType() === 'qa')) {
        if (this.getTimeToDo() === this.daysOfDevelopment) {
          this.setType('qa');
          this.wait();
          this.daysOfDevelopment = 0;
          this.boss.addProjectToTest(this);
        }
      }else {
        if (this.daysOfDevelopment === 1) {
          this.boss.removeProject(this);
        }
      }
    }
  }
   
}

class Developer {

  public profession: string;
  private freeDays: number = 0;
  private countDoneProjects: number = 0;
  private free: boolean = true;

  constructor(profession: string) {
    this.profession = profession;
  }

  incDay() {
    if (this.free) {
      this.freeDays += 1;
    }
  }

  setProject() {
    this.free = false;
    this.freeDays = 0;
  }

  setFree() {
    this.free = true;
    this.countDoneProjects += 1;
  }

  getCountDoneProjects(): number {
    return this.countDoneProjects;
  }

  isFree(): boolean {
    return this.free;
  }

  getFreeDays(): number {
    return this.freeDays;
  }
}

class Department {

  public developers: Developer[] = [];
  private boss: Boss;

  

}

<string, Project[] | Boss>