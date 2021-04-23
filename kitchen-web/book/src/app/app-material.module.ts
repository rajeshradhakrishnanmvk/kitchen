import { NgModule } from "@angular/core";

import { MatMenuModule } from "@angular/material/menu"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatTabsModule } from "@angular/material/tabs"
import { MatInputModule } from "@angular/material/input"
import { MatListModule } from "@angular/material/list"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSortModule } from "@angular/material/sort"
import { MatTableModule } from "@angular/material/table"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    exports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTabsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatSelectModule,
    ]
})
export class AppMaterialModule { }