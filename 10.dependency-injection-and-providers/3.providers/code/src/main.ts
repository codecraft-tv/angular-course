import { Injector } from "@angular/core";

// Switching Dependencies Example
{
  console.log("Switching Dependencies Example");
  class MandrillService {}
  class SendGridService {}

  let injector = Injector.create([
    { provide: "EmailService", useClass: MandrillService, deps: [] }
  ]);

  let emailService = injector.get("EmailService");
  console.log(emailService); // new MandrillService()
}

{
  let injector = Injector.create([
    { provide: "EmailService", useClass: SendGridService, deps: [] }
  ]);

  let emailService = injector.get("EmailService");
  console.log(emailService); // new SendGridService()
}

// useClass Provider
{
  console.log("useClass");
  class EmailService {}
  class MandrillService extends EmailService {}
  class SendGridService extends EmailService {}

  let injector = Injector.create([
    { provide: EmailService, useClass: SendGridService, deps: [] }
  ]);

  let emailService = injector.get(EmailService);
  console.log(emailService);
}

// useExisting
{
  console.log("useExisting");
  class MandrillService {}
  class SendGridService {}
  class GenericEmailService {}

  let injector = Injector.create([
    { provide: GenericEmailService, useClass: GenericEmailService, deps: [] },
    { provide: MandrillService, useExisting: GenericEmailService, deps: [] },
    { provide: SendGridService, useExisting: GenericEmailService, deps: [] }
  ]);

  let emailService1 = injector.get(SendGridService);
  console.log(emailService1); // GenericEmailService {}
  let emailService2 = injector.get(MandrillService);
  console.log(emailService2); // GenericEmailService {}
  let emailService3 = injector.get(GenericEmailService);
  console.log(emailService3); // GenericEmailService {}
  console.log(
    emailService1 === emailService2 && emailService2 === emailService3
  ); // true
}

// useValue
{
  console.log("useValue");
  let injector = Injector.create([
    {
      provide: "Config",
      useValue: Object.freeze({
        APIKey: "XYZ1234ABC",
        APISecret: "555-123-111"
      })
      //NOTE: Don't have to provide : deps[] here
    }
  ]);

  let config = injector.get("Config");
  console.log(config); // Object {APIKey: "XYZ1234ABC", APISecret: "555-123-111"}
}

// useFactory
{
  console.log("useFactory");
  class MandrillService {}
  class SendGridService {}

  const isProd = true;

  let injector = Injector.create([
    {
      provide: "EmailService",
      useFactory: () => {
        if (isProd) {
          return new MandrillService();
        } else {
          return new SendGridService();
        }
      },
      deps: []
    }
  ]);

  let emailService1 = injector.get("EmailService");
  console.log(emailService1); // MandrillService {}
}