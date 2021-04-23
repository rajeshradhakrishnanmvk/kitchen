import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router"
import { Book } from "../model/book"
import { Observable } from "rxjs"
import { BooksService } from './books.service'

@Injectable()
export class BooksResolver implements Resolve<Book>{
    constructor(private booksService: BooksService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> {
        return this.booksService.findBookById(route.params['id']);
    }
}