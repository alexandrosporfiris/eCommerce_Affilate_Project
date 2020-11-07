import { Possibility } from 'src/general_intefaces/possibility';

/*Because the data from the API we are using are not categorized properly,
    we have to make this file to cath all possible products and place them set them
    the propper gender, categories and properties*/

export class Categories {
    // TODO: Move all constants to a separate file

    // Gender Constants
    public GENDER_FEMALE = 'γυναικεια';
    public GENDER_MALE = 'ανδρικα';
    public GENDER_CHILD = 'παιδικα';

    // Main Categories Constants
    private MAIN_CATEGORY_CLOTHES = 'ρουχα';
    private MAIN_CATEGORY_SHOES = 'παπουτσια';

    // Categories Constants

    // Ρούχα
    private CATEGORY_BLOUSES = 'μπλουζες';
    private CATEGORY_FOREMATA = 'φορεματα';
    private CATEGORY_PANTELONIA = 'παντελονια';
    private CATEGORY_PANOFORIA = 'πανωφορια';
    private CATEGORY_ESOROUXA = 'εσωρουχα';
    private CATEGORY_MAGIO = 'μαγιο';
    private CATEGORY_FOUSTES = 'φουστες';
    private CATERGORY_ATHLITIKA = 'αθλητικα';
    private CATEGORY_POUKAMISA = 'πουκαμισα';
    private CATEGORY_TAGIER = 'ταγιερ';

    // Παπούτσια
    private CATEGORY_PEDILA = 'πεδιλα';
    private CATEGORY_MPOTAKIA = 'μποτακια';
    private CATΕGORY_PLATFORMES = 'πλατφορμες';
    private CATEGORY_GOVES = 'γοβες';
    private CATEGORY_MPALARINES = 'μπαλαρινες';
    private CATEGORY_SAGIONARES = 'σαγιοναρες';
    private CATEGORY_SANDALIA = 'σανδαλια';
    private CATEGORY_MOKASINIA = 'μοκασινια';
    private CATEGORY_ESPANTRIGIES = 'εσπαντριγιες';
    private CATEGORY_TSOKARA = 'τσοκαρα';
    private CATEGORY_LOAFERS = 'loafers';
    private CATEGORY_OXFORD = 'oxford';
    private CATEGORY_GALOTSES = 'γαλοτσες';
    private CATEGORY_PANTOFLES = 'παντοφλες';

    public genders: Possibility[] = [
        { possibleNames: ['ανδρικα', 'ανδρικο', 'ανδρικες'], value: this.GENDER_MALE },
        { possibleNames: ['γυναικεια', 'γυναικειο', 'γυναικειες', 'artepiedi'], value: this.GENDER_FEMALE },
        { possibleNames: ['παιδικα', 'παιδικο', 'παιδικες'], value: this.GENDER_CHILD },
    ];

