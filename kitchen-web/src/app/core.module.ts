import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInteceptorService } from "./auth/auth.interceptor.service";
//import { LoggingService } from "./logging.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shoppinglist.service";

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,
        //LoggingService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInteceptorService, multi: true }
    ]
})

export class CoreModule { }