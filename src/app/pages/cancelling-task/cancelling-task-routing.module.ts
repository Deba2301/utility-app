import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancellingTaskPage } from './cancelling-task.page';

const routes: Routes = [
  {
    path: '',
    component: CancellingTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancellingTaskPageRoutingModule {}
