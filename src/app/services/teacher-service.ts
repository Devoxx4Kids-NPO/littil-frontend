import {Injectable} from "@angular/core";
import {EventBus} from "./event-bus";
import {RestClient} from "./rest-client";
import {HttpResponse} from "@angular/common/http";
import {Teacher, TeacherCreate, TeacherUpdate} from "../model/teacher";
import {Observable} from "rxjs";

@Injectable()
export class TeacherService {

  url = 'http://localhost:8090/api/v1/teacher'

  constructor(private client: RestClient,
              private eventBus: EventBus) {
  }

  create(create: TeacherCreate) {
    let observable: Observable<HttpResponse<Teacher>> = this.client.doPost(create, this.url);
    observable.subscribe((response: HttpResponse<Teacher>) => {
        console.log('Registered OK');
      this.client.toastInfo('Welkom ' + response.body?.firstName);
        this.eventBus.broadcast(Teacher.CREATED_EVENT, response)
      },
      err => this.client.toastError(err, 'Fout tijdens aanmaken docentprofiel'))
    ;
  }

  update(dto: TeacherUpdate) {
    let observable: Observable<HttpResponse<Teacher>> = this.client.doPut(dto, this.url);
    observable.subscribe(response => this.eventBus.broadcast(Teacher.UPDATED_EVENT, response),
      err => this.client.toastError(err, 'Fout tijdens bijwerken docentprofiel'));
  }

  delete(id: number) {
    let observable: Observable<HttpResponse<number>> = this.client.doDelete(id, this.url);
    observable.subscribe(response => this.eventBus.broadcast(Teacher.DELETED_EVENT, id),
      err => this.client.toastError(err, 'Fout tijdens verwijderen docentprofiel'));

  }

}
