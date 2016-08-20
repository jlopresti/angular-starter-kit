export class GreetingServiceProvider implements ng.IServiceProvider {

    /*@ngInject*/
    constructor() {
    }

    private greeting = "Hello World!";

    // Configuration function
    public setGreeting(greeting: string) {
        this.greeting = greeting;
    }

    /*@ngInject*/
    public $get($http: ng.IHttpService) : IGreetingService {
        // var t = $http.get('http://www.google.fr').then<string>(x => {console.log(x); return "r"});
        return new GreetingService(this.greeting);
    }
}



export class GreetingService {
  private greeting: string

  constructor(greeting: string) {
    this.greeting = greeting
  }

  public getGreeting(): string {
    return this.greeting;
  }
}

interface IGreetingService
{
  getGreeting(): string
}