    // Predefined Categories
    public femaleCategories: Possibility[] = [

        // Γυναικεία Ρούχα
        { possibleNames: ['μπλουζες', 'μπλουζα'], value: this.CATEGORY_BLOUSES, mainCategory: this.MAIN_CATEGORY_CLOTHES },
        { possibleNames: ['φορεματα', 'φορεμα'], value: this.CATEGORY_FOREMATA, mainCategory: this.MAIN_CATEGORY_CLOTHES },
        { possibleNames: ['παντελονια', 'παντελονι', 'παντελονα'], value: this.CATEGORY_PANTELONIA, mainCategory: this.MAIN_CATEGORY_CLOTHES },
        { possibleNames: ['πανωφορια', 'πανοφορι'], value: this.CATEGORY_PANOFORIA, mainCategory: this.MAIN_CATEGORY_CLOTHES },
        { possibleNames: ['εσωρουχα', 'εσωρουχο'], value: this.CATEGORY_ESOROUXA, mainCategory: this.MAIN_CATEGORY_CLOTHES },
        { possibleNames: ['μαγιο'], value: this.CATEGORY_MAGIO, mainCategory: this.MAIN_CATEGORY_CLOTHES },
        { possibleNames: ['φουστες', 'φουστα'], value: this.CATEGORY_FOUSTES, mainCategory: this.MAIN_CATEGORY_CLOTHES },
        { possibleNames: ['αθλητικα', 'αθλητικο'], value: this.CATERGORY_ATHLITIKA, mainCategory: this.MAIN_CATEGORY_CLOTHES },
        { possibleNames: ['πουκαμισα', 'πουκαμισο'], value: this.CATEGORY_POUKAMISA, mainCategory: this.MAIN_CATEGORY_CLOTHES },
        // { possibleNames: ['φορμα'], value: 'φορμα', mainCategory: this.MAIN_CATEGORY_CLOTHES },
        { possibleNames: ['ταγιερ'], value: this.CATEGORY_TAGIER, mainCategory: this.MAIN_CATEGORY_CLOTHES },
        // Γυναικεία Ρούχα

        // Γυναικεία Παππούτσια
        { possibleNames: ['πεδιλα', 'πεδιλo'], value: this.CATEGORY_PEDILA, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['μποτακια', 'μποτακι'], value: this.CATEGORY_MPOTAKIA, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['πλατφορμες', 'πλατφορμα'], value: this.CATΕGORY_PLATFORMES, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['αθλητικα', 'αθλητικο'], value: this.CATERGORY_ATHLITIKA, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['γοβες', 'γοβα'], value: this.CATEGORY_GOVES, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['μπαλαρινες', 'μπαλαρινα'], value: this.CATEGORY_MPALARINES, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['σαγιοναρες', 'σαγιοναρα'], value: this.CATEGORY_SAGIONARES, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['σανδαλια', 'σανδαλι'], value: this.CATEGORY_SANDALIA, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['μοκασινια', 'μοκασινι'], value: this.CATEGORY_MOKASINIA, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['εσπαντριγιες', 'εσπαντριγια'], value: this.CATEGORY_ESPANTRIGIES, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['τσοκαρα', 'τσοκαρο'], value: this.CATEGORY_TSOKARA, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['loafers', 'loafer'], value: this.CATEGORY_LOAFERS, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['oxford', 'oxfords'], value: this.CATEGORY_OXFORD, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['γαλοτσες', 'γαλοτσα'], value: this.CATEGORY_GALOTSES, mainCategory: this.MAIN_CATEGORY_SHOES },
        { possibleNames: ['παντοφλες', 'παντοφλα'], value: this.CATEGORY_PANTOFLES, mainCategory: this.MAIN_CATEGORY_SHOES },
        // Γυναικεία Παππούτσια

        // TODO: Add the rest
    ];

    public maleCategories: Possibility[] = [
        // TODO: Add data here
    ];

    public childCategories: Possibility[] = [
        // TODO: Add data here
    ];

    // Predefined SubCategories
    public femaleSubcatgories: Possibility[] = [

        // Category Μπλούζες
        {
            possibleNames: ['κοντομανικη', 'κοντομανικο', 'κοντομανικη', 'κονταμανικια', 'κοντομανικι'],
            value: 'κοντομανικες', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        {
            possibleNames: ['μακρυμανικη', 'μακρυμανικο', 'μακρυμανικη', 'μακριαμανικια', 'μακρυμανικι'],
            value: 'μακρυμανικες', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        {
            possibleNames: ['αμανικη', 'αμανικο', 'αμανικες'],
            value: 'αμανικες', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        {
            possibleNames: ['πουλοβερ'],
            value: 'πουλοβερ', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        {
            possibleNames: ['φουτερ'],
            value: 'φουτερ', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        {
            possibleNames: ['ζιβαγκο'],
            value: 'ζιβαγκο', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        {
            possibleNames: ['tunic'],
            value: 'tunic', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        {
            possibleNames: ['polo'],
            value: 'polo', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        {
            possibleNames: ['μπουστακι'],
            value: 'μπουστακι', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        {
            possibleNames: ['μανικι3/4', 'μανικια3/4'], value: 'μανικι 3/4',
            mainCategory: this.MAIN_CATEGORY_CLOTHES,
        }, {
            possibleNames: ['Tshirt', 'tshirt', 'T-shirt', 't-shirt', 'Tshirts', 'tshirts', 'T-shirts', 't-shirts'], value: 't-shirts',
            mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        // Category Μπλούζες

        // Category Φορέματα
        {
            possibleNames: ['κοντο', 'κοντα', 'mini', 'μινι'],
            value: 'κοντα', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },
        {
            possibleNames: ['μακρυ'],
            value: 'μακρια', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        }, {
            possibleNames: ['midi', 'μιντι'],
            value: 'midi', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },

        // Category Φορέματα

        // Κοινές
        {
            possibleNames: ['strapless', 'στραπλες'],
            value: 'στραπλες', mainCategory: this.MAIN_CATEGORY_CLOTHES,
        },

        // TODO: Add the rest
    ];

    public maleSubcategories: Possibility[] = [
        // TODO: Add data here
    ];

    public childSubcategories: Possibility[] = [
        // TODO: Add data here
    ];

}
