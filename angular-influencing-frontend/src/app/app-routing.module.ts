import { CategoriesComponent } from './category/categories/categories.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDataViewComponent } from './product/product-data-view/product-data-view.component';

/*
In order to take full advantage of angular universal and prereder all the pages,
we made a map of all possible routes of the appplication.
That is because we want to achieve maximum CEO.
*/

// TODO: Revise logic for feed and image assets.
const routes: Routes = [
  { path: '', redirectTo: 'αρχικη/γυναικεια', pathMatch: 'full' },
  { path: 'αρχικη', redirectTo: 'αρχικη/γυναικεια', pathMatch: 'full' },
  {
    path: 'αρχικη/γυναικεια', component: HomeComponent, data: {
      url: 'αρχικη/γυναικεια', label: 'Γυνακεία',
      feed: '/assets/data/gynaikeia/gynaikeia-arxikh.json'
    }
  },
  {
    path: 'αρχικη/ανδρικα', component: HomeComponent, data: {
      url: 'αρχικη/ανδρικα', label: 'Aνδρικά',
      feed: '/assets/data/andrika/andrika-categories.json'
    }
  },
  {
    path: 'αρχικη/παιδικα', component: HomeComponent, data: {
      url: 'αρχικη/παιδικα', label: 'Παιδικά',
      feed: '/assets/data/andrika/andrika-categories.json'
    }
  },
  {
    path: 'ανδρικα', component: CategoriesComponent, data: {
      url: 'ανδρικα', label: 'Aνδρικά',
      feed: '/assets/data/andrika/andrika-categories.json'
    },
    children: [
      {
        path: 'παπουτσια', component: CategoriesComponent, data: {
          url: 'ανδρικα/παπουτσια', label: 'Παπούτσια',
          feed: '/assets/data/andrika-papoutsia-categories.json'
        }
      },
      {
        path: 'ρουχα', component: CategoriesComponent, data: {
          url: 'ανδρικα/ρουχα', label: 'Ρούχα',
          feed: '/assets/data/andrika/rouxa/andrika-rouxa-categories.json'
        }
      }
    ]
  },
  {
    path: 'ανδρικα/παπουτσια/sneakers', component: ProductDataViewComponent, data: {
      url: 'ανδρικα/παπουτσια/sneakers',
      items: [{ label: 'Ανδρικά', url: 'ανδρικα' }, { label: 'Παπούτσια', url: 'ανδρικα/παπουτσια' }, { label: 'Sneakers', url: 'ανδρικα/παπουτσια/sneakers' }]
    }
  },
  { path: 'ανδρικα/παπουτσια/μοκασινια', component: ProductDataViewComponent, data: { url: 'ανδρικα/παπουτσια/μοκασινια' } },
  
  // Γυναικεία
  {
    path: 'γυναικεια', component: CategoriesComponent, data: {
      url: 'γυναικεια', label: 'Γυνακεία',
      feed: '/assets/data/gynaikeia/gynaikeia-categories.json'
    },
    children: [
      { path: 'παπουτσια', component: CategoriesComponent, data: { url: 'γυναικεια/παπουτσια', label: 'Παπούτσια' } },
      { path: 'ρουχα', component: CategoriesComponent, data: { url: 'γυναικεια/ρουχα', label: 'Ρούχα' } },
      { path: 'κοσμηματα', component: CategoriesComponent, data: { url: 'γυναικεια/κοσμηματα', label: 'Κοσμήματα' } }
    ]
  },

  // Γυναικεία Ρούχα
  {
    path: 'γυναικεια/ρουχα/μπλουζες', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/ρουχα/μπλουζες',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Ρούχα', url: 'γυναικεια/ρουχα' }, { label: 'Μπλούζες', url: 'γυναικεια/ρουχα/μπλουζες' }]
    }
  },
  {
    path: 'γυναικεια/ρουχα/φορεματα', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/ρουχα/φορεματα',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Ρούχα', url: 'γυναικεια/ρουχα' }, { label: 'Φορέματα', url: 'γυναικεια/ρουχα/φορεματα' }]
    }
  },
  {
    path: 'γυναικεια/ρουχα/παντελονια', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/ρουχα/παντελονια',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Ρούχα', url: 'γυναικεια/ρουχα' }, { label: 'Παντελόνια', url: 'γυναικεια/ρουχα/παντελονια' }]
    }
  },
  {
    path: 'γυναικεια/ρουχα/πανωφορια', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/ρουχα/πανωφορια',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Ρούχα', url: 'γυναικεια/ρουχα' }, { label: 'Πανωφόρια', url: 'γυναικεια/ρουχα/πανωφορια' }]
    }
  },
  {
    path: 'γυναικεια/ρουχα/εσωρουχα', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/ρουχα/εσωρουχα',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Ρούχα', url: 'γυναικεια/ρουχα' }, { label: 'Εσώρουχα', url: 'γυναικεια/ρουχα/εσωρουχα' }]
    }
  },
  {
    path: 'γυναικεια/ρουχα/μαγιο', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/ρουχα/μαγιο',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Ρούχα', url: 'γυναικεια/ρουχα' }, { label: 'Mαγιό', url: 'γυναικεια/ρουχα/μαγιο' }]
    }
  },
  {
    path: 'γυναικεια/ρουχα/φουστες', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/ρουχα/φουστες',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Ρούχα', url: 'γυναικεια/ρουχα' }, { label: 'Φούστες', url: 'γυναικεια/ρουχα/φουστες' }]
    }
  },
  {
    path: 'γυναικεια/ρουχα/αθλητικα', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/ρουχα/αθλητικα',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Ρούχα', url: 'γυναικεια/ρουχα' }, { label: 'Αθλητικά', url: 'γυναικεια/ρουχα/αθλητικα' }]
    }
  },
  {
    path: 'γυναικεια/ρουχα/πουκαμισα', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/ρουχα/πουκαμισα',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Ρούχα', url: 'γυναικεια/ρουχα' }, { label: 'Πουκάμισα', url: 'γυναικεια/ρουχα/πουκαμισα' }]
    }
  },
  {
    path: 'γυναικεια/ρουχα/ταγιερ', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/ρουχα/ταγιερ',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Ρούχα', url: 'γυναικεια/ρουχα' }, { label: 'Tαγιέρ', url: 'γυναικεια/ρουχα/ταγιερ' }]
    }
  },
  // Γυναικεία Ρούχα

  // Γυναικεία Παππούτσια
  {
    path: 'γυναικεια/παπουτσια/πεδιλα', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/πεδιλα',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Πέδιλα', url: 'γυναικεια/παπουτσια/πεδιλα' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/μποτακια', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/μποτακια',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Μποτάκια', url: 'γυναικεια/παπουτσια/μποτακια' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/πλατφορμες', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/πλατφορμες',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Πλατφόρμες', url: 'γυναικεια/παπουτσια/πλατφορμες' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/γοβες', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/γοβες',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Γόβες', url: 'γυναικεια/παπουτσια/γοβες' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/μπαλαρινες', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/μπαλαρινες',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Mπαλαρίνες', url: 'γυναικεια/παπουτσια/μπαλαρινες' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/σαγιοναρες', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/σαγιοναρες',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Σαγιονάρες', url: 'γυναικεια/παπουτσια/σαγιοναρες' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/σανδαλια', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/σανδαλια',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Σανδάλια', url: 'γυναικεια/παπουτσια/σανδαλια' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/μοκασινια', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/μοκασινια',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Μοκασίνια', url: 'γυναικεια/παπουτσια/μοκασινια' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/εσπαντριγιες', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/εσπαντριγιες',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Εσπαντίργιες', url: 'γυναικεια/παπουτσια/εσπαντριγιες' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/τσοκαρα', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/τσοκαρα',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Τσόκαρα', url: 'γυναικεια/παπουτσια/τσοκαρα' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/loafers', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/loafers',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Loafers', url: 'γυναικεια/παπουτσια/loafers' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/oxford', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/oxford',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Oxford', url: 'γυναικεια/παπουτσια/oxford' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/γαλοτσες', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/γαλοτσες',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Γαλότσες', url: 'γυναικεια/παπουτσια/γαλοτσες' }]
    }
  },
  {
    path: 'γυναικεια/παπουτσια/παντοφλες', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/παπουτσια/παντοφλες',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Παπούτσια', url: 'γυναικεια/παπουτσια' }, { label: 'Παντόφλες', url: 'γυναικεια/παπουτσια/παντοφλες' }]
    }
  },
  // Γυναικεία Παππούτσια

  //Γυναικεία Κοσμήματα
  {
    path: 'γυναικεια/κοσμηματα/κολιε', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/κοσμηματα/κολιε',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Κοσμήματα', url: 'γυναικεια/κοσμηματα' }, { label: 'Κολιέ', url: 'γυναικεια/κοσμηματα/κολιε' }]
    }
  },
  {
    path: 'γυναικεια/κοσμηματα/τσοκερ', component: ProductDataViewComponent, data: {
      url: 'γυναικεια/κοσμηματα/τσοκερ',
      items: [{ label: 'Γυναικεία', url: 'γυναικεια' }, { label: 'Κοσμήματα', url: 'γυναικεια/κοσμηματα' }, { label: 'Τσόκερ', url: 'γυναικεια/κοσμηματα/τσοκερ' }]
    }
  },


  { path: 'παιδικα', component: CategoriesComponent, data: { gender: 'παιδικα' } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: true,
      onSameUrlNavigation: 'reload', // enable Navigation in the Same Url
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
