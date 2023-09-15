import {createHttpFactory, HttpMethod, SpectatorHttp} from "@ngneat/spectator";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ContactPostResource, ContactService} from "../../api/generated";
import {LittilContactService} from "./littil-contact.service";

describe('LittilContactService', () => {
  let baseUrl = 'http://localhost:8080';
  let spectator: SpectatorHttp<LittilContactService>;
  const createHttp = createHttpFactory({
    service: LittilContactService,
    imports: [HttpClientTestingModule],
    providers: [ContactService],
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('sendEmail', () => {
    it('should save contact information and send email', () => {
      spectator.service
        .sendEmail({
          recipient: "recipient",
          medium: 'contactInfo',
          message: 'message',
        } as ContactPostResource)
        .subscribe();
      spectator.expectOne(baseUrl + '/api/v1/contacts', HttpMethod.POST);
    });
  });

});
