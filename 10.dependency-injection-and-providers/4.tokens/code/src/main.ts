import { Injector } from "@angular/core";
import { InjectionToken } from "@angular/core";

{
  // String Token (Fail Case) Example
  console.log("String Token (Fail Case) Example");
  class MandrillService {}
  class SendGridService {}

  // If using strings we can cause a name clash, like so, two tokens, same string.
  let MandrillServiceToken = "EmailService";
  let SendGridServiceToken = "EmailService";

  let injector = Injector.create([
    { provide: SendGridServiceToken, useClass: SendGridService, deps: [] },
    { provide: MandrillServiceToken, useClass: MandrillService, deps: [] }
  ]);

  let emailService1 = injector.get(SendGridServiceToken);
  let emailService2 = injector.get(MandrillServiceToken);
  console.log(emailService1 === emailService2); // true
}

// InjectionToken
{
  console.log("InjectionToken");
  class MandrillService {}
  class SendGridService {}

  const MandrillServiceToken = new InjectionToken<string>("EmailService");
  const SendGridServiceToken = new InjectionToken<string>("EmailService");

  let injector = Injector.create([
    { provide: SendGridServiceToken, useClass: SendGridService, deps: [] },
    { provide: MandrillServiceToken, useClass: MandrillService, deps: [] }
  ]);

  let emailService1 = injector.get(SendGridServiceToken);
  let emailService2 = injector.get(MandrillServiceToken);
  console.log(emailService1 === emailService2); // false
}