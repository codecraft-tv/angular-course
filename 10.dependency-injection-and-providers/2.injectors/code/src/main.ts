import { Injector } from "@angular/core";

// Simple Injector Example
{
  console.log("Simple Injector Example");
  class MandrillService {}
  class SendGridService {}

  let injector = Injector.create([
    { provide: MandrillService, deps: [] },
    { provide: SendGridService, deps: [] }
  ]);
  let emailService = injector.get(MandrillService);
  console.log(emailService);

  console.log("Injector Caching Example");
  let emailService1 = injector.get(MandrillService);
  let emailService2 = injector.get(MandrillService);
  console.log(emailService1 === emailService2); // true
}

// // Injector Caching Caching State Sharing Example
{
  console.log("Injector Caching Caching State Sharing Example");
  let emailService1 = injector.get(MandrillService);
  emailService1.foo = "moo";

  let emailService2 = injector.get(MandrillService);
  console.log(emailService2.foo); // moo
}

//  Child Injector Forwards Request to Parent
{
  console.log("Child Injector Forwards Request to Parent");
  class EmailService {}

  let parentInjector = Injector.create([{ provide: EmailService, deps: [] }]);
  let childInjector = Injector.create([], parentInjector);

  console.log(
    parentInjector.get(EmailService) === childInjector.get(EmailService)
  ); // true
}

//  Child Injector Returns Different Instance
{
  console.log("Child Injector Returns Different Instance");
  class EmailService {}
  class PhoneService {}

  let parentInjector = Injector.create([{ provide: EmailService, deps: [] }]);
  let childInjector = Injector.create(
    [{ provide: EmailService, deps: [] }],
    parentInjector
  );

  console.log(
    parentInjector.get(EmailService) === childInjector.get(EmailService)
  ); // false
}