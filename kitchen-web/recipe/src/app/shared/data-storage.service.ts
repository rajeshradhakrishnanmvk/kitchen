import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService,
        private store: Store<fromApp.AppState>) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://kitchen-cf773-default-rtdb.firebaseio.com/recipes.json',
            recipes).subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        // this.authService.user.pipe(take(1)).subscribe(user => {

        // });
        return this.http
            .get<Recipe[]>(
                'https://kitchen-cf773-default-rtdb.firebaseio.com/recipes.json'
            ).pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    });
                }),
                tap(recipes => {
                    //this.recipeService.setRecipes(recipes);
                    this.store.dispatch(new RecipesActions.SetRecipes(recipes));
                })
            );

    }

    fetchRecipes1() {
        // this.authService.user.pipe(take(1)).subscribe(user => {

        // });
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
                return this.http
                    .get<Recipe[]>(
                        'https://kitchen-cf773-default-rtdb.firebaseio.com/recipes.json',
                        {
                            params: new HttpParams().set('auth', user.token)
                        }
                    );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                });
            }),
            tap(recipes => {
                //this.recipeService.setRecipes(recipes);
                this.store.dispatch(new RecipesActions.SetRecipes(recipes));
            })
        );

    }
}