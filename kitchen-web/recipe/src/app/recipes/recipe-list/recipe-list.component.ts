import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )

  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onLoadRecipe() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
