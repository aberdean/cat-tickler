/* Code adapted from
 * https://github.com/udacity/ud989-cat-clicker-premium-vanilla
 * Images from https://unsplash.com/search/photos/cat
 */


/* ======= Model ======= */

const model = {
    currentCat: null,
    cats: [
        {
            counter : 0,
            name : 'Juliet',
            image : 'img/cat.png',
            alt : 'A cat showing its belly'
        },
        {
            counter : 0,
            name : 'Romeo',
            image : 'img/cat2.png',
            alt : 'A Main Coon'
        },
        {
            counter : 0,
            name : 'Toby',
            image : 'img/cat3.png',
            alt : 'A kitten'
        },
        {
            counter : 0,
            name : 'Susy',
            image : 'img/cat4.png',
            alt : 'A fluffy kitten'
        },
        {
            counter : 0,
            name : 'Grumpy',
            image : 'img/cat5.png',
            alt : 'A grumpy cat'
        }
    ]
};


/* ======= Controller ======= */

const controller = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.counter += 1;
        catView.render();
    },

    updateModel: function() {
        // change cat attributes
        if (adminView.catName.value !== "") {
            model.currentCat.name = adminView.catName.value;
        }
        if (adminView.catUrl.value !== "") {
            model.currentCat.image = adminView.catUrl.value;
        }
        if (adminView.imgDescription.value !== "") {
            model.currentCat.alt = adminView.imgDescription.value;
        }
        if (adminView.clicks.value !== "") {
            model.currentCat.counter = adminView.clicks.value;
        }
        catView.render();
    }
};


/* ======= View ======= */

const catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.querySelector('.cat');
        this.catNameElem = document.querySelector('.name');
        this.catImageElem = document.querySelector('img');
        this.countElem = document.querySelector('.fa-layers-counter');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function() {
            controller.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        let currentCat = controller.getCurrentCat();
        this.countElem.textContent = currentCat.counter;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.image;
        this.catImageElem.alt = currentCat.alt;
    }
};

const catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.querySelector('.names');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        let cat;
        let elem; 
        let i;
        // get the cats we'll be rendering from the controller
        const cats = controller.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i += 1) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    controller.setCurrentCat(catCopy);
                    catView.render();
                    // update the cat attributes in the admin area
                    // this is useful when clicking on a new cat
                    // while the admin area is already displayed
                    adminView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

const adminView = {
    init: function() {
        // store DOM elements for the buttons
        this.admin = document.getElementById("admin");
        this.cancel = document.getElementById("cancel");
        this.submit = document.getElementById ("submit");
        this.adminArea = document.querySelector(".admin-area");

        this.admin.addEventListener('click', function() {
            // show the admin area
            adminView.adminArea.style.display = "block";
            adminView.render();
        });

        this.cancel.addEventListener('click', function() {
            // hide the admin area
            adminView.adminArea.style.display = "none";
        });

        this.submit.addEventListener('click', function() {
            // set the new attributes
            controller.updateModel();
        });

        this.render();
    },

    render: function() {
        // get current cat
        let cat = controller.getCurrentCat();
        // store DOM element for the form
        this.catName = document.getElementById("name");
        this.catUrl = document.getElementById("url");
        this.imgDescription = document.getElementById("alt");
        this.clicks = document.getElementById("clicks");
        // fill in form with elements from current cat
        this.catName.placeholder = cat.name;
        this.catUrl.placeholder = cat.image;
        this.imgDescription.placeholder = cat.alt;
        this.clicks.placeholder = cat.counter;
    }
};

// make it go!
controller.init();
